import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";

export default function MarketData() {
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA",  "V", "JNJ", "WMT", "JPM"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = symbols.map((symbol) =>
          Promise.all([
            axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_API_KEY}`),
            axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${import.meta.env.VITE_API_KEY}`)
          ])
        );
        const responses = await Promise.all(promises);
        const stockData = responses.map(([quoteResponse, profileResponse]) => ({ 
          name: profileResponse.data.name,
          value: quoteResponse.data.c
        }));
        setData(stockData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [{
      label: 'Stock Prices',
      data: data.map(item => item.value), // Update this line
      borderColor: 'rgba(75,192,192,1)', // You can set a fixed color here
      fill: false
    }]
  };
  

  return (
    <div>
      <div className="h-[25rem]">
        {loading ? 'Loading...' : <Line data={chartData} options={{ title: { display: true, text: 'Stock Prices' } }} />}
      </div>
    </div>
  );
}