import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";

export default function MarketData() {
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  const [data, setData] = useState([]);
  const symbols = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "FB",
    "TSLA",
    "BRK-A",
    "V",
    "JNJ",
    "WMT",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = symbols.map((symbol) =>
          axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${
              import.meta.env.VITE_API_KEY
            }`
          )
        );
        const responses = await Promise.all(promises);
        const stockData = responses.map((response) => response.data);
        setData(stockData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Process the fetched data to create labels and datasets for the Line Chart
  const chartData = {
    labels: symbols, // Use the company symbols as labels for the x-axis
    datasets: [
      {
        label: "Stock Prices",
        data: data.map((item) => item.c), // Use the numbers as data for the y-axis
        fill: false,
        borderColor: "blue",
        backgroundColor: "transparent",
      },
    ],
  };

  return (
    <div>
      <div className="h-[25rem]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Stock Prices of Top Companies",
                padding: {
                  top: 10,
                  bottom: 30,
                },
                align: "center",
              },
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  padding: 20,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
