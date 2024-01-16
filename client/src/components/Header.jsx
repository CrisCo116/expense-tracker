import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Auth.logout();

    window.location.href = "/login";
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
      )}
      <nav className="bg-white z-30 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="" className="h-8" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-sky-600 lg:text-5xl">SpendSmart</span>
          </Link>
          <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          {isOpen && (
            <div className="w-full relative flex z-40 bg-white" id="navbar-hamburger">
              <ul className="flex flex-col bg-white mt-5 absolute w-full font-medium rounded-lg">
                <li>
                  <Link onClick={toggleMenu}  to="/Dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link onClick={toggleMenu}  to="/Expense" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Expense</Link>
                </li>
                <li>
                  <Link onClick={toggleMenu}  to="/Income" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Income</Link>
                </li>
                <li>
                  <Link to="#" onClick={(event) => event.preventDefault()} className="block py-2 px-3 text-gray-900 rounded cursor-not-allowed">Debt (coming soon)</Link>
                </li>
                <li>
                  <Link  to="/login" onClick={handleLogout} className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' >Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}