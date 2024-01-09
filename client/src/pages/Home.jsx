import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="text-center p-16">
        <h1 className="text-3xl font-bold mb-4">Empower your financial journey with SpendSmart</h1>
        <p className="mb-8">
          The smarter way to budget, save, and achieve your financial goals.
          Take the first steps towards a brighter financial future!
        </p>
        <Link to="/signup" className="no-underline">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="contained">
            Create Your Free Account
          </Button>
        </Link>
      </section>
      <section className="text-center p-16">
        <h1 className='text-3xl font-bold mb-4'>Take Charge of Your Spending</h1>
        <p className="mb-8">
          With SpendSmart, every transaction is an opportunity to make smarter
          decisions. Our real-time tracking puts the power back in your hands,
          so you can see the full picture and stay ahead of your spending.
          <br />
          Embrace the clarity that comes with detailed breakdowns and embrace a
          budget that works for you. Whether it&apos;s cutting back on the
          non-essentials or investing in your future, we&apos;re here to
          illuminate the path to financial freedom.
        </p>
      </section>
    </div>
  );
}