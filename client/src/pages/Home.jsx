import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='min-h-screen bg-slate-200'>
      <div className='w-full flex justify-center'>
      <nav className='flex flex-row h-[10rem] items-center justify-between w-[90%]'>
        <h1 className='text-5xl  font-bold px-0 md:px-[10rem]  flex justify-center md:justify-normal w-[50rem] '>Spend Smart</h1>
        <Link to="/login">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded" variant="contained">
            Login
          </Button>
        </Link>
      </nav>
      </div>
      
    
      <section className="flex flex-col md:flex-row flex-wrap w-full h-[90%] gap-4 md:gap-16 mt-6 md:mt-24 justify-center items-center bg-slate-400">
  <div className='p-4 md:p-16 w-full lg:w-[40%] text-center sm:text-start'>
    <h1 className="text-xl md:text-4xl font-bold mb-4">Empower your financial journey with SpendSmart</h1>
    <p className="mb-8">
      The smarter way to budget, save, and achieve your financial goals.
      Take the first steps towards a brighter financial future!
    </p>
    <Link to="/signup" className="no-underline w-full flex justify-center">
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="contained">
        Create Your Free Account
      </Button>
    </Link>
  </div>
  <div className='w-full md:w-[35%]'>
    <img src="banking.svg" alt="" className='w-full bg-transparent 2xl:bg-slate-200' />
  </div>
</section>
<section className="text-center flex flex-col p p-4 md:p-16 mt-10 md:mt-40 min-h-screen w-full md:w-3/4 mx-auto mb-14">
  <div className='h-[5rem] mb-12'>
  <h1 className='text-xl md:text-3xl font-bold mb-4'>Take Charge of Your Spending</h1>
  <p className="mb-8">
    With SpendSmart, every transaction is an opportunity to make smarter
    decisions. Our real-time tracking puts the power back in your hands,
    so you can see the full picture and stay ahead of your spending.
    Embrace the clarity that comes with detailed breakdowns and embrace a
    budget that works for you. Whether it&apos;s cutting back on the
    non-essentials or investing in your future, we&apos;re here to
    illuminate the path to financial freedom.
  </p>
  </div>
  <article className='bg-slate-400 mt-[10rem] h-min-screen px-6 rounded-xl'>
  <div>
    <p className='md:text-4xl text-3xl mt-[5rem] font-bold'>Want help with..</p>
  </div>
  <div className='flex flex-wrap flex-row mt-16 text-3xl md:text-4xl w-[100%] justify-between font-bold'>
  <div className='flex flex-col w-full md:w-[33%]'>
    <h1>Spending</h1>
    <img src="spending.svg" className="w-[90rem]  mt-1 sm:mt-12" alt="spending money" />
  </div>
  <div className='flex flex-col items-center w-full md:w-[20%]'>
    <h1>Saving</h1>
    <img src="savings.png" className=' w-[20rem] sm:w-[50rem]  mt-1 sm:mt-16' alt="saving money" />
  </div>
  <div className='flex flex-col w-full md:w-[33%]'>
    <h1>Investing</h1>
    <img src="investing.svg"  className="w-[80rem]  mt-1 sm:mt-16" alt="investing" />
  </div>
</div>
  <Link to="/signup" className="no-underline w-full flex justify-center mt-12 mb-[10rem]">
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="contained">
        Join us today!
      </Button>
    </Link>
  </article> 
  
 </section>
    </div>
  );
}