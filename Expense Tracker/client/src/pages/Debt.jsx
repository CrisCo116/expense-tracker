import { useState } from 'react';

const DebtTracker = () => {
  const [debts, setDebts] = useState([]);
  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');

  const addDebt = () => {
    if (debtName && debtAmount) {
      setDebts([...debts, { name: debtName, amount: debtAmount }]);
      setDebtName('');
      setDebtAmount('');
    }
  };

  return (
    <div>
      <h2>Debt Tracker</h2>
      <div>
        <label htmlFor="debtName">Debt Name:</label>
        <input
          type="text"
          id="debtName"
          value={debtName}
          onChange={(e) => setDebtName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="debtAmount">Debt Amount:</label>
        <input
          type="number"
          id="debtAmount"
          value={debtAmount}
          onChange={(e) => setDebtAmount(e.target.value)}
        />
      </div>
      <button onClick={addDebt}>Add Debt</button>
      <div>
        <h3>Debts:</h3>
        <ul>
          {debts.map((debt, index) => (
            <li key={index}>
              <strong>{debt.name}:</strong> ${debt.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebtTracker;
