import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function useBodyClass(className) {
  useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}

function App() {
  useBodyClass('bg-zinc-500');

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;