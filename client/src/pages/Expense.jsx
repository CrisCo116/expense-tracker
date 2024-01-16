import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@mui/material'; import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';

export default function Expenses() {
  // State hooks for various components of the expense data
  const [expenseData, setExpenseData] = useState({
    amount: '0.00',
    description: '',
    frequency: 'Monthly',
    checkNumber: '',
    note: '',
  });

  const [amountError, setAmountError] = useState(false);

  const { loading, error, data: userData, refetch } = useQuery(GET_USER, {
    variables: { userId: localStorage.getItem('user_id') }, // Pass the userId variable
  });

  const [addFixedExpense] = useMutation(ADD_EXPENSE, {
    update: (cache, { data }) => {
      const existingUserData = cache.readQuery({
        query: GET_USER,
        variables: { userId: localStorage.getItem('user_id') },
      });

      const newExpense = data.addFixedExpense;

      cache.writeQuery({
        query: GET_USER,
        variables: { userId: localStorage.getItem('user_id') },
        data: {
          getUser: {
            ...existingUserData.getUser,
            fixedExpenses: [...existingUserData.getUser.fixedExpenses, newExpense],
          },
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Set user ID in local storage when page is loaded
    if (userData && userData.getUser && userData.getUser._id) {
      localStorage.setItem('user_id', userData.getUser._id);
    }

    if (userData && userData.getUser && userData.getUser.fixedExpenses) {
      setFixedExpenses(userData.getUser.fixedExpenses);
    }
  }, [userData]);

  useEffect(() => {
    if (loading === false) {
      setIsDataLoaded(true);
    }
  }, [loading]);

  const handleBlur = (event) => {
    if (!event.target.value.trim()) {
      setExpenseData({ ...expenseData, amount: '0.00' });
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
    setExpenseData({ ...expenseData, [name]: value });

    // Reset amountError if a valid amount is entered
    if (name === 'amount' && value.trim() && parseFloat(value) !== 0) {
      setAmountError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addFixedExpense({
        variables: {
          user_id: localStorage.getItem('user_id'),
          description: expenseData.description,
          expenseAmount: parseFloat(expenseData.amount),
          frequency: expenseData.frequency,
        },
      });

      // Reset form data
      setExpenseData({ amount: '', description: '', frequency: 'Monthly', checkNumber: '', note: '' });

      // Refetch user data to get the updated incomes
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!isDataLoaded) return null;

  return (
    <div className="income-container p-4 mb-[5rem] mt-[10rem]">
      <div className='flex justify-center'>
        <h1 className="text-2xl font-bold mb-10">Add Fixed Expense</h1>
      </div>
      <div className='w-full flex justify-center'>
        <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex justify-center w-[95%] sm:w-1/2 gap-4">
          <div className='flex flex-col w-full'>
            <TextField
              className="w-full"
              label="Amount"
              name="amount"
              type="number"
              value={expenseData.amount}
              onChange={handleChange}
              onClick={handleAmountClick}
              onBlur={handleBlur}
              error={amountError}
              helperText={amountError ? 'Please enter an amount for this expense' : ''}
              margin="dense"
            />
            <TextField
              className="w-full"
              label="Description"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              margin="dense"
            />
            {/* Dropdown for Frequency */}
            <Select
              className="w-full mb-[2rem]"
              label="Frequency"
              name="frequency"
              value={expenseData.frequency}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Frequency' }}
              margin="dense"
            >
              <MenuItem value="" disabled>
                Frequency
              </MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              {/* Add more frequency options as needed */}
            </Select>
            {/* ... other fields ... */}
            <Button type="submit" variant="contained" color="primary" className="w-1/2 sm:w-1/4">
              Add Fixed Expense
            </Button>
          </div>
        </form>
      </div>

      {/* Table to display incomes */}
      <div className='flex justify-center w-full'>
        <div className='w-full sm:w-1/2'>
          <TableContainer component={Paper} className="mt-8">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Frequency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fixedExpenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>${expense.expenseAmount}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.frequency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}