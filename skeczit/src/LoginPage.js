import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3002/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Zalogowano');
      // przejście do gry lub dashboardu
    } else {
      alert(data.message || 'Błąd logowania');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>Logowanie</h2>
      <input placeholder="Login" onChange={e => setLogin(e.target.value)} /><br />
      <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Zaloguj</button><br /><br />
      <button onClick={() => navigate('/register')}>Rejestracja</button>
    </div>
  );
}

export default LoginPage;
