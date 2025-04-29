import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

    useEffect(() => {    
      async function getUsername() {
        const res = await fetch('http://localhost:3002/user/guest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"Rawr": ';3'})
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify({        
            username: data.username
          }));

          navigate('/');
        } else {
          alert(data.message || 'Uh oh...');
        }
      }
      getUsername();
    }, []);

  return (
    <div></div>
  );
}

export default LogoutPage;
