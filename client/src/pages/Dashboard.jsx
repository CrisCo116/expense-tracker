import Card from "../Data/Cards/Card";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Typography, Paper } from "@mui/material";
import { GET_USER } from "../utils/queries";
import userFinanceData from "../Data/UserData/ExpenseData";

export default function Dashboard() {
  const totalExpenses = userFinanceData.reduce((total, user) => {
    const userTotal = user.expenses.reduce((userTotal, expense) => userTotal + expense.amount, 0);
    return total + userTotal;
  }, 0);
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
    if (userData && userData.getUser && userData.getUser.incomes) {
      setIncomes(userData.getUser.incomes);
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
  return (
    
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-center mb-[15rem]">
      <div className="min-h-screen flex flex-col md:flex-row w-full md:w-3/4 border py-[5rem] ">
        <div className="border border-white rounded-lg bg-white w-full md:w-3/4 h-screen">
          <div className="w-full text-4xl font-bold m-10">
            <p>
              Welcome back{" "}
              {userData && userData.getUser ? userData.getUser.name : "Guest"}
            </p>
          </div>
          <div className="w-full h-[20rem]  flex flex-col gap-2 text-5xl justify-center items-center mt-[5rem]">
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
                Total Spending
            </Typography>
            <Typography variant="h4">
                ${totalExpenses.toFixed(2)}
            </Typography>
        </Paper>
              
            </div>
          </div>
        </div>
        <div className="border w-full md:w-1/4 h-screen">
          <div className="py-10 sm:py-0">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
