// Import necessary dependencies
import { Chart as ChartJS, defaults } from 'chart.js/auto'; // Import ChartJS library
import { Doughnut } from 'react-chartjs-2'; // Import Bar chart component from react-chartjs-2

import userData from '../UserData/ExpenseData'; // Import expense data

// Modify default ChartJS configurations
defaults.maintainAspectRatio = false; // Disable aspect ratio to adjust chart size
defaults.responsive = true; // Enable responsiveness
defaults.plugins.title.display = true; // Display title plugin by default
defaults.plugins.title.align = "start"; // Align title text to the start
defaults.plugins.title.font.size = 20; // Set title font size
defaults.plugins.title.color = "black"; // Set title color


export default function SummaryGraph() {
    
    const allExpenses = userData.flatMap(user => user.expenses);

    return (
        <div className='w-full flex justify-center'>
            <div className='max-w-screen-xl w-full'> 
                <div className='w-full h-[25rem]'> 
                    <Doughnut
                        data={{
                            labels: allExpenses.map((expense) => expense.category),
                            datasets: [
                                {
                                    label: 'Cost',
                                    data: allExpenses.map((expense) => expense.amount),
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
                            responsive: true, // Make the chart responsive
                            maintainAspectRatio: false, // Allow the chart to resize based on its container's dimensions
                            aspectRatio: 3, // Set the aspect ratio to a specific value (e.g., 2)
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Summary',
                                    padding: {
                                        top: 10,
                                        bottom: 30,
                                    },
                                    align: 'center',
                                },
                                legend: {
                                    position: 'bottom', // Position the legend at the bottom of the chart
                                    labels: {
                                        padding: 20, // Add padding to the legend labels
                                    },
                                },
                            }, 
                            cutout: 100,
                            
                        }}
                    />
                </div>
            </div>
        </div>
    );
}