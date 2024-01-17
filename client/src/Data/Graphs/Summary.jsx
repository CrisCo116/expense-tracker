import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { GET_USER } from "../../utils/queries"
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
Chart.defaults.plugins.title = Chart.defaults.plugins.title || { font: {} };
Chart.defaults.plugins.title.font.size = 20; // Set title font size
Chart.defaults.plugins.title.color = "black"; // Set title color



export default function SummaryGraph() {
    const [fixedExpenses, setFixedExpenses] = useState([]);
 
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
   

    const plugins = [{
        beforeDraw: function(chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = "20";
            ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            var text = "Total: $" + totalExpense.toFixed(2),
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        } 
    }];

    return (
        <div className='w-full flex justify-center'>
            <div className='max-w-screen-xl w-full'> 
                <div className='w-full h-[25rem]'> 
                    <Doughnut
                        data={{
                            labels: fixedExpenses.map((expense) => expense.description),
                            datasets: [
                                {
                                    label: 'Cost',
                                    data: fixedExpenses.map((expense) => parseFloat(expense.expenseAmount)),
                                    backgroundColor: [
                                        'red',
                                        'green',
                                        'blue',
                                        'orange',
                                    ],
                                    borderRadius: 5,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            aspectRatio: 3,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Expenses by Category',
                                    padding: {
                                        top: 10,
                                        bottom: 30,
                                    },
                                    align: 'center',
                                },
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        padding: 20,
                                    },
                                },
                            }, 
                            cutout: 100,
                        }}
                        plugins={plugins}
                    />
                </div>
            </div>
        </div>
    );
}