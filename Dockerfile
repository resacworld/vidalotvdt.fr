# ── Stage 1 : Build du frontend ──────────────────────────────────────────────
FROM node:lts-alpine AS frontend-build
WORKDIR /frontend
COPY frontend-new/package*.json ./
RUN npm ci
COPY frontend-new/ .
RUN npm run build

# ── Stage 2 : Dépendances de production du backend ───────────────────────────
FROM node:lts-alpine AS backend-deps
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev

# ── Stage 3 : Image finale ────────────────────────────────────────────────────
FROM node:lts-alpine
WORKDIR /app

COPY --from=backend-deps /app/node_modules ./node_modules
COPY backend/ .

# Intégration du frontend buildé — Express le servira comme fichiers statiques
COPY --from=frontend-build /frontend/dist ./frontend-dist

RUN mkdir -p uploads/projects uploads/cv

EXPOSE 3001
ENV NODE_ENV=production

CMD ["node", "src/index.js"]
