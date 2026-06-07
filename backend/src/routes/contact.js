const express = require('express');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
const Message = require('../models/Message');
const requireAuth = require('../middleware/auth');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Trop de messages envoyés, réessayez plus tard.' },
});

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
});

router.post('/', contactLimiter, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, email, subject, message } = parsed.data;

  try {
    await Message.create({ name, email, subject, message });

    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || 'portfolio@vidalotvdt.fr',
        to: process.env.CONTACT_TO_EMAIL,
        subject: `[Portfolio] ${subject || 'Nouveau message'} — ${name}`,
        html: `<p><strong>De :</strong> ${name} (${email})</p><p><strong>Message :</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
        replyTo: email,
      });
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
});

// GET /api/contact — admin: list messages
router.get('/', requireAuth, async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// PATCH /api/contact/:id/read — admin
router.patch('/:id/read', requireAuth, async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!msg) return res.status(404).json({ error: 'Message introuvable' });
  res.json(msg);
});

module.exports = router;
