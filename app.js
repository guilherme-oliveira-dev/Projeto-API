async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
  
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      alert('Login feito com sucesso!');
    } else {
      alert('Credenciais inválidas.');
    }
  }
  
  async function verificarStatus() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/status', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  
    const data = await res.json();
    document.getElementById('status').innerText = data.authenticated ? 'Logado' : 'Não logado';
  }
  