import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, FormControlLabel, FormGroup } from '@mui/material';
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../utils/mutations';

export default function Expenses() {
  // State hooks for various components of the expense data
  const [expenseData, setExpenseData] = useState({
    amount: '0.00',
    description: '',
    category: '',
    checkNumber: '',
    note: '',
  });

  // State for additional UI elements
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [amountError, setAmountError] = useState(false);

  // Apollo Client mutations
  const [addExpenseMutation] = useMutation(ADD_EXPENSE);
  const [updateExpenseMutation] = useMutation(UPDATE_EXPENSE);
  const [deleteExpenseMutation] = useMutation(DELETE_EXPENSE);

  // States for date and frequency inputs
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState('');

  // Mock expenses data state
  const [expenses, setExpenses] = useState([
    // Initial mock data for testing
    { id: 1, amount: 50, description: 'Groceries', category: 'Food', dueDate: '2024-01-01' },
    { id: 2, amount: 20, description: 'Bus ticket', category: 'Transportation', dueDate: '2024-01-02' },
  ]);

  // Event handler to select the amount input text
  const handleAmountClick = (event) => {
  event.target.select();
  };

  // Event handler for when input loses focus
  const handleBlur = (event) => {
    if (event.target.name === "amount" && (!event.target.value.trim() || parseFloat(event.target.value) === 0)) {
      setExpenseData({ ...expenseData, amount: '0.00' });
      setAmountError(true);
    }
  };

  // General input change handler
  const handleChange = (event) => {
   const { name, value } = event.target;
   setExpenseData({ ...expenseData, [name]: value });

    if (name === "amount" && value.trim() && parseFloat(value) !== 0) {
      setAmountError(false);
    }
  };

  // Handler for adding a new expense
  const handleAddExpense = async (event) => {
    event.preventDefault();
    try {
        // Prepare the expense data for mutation
        const expenseInput = {
            description: expenseData.description,
            amount: parseFloat(expenseData.amount),
            dueDate: dueDate,
            frequency: frequency,
            category: expenseData.category,
            userId: '659e1502e08faca90ac7c039' // Example user ID, replace with actual user ID
        };
        console.log('Adding expense with data:', expenseInput);
        const { data } = await addExpenseMutation({
            variables: { input: expenseInput }
        });
        // Reset form fields
        if (data && data.addFixedExpense) {
            setExpenses([...expenses, data.addFixedExpense]);
            setExpenseData({ amount: '0.00', description: '', category: ''});
            setDueDate('');
            setFrequency('');
        }
    } catch (error) {
        console.error('Error adding expense:', error);
        // Handle error appropriately
    }
  };
  
  // Handler for updating an existing expense
  const handleUpdateExpense = async (expenseId) => {
    try {
        const { data } = await updateExpenseMutation({ variables: { input: { ...expenseData, id: expenseId } } });
        setExpenses(expenses.map(exp => exp.id === expenseId ? data.updateFixedExpense : exp));
    } catch (error) {
        console.error('Error updating expense:', error);
    }
  };

  // Handler for deleting an existing expense
  const handleDeleteExpense = async (expenseId) => {
    try {
        await deleteExpenseMutation({ variables: { id: expenseId } });
        setExpenses(expenses.filter(exp => exp.id !== expenseId));
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
  };

  // Event handler for changes in due date
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  // Event handler for changes in frequency
  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  return (
    <div className="expenses-container p-4">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      {/* Form for adding or updating expenses */}
      <form onSubmit={handleAddExpense} noValidate autoComplete="off" className="flex flex-col gap-4">
      {/* Input fields for expense data */}
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
          <option value="Mortgage">Mortgage</option>
          <option value="Rent">Rent</option>
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
          value={frequency}
          onChange={handleFrequencyChange}
          select
          SelectProps={{
            native: true,
          }}
          margin="normal"
        >
          <option value=""></option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
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
            {/* Mapping over expenses to display each as a table row */}
            {expenses.map((expense) => (
            <TableRow key={expense.id}>
            {/* Displaying expense data in table cells */}
            <TableCell>${expense.amount}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{new Date(expense.dueDate).toLocaleDateString()}</TableCell>
            <TableCell>{expense.frequency}</TableCell>
            <TableCell>
              <Button onClick={() => handleUpdateExpense(expense.id)}>Update</Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
