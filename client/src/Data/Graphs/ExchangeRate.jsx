import { useState, useEffect } from 'react';

export default function ExchangeRate() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const topCurrencies = ['USD','EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW'];
    Promise.all(topCurrencies.map(currency => 
      fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
        .then(response => response.json())
        .then(data => ({ currency, rate: data.rates.USD }))
    ))
    .then(rates => setRates(rates));
  }, []);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Currency
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rate
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rates.map(({ currency, rate }) => (
          <tr key={currency}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {currency}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {rate}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}