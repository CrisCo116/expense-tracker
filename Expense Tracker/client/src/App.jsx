import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Header';

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

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;