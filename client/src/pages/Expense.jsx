import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, FormControlLabel, FormGroup } from '@mui/material';
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../utils/mutations';


export default function Expenses() {
  const [expenseData, setExpenseData] = useState({
    amount: '0.00',
    description: '',
    category: '',
    checkNumber: '',
    note: '',
  });

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [addExpenseMutation] = useMutation(ADD_EXPENSE);
  const [updateExpenseMutation] = useMutation(UPDATE_EXPENSE);
  const [deleteExpenseMutation] = useMutation(DELETE_EXPENSE);
  const [dueDate, setDueDate] = useState('');
  const [repeatFrequency, setRepeatFrequency] = useState('');

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

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData({ ...expenseData, [name]: value });
  
    // Reset amountError if a valid amount is entered
    if (name === "amount" && value.trim() && parseFloat(value) !== 0) {
      setAmountError(false);
    }
  };

  const handleAddExpense = async () => {
    try {
        const { data } = await addExpenseMutation({ variables: { input: expenseData } });
        setExpenses([...expenses, data.addFixedExpense]);
        setExpenseData({ amount: '0.00', description: '', category: '', checkNumber: '', note: '', dueDate: '', repeatFrequency: '' });
    } catch (error) {
        console.error('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async (expenseId) => {
    try {
        const { data } = await updateExpenseMutation({ variables: { input: { ...expenseData, id: expenseId } } });
        setExpenses(expenses.map(exp => exp.id === expenseId ? data.updateFixedExpense : exp));
    } catch (error) {
        console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
        await deleteExpenseMutation({ variables: { id: expenseId } });
        setExpenses(expenses.filter(exp => exp.id !== expenseId));
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setRepeatFrequency(event.target.value);
  };

{/*  
  How it originally was handling the AddExpense
  const handleSubmit = (event) => {
    event.preventDefault();
    const newExpense = {
        ...expenseData,
        dueDate,
        repeatFrequency,
        id: expenses.length + 1
    };
    setExpenses([...expenses, newExpense]);
    setExpenseData({ amount: '0.00', description: '', category: '', checkNumber: '', note: '' });
    setDueDate('');
    setRepeatFrequency('');
}; */}

  return (
    <div className="expenses-container p-4">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleAddExpense} noValidate autoComplete="off" className="flex flex-col gap-4">
        {/* Here was handleSubmit */}
        {/* Amount Field */}
        <TextField
          className="w-1/2"
          label="Amount"
          name="amount"
          type="number"
          value={expenseData.amount}
          onChange={handleChange}
          onClick={handleAmountClick}
          onBlur={handleBlur}
          margin="normal"
          error={amountError}
          helperText={amountError ? "Please enter an amount for this transaction" : ""}
        />

        {/* Description Field */}
        <TextField
          className="w-1/2"
          label="Where did you spend this money?"
          name="description"
          value={expenseData.description}
          onChange={handleChange}
          margin="normal"
        />

        {/* Category Field */}
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
        </TextField>

        {/* Due Date Field */}
        <TextField
          className="w-1/2"
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Repeat Frequency Field */}
        <TextField
          className="w-1/2"
          label="Repeat Frequency"
          name="repeat frequency"
          value={repeatFrequency}
          onChange={handleFrequencyChange}
          select
          SelectProps={{
            native: true,
          }}
          margin="normal"
        >
          <option value=""></option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </TextField>

        {/* More Options */}
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

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" className="w-1/2">
          Add Expense
        </Button>
      </form>

      {/* Expenses Table */}
      <TableContainer component={Paper} className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Frequency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.dueDate}</TableCell>
                <TableCell>{expense.repeatFrequency}</TableCell>
                <Button onClick={() => handleUpdateExpense(expense.id)}>Update</Button>
                <Button onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
