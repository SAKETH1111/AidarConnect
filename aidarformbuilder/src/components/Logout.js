import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Set the isLoggedIn flag to false in localStorage
        localStorage.clear();
        
        // Navigate back to login after setting localStorage
        navigate('/');
    }, [navigate]);

    return null; // You can return a loading spinner or message if needed, but it's optional
}

export default Logout;
