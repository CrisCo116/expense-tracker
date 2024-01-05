import { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, FormControlLabel, FormGroup } from '@mui/material';

export default function Expenses() {
  const [expenseData, setExpenseData] = useState({
    amount: '0.00',
    description: '',
    category: '',
    timestamp: '', 
    checkNumber: '',
    note: '',// Initially empty, set to current date in the form element
  });

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [amountError, setAmountError] = useState(false);

  // Mock expenses data
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 50, description: 'Groceries', category: 'Food', timestamp: '2024-01-01' },
    { id: 2, amount: 20, description: 'Bus ticket', category: 'Transportation', timestamp: '2024-01-02' },
    // Add more mock data as needed
  ]);

  const handleAmountClick = (event) => {
    event.target.select();
  };

  const handleBlur = (event) => {
    if (event.target.name === "amount" && (!event.target.value.trim() || parseFloat(event.target.value) === 0)) {
      setExpenseData({ ...expenseData, amount: '0.00' });
      setAmountError(true);
    }
  };
  

    const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData({ ...expenseData, [name]: value });
  
    // Reset amountError if a valid amount is entered
    if (name === "amount" && value.trim() && parseFloat(value) !== 0) {
      setAmountError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert amount to a number with two decimal places
    const formattedExpense = {
      ...expenseData,
      amount: parseFloat(expenseData.amount).toFixed(2),
      id: expenses.length + 1
    };
    setExpenses([...expenses, formattedExpense]);
    setExpenseData({ amount: '', description: '', category: '', timestamp: '' });
  };
  

  return (
    <div className="expenses-container p-4">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col gap-4">
        <TextField
          className="w-1/2"
          label="Amount"
          name="amount"
          type="number"
          value={expenseData.amount}
          onChange={handleChange}
          onClick={handleAmountClick}
          onBlur={handleBlur}
          error={amountError}
          helperText={amountError ? "Please enter an amount for this transaction" : ""}
          margin="normal"
        />
        <TextField
          className="w-1/2"
          label="Where did you spend this money?"
          name="description"
          value={expenseData.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          className="w-1/2"
          label="Category"
          name="category"
          value={expenseData.category}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
          margin="normal"
        >
          <option value=""></option>
          <option value="Mortgage/Rent">Mortgage/Rent</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
          {/* Add more categories as needed */}
        </TextField>
        <TextField
          className="w-1/2"
          label="Date"
          name="timestamp"
          type="date"
          value={expenseData.timestamp}
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
              value={expenseData.checkNumber}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              className="w-1/2"
              label="Note"
              name="note"
              value={expenseData.note}
              onChange={handleChange}
              margin="normal"
            />
          </>
        )}
        <Button type="submit" variant="contained" color="primary" className="w-1/2">
          Add Expense
        </Button>
      </form>
       {/* Table to display expenses */}
       <TableContainer component={Paper} className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
