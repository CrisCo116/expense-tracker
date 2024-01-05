import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Header';

import Footer from './components/Footer';

function useBodyClass(className) {
  useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}

function App() {
  useBodyClass('bg-white');

  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && <Nav />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;