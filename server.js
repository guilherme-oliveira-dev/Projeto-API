const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3000;

const SECRET = 'segredo123'; // Em produção, use variável de ambiente

app.use(cors());
app.use(express.json());

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'user@exemplo.com' && senha === '123456') {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Rota para verificar status
app.get('/status', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
