import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {    
        localStorage.removeItem('user');
        navigate('/');
    }, []);

  return (
    <div></div>
  );
}

export default LogoutPage;
