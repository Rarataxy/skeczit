import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch('http://localhost:3002/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"username": name, "email": email, "password": password})
    });
    console.log(res);
    
    const data = await res.json();
    if (res.ok) {
      navigate('/login');
    } else {
      alert(data.message || 'Błąd rejestracji');
    }
  };

  return (
    <article style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>Rejestracja</h2>
      <input placeholder="Nazwa" onChange={e => setName(e.target.value)} /><br />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleRegister}>Zarejestruj się</button>
    </article>
  );
}

export default RegisterPage;
