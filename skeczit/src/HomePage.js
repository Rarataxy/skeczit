import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>GRA</h1>
      <button onClick={() => navigate('/login')}>Zaloguj</button>
    </div>
  );
}

export default HomePage;
