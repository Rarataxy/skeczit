import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [username, setusername] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem('user');
    
    if (user) {
      user = JSON.parse(user);
      setusername(user.username);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>GRA</h1>
      {username ? (
        <div>
          <p> Hi {username}!</p><button onClick={() => navigate('/logout')}>Wyloguj sie</button>
        </div>
        ) : (
        <><button onClick={() => navigate('/login')}>Zaloguj sie</button><br/><br/>Lub kontynuuj jako <button onClick={() => navigate('/guest')}>Gość</button></>
      )}
    </div>
  );
}

export default HomePage;
