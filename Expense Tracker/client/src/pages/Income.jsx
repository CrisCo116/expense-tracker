import { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, FormControlLabel, FormGroup } from '@mui/material';

export default function Income() {
  const [incomeData, setIncomeData] = useState({
    amount: '0.00',
    source: '',
    date: '',
    checkNumber: '',
    note: '',
  });
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const [incomes, setIncomes] = useState([
    { id: 1, amount: 1000, source: 'Salary', date: '2024-01-01' },
    { id: 2, amount: 200, source: 'Freelance', date: '2024-01-05' },
    // More mock data or fetched from an API
  ]);

  const handleBlur = (event) => {
    if (!event.target.value.trim()) {
        setIncomeData({ ...incomeData, amount: '0.00' });
        setAmountError(true);
    } else {
        setAmountError(false);
    }
};


  const handleAmountClick = (event) => {
    event.target.select();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeData({ ...incomeData, [name]: value });
};


  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert amount to a number with two decimal places
    const formattedIncome = {
      ...incomeData,
      amount: parseFloat(incomeData.amount).toFixed(2),
      id: incomes.length + 1
    };
    setIncomes([...incomes, formattedIncome]);
    setIncomeData({ amount: '', source: '', date: '' });
  };

  return (
    <div className="income-container p-4">
      <h1 className="text-2xl font-bold mb-4">Add Income</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col gap-4">
        <TextField
          className="w-1/2"
          label="Amount"
          name="amount"
          type="number"
          value={incomeData.amount}
          onChange={handleChange}
          onClick={handleAmountClick}
          onBlur={handleBlur}
          error={amountError}
          helperText={amountError ? "Please enter an amount for this transaction" : ""}
          margin="normal"
        />
        <TextField
          className="w-1/2"
          label="Where did this money come from?"
          name="source"
          value={incomeData.source}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          className="w-1/2"
          label="Date"
          name="date"
          type="date"
          value={incomeData.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* ... other fields ... */}
        <FormGroup>
          <FormControlLabel 
            control={<Switch checked={showMoreOptions} onChange={() => setShowMoreOptions(!showMoreOptions)} />}
            label="+More Options"
          />
        </FormGroup>
        {showMoreOptions && (
          <>
            <TextField
              className="w-1/2"
              label="Check #"
              name="checkNumber"
              value={incomeData.checkNumber}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              className="w-1/2"
              label="Note"
              name="note"
              value={incomeData.note}
              onChange={handleChange}
              margin="normal"
            />
          </>
        )}
        <Button type="submit" variant="contained" color="primary" className="w-1/2">
          Add Income
        </Button>
      </form>
      
      {/* Table to display incomes */}
      <TableContainer component={Paper} className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map((income) => (
              <TableRow key={income.id}>
                <TableCell>${income.amount}</TableCell>
                <TableCell>{income.source}</TableCell>
                <TableCell>{income.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
