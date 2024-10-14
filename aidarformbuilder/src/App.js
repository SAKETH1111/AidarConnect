import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Redirect to '/home' if logged in
    if (isLoggedIn) {
        navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-rose-100">
      <Header />
      <main className="flex-grow px-6 py-4">
        <Outlet />  {/* used to render child routes within a parent route */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
