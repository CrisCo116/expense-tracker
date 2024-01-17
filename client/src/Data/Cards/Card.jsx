import { useState } from 'react';
import SummaryGraph from "../Graphs/Summary";
import MarketData from "../Graphs/MarketData";
import ExchangeRate from '../Graphs/ExchangeRate';

export default function Card() {
  const [activeSection, setActiveSection] = useState("Summary");

  return (
    <div className='ml-8 text-[13px] font-bold '>
      <div className="flex justify-center  border-black border-b-4">
        <button
          className={`cursor-pointer tablinks h-8 w-[12rem] rounded-md ${activeSection === "Summary" ? "bg-white" : ""}`}
          onClick={() => setActiveSection("Summary")}
        >
          Summary
        </button>
        <button
          className={`cursor-pointer tablinks h-8 w-[12rem] rounded-md ${activeSection === "Transaction" ? "bg-white" : ""}`}
          onClick={() => setActiveSection("Transaction")}
          
        >
          Exchange Rate
        </button>
        <button
          className={`cursor-pointer tablinks h-8 w-[12rem] rounded-md ${activeSection === "Market Data" ? "bg-white" : ""}`}
          onClick={() => setActiveSection("Market Data")}
        >
          Market Data
        </button>
      </div>
      {activeSection === "Summary" && (
        <div id="Summary" className="tabcontent">
          <SummaryGraph />
        </div>
      )}
      {activeSection === "Transaction" && (
        <div id="Transaction" className="tabcontent">
          <ExchangeRate />
        </div>
      )}
      {activeSection === "Market Data" && (
        <div id="Market Data" className="tabcontent">
          <MarketData />
        </div>
      )}
    </div>
  );
}