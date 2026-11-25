const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// تخزين مؤقت للكودات (in-memory)
const codeMap = new Map(); // كود 6 أرقام -> Peer ID

// API: تخزين كود
app.post('/register', (req, res) => {
  const { code, peerId } = req.body;

  if (!code || !peerId || code.length !== 6) {
    return res.status(400).json({ error: 'بيانات غير صالحة' });
  }

  codeMap.set(code, peerId);

  // صلاحية الكود: 5 دقايق
  setTimeout(() => codeMap.delete(code), 5 * 60 * 1000);

  res.json({ ok: true });
});

// API: البحث بكود
app.get('/lookup/:code', (req, res) => {
  const { code } = req.params;
  const peerId = codeMap.get(code);

  if (!peerId) {
    return res.status(404).json({ error: 'الكود غير موجود أو منتهي' });
  }

  res.json({ peerId });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Code mapper running on port ${port}`);
});

