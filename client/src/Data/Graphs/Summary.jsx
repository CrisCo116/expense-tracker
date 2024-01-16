import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';

Chart.defaults.plugins.title = Chart.defaults.plugins.title || { font: {} };
Chart.defaults.plugins.title.font.size = 20; // Set title font size
Chart.defaults.plugins.title.color = "black"; // Set title color
import userFinanceData from '../UserData/ExpenseData';


export default function SummaryGraph() {
    const allExpenses = userFinanceData.flatMap(user => user.expenses);
    const totalExpenses = allExpenses.reduce((total, expense) => total + expense.amount, 0);

    const plugins = [{
        beforeDraw: function(chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = "20";
            ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            var text = "Total: $" + totalExpenses.toFixed(2),
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