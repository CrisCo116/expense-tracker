import Card from "../Data/Cards/Card";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Typography,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
} from "@mui/material";
import { GET_USER } from "../utils/queries";

export default function Dashboard() {
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    loading,
    error,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { userId: localStorage.getItem("user_id") },
  });

  useEffect(() => {
    if (userData && userData.getUser) {
      if (userData.getUser.incomes) {
        setIncomes(userData.getUser.incomes);
      }
      if (userData.getUser.fixedExpenses) {
        setFixedExpenses(userData.getUser.fixedExpenses);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (loading === false) {
      setIsDataLoaded(true);
    }
  }, [loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!isDataLoaded) return null;
  console.log(fixedExpenses);

  // get total expenses
  // get total expenses
  const totalExpense = fixedExpenses.reduce(
    (total, expense) => total + parseFloat(expense.expenseAmount),
    0
  );
  return (
    <div className="w-full flex justify-center">
    <div className="min-h-screen w-[95%] flex flex-col md:flex-row justify-center mb-[15rem] overflow-hidden">
      <div className="min-h-screen flex flex-col 2xl:flex-row w-full xl:w-3/4 border py-[5rem] ">
        <div className="border border-white rounded-lg bg-white w-full 2xl:w-[70%] min-h-screen">
          <div className="w-full text-2xl sm:text-4xl font-bold m-10">
            <p>
              Welcome back{" "}
              {userData && userData.getUser ? userData.getUser.name : "Guest"}
            </p>
          </div>
          <div className="w-full h-[20rem]  flex flex-col gap-2 text-5xl justify-center items-center mt-[15rem] mb-10">
            <div className="income-dashboard-page-container w-full p-4">
              <h1 className="text-2xl font-bold mb-4">Income</h1>
              {/* Total Income */}
              <Paper elevation={3} className="p-4 mb-4">
                <Typography variant="h6" gutterBottom>
                  Total Income
                </Typography>
                <Typography variant="h4">
                  $
                  {incomes
                    .reduce((total, income) => total + income.incomeAmount, 0)
                    .toFixed(2)}
                </Typography>
              </Paper>
            </div>
            <div className="income-dashboard-page-container w-full p-4">
              <h1 className="text-2xl font-bold mb-4">Expenses</h1>
              {/* Total Spending */}
              <Paper elevation={3} className="p-4 mb-4">
                <Typography variant="h6" gutterBottom>
                  Total Expenses
                </Typography>
                <Typography variant="h4">${totalExpense.toFixed(2)}</Typography>
              </Paper>
              <div className="flex justify-center w-full">
                <div className="w-full">
                <TableContainer component={Paper} className="mt-8 overflow-auto h-[20rem] no-scrollbar">
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
          </div>
        </div>
        <div>
          
        </div>
        <div className="border w-full 2xl:w-[30%] h-screen mt-[5rem] 2xl:mt-0">
          <div className="py-10 sm:py-0">
            <Card />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
