import { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="" className="h-8" alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-lime-500">Spend Smart</span>
        </a>
        <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        {isOpen && (
          <div className="w-full" id="navbar-hamburger">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50">
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Expense</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Income</a>
              </li>
              <li>
                <a href="#" className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' >Debt</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}