FROM node:lts-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:lts-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p uploads/projects uploads/cv
EXPOSE 3001
CMD ["node", "src/index.js"]
