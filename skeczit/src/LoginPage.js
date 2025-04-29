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
      body: JSON.stringify({ "email": login, "password": password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        avatar: data.avatar
      }));
      navigate('/');
    } else {
      alert(data.message || 'Błąd logowania');
    }
  };

  return (
    <article clas="container" style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>Logowanie</h2>
      <input 
        placeholder="Login" 
        value={login} 
        onChange={e => setLogin(e.target.value)} 
      /><br />
      <input 
        type="password" 
        placeholder="Hasło" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      /><br />
      <button onClick={handleLogin}>Zaloguj</button><br /><br />
      <button onClick={() => navigate('/register')}>Rejestracja</button>
    </article>
  );
}

export default LoginPage;
