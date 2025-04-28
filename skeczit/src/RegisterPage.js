import { useState } from 'react';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch('http://localhost:3002/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"username": name, "email": email, "password": password})
    });

    const data = await res.json();
    if (res.ok) {
      alert('Zarejestrowano pomyślnie!');
    } else {
      alert(data.message || 'Błąd rejestracji');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>Rejestracja</h2>
      <input placeholder="Nazwa" onChange={e => setName(e.target.value)} /><br />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleRegister}>Zarejestruj się</button>
    </div>
  );
}

export default RegisterPage;
