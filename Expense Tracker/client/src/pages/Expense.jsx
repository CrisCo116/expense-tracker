// Import necessary dependencies
import { Chart as ChartJS, defaults } from 'chart.js/auto'; // Import ChartJS library
import { Bar } from 'react-chartjs-2'; // Import Bar chart component from react-chartjs-2

import userData from '../Data/ExpenseData'; // Import expense data

// Modify default ChartJS configurations
defaults.maintainAspectRatio = false; // Disable aspect ratio to adjust chart size
defaults.responsive = true; // Enable responsiveness
defaults.plugins.title.display = true; // Display title plugin by default
defaults.plugins.title.align = "start"; // Align title text to the start
defaults.plugins.title.font.size = 20; // Set title font size
defaults.plugins.title.color = "black"; // Set title color

// React component to display the expense data
export default function Expense() {
    // Flatten the expenses of all users into a single array
    const allExpenses = userData.flatMap(user => user.expenses);

    return (
        <div className='w-full flex justify-center h-[50rem]'>
            <div className='max-w-screen-xl'>
                <h1>Expense</h1>
                <div className='w-[25rem] h-[25rem]'> {/* Adjust the width and height of the chart */}
                    <Bar
                        data={{
                            labels: allExpenses.map((expense) => expense.category), // Define labels for the chart (expense categories)
                            datasets: [
                                {
                                    label: "Cost", // Label for the dataset
                                    data: allExpenses.map((expense) => expense.amount), // Data representing the amounts
                                    backgroundColor: [ // Colors for the bars
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                    borderRadius: 5, // Border radius for the bars
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Monthly Expenses", // Title for the chart
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
