import { useState } from 'react';
import SummaryGraph from "../Graphs/Summary";
import MarketData from "../Graphs/MarketData";

export default function Card() {
  const [activeSection, setActiveSection] = useState("Summary");

  return (
    <div>
      <div className="flex justify-center space-x-4">
        <button
          className={`cursor-pointer tablinks ${activeSection === "Summary" ? "active" : ""}`}
          onClick={() => setActiveSection("Summary")}
        >
          Summary
        </button>
        <button
          className={`cursor-pointer tablinks ${activeSection === "Transaction" ? "active" : ""}`}
          onClick={() => setActiveSection("Transaction")}
        >
          Transactions
        </button>
        <button
          className={`cursor-pointer tablinks ${activeSection === "Market Data" ? "active" : ""}`}
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
          <h3>Transaction</h3>
        </div>
      )}
      {activeSection === "Market Data" && (
        <div id="Market Data" className="tabcontent">
          <h3>Market Data</h3>
          <MarketData />
        </div>
      )}
    </div>
  );
}