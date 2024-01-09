import SummaryGraph from "../Graphs/Summary";
import MarketData from "../Graphs/MarketData";
export default function Card() {
    const openSection = (evt, sectionName) => {
        // Declare all variables
        var i, tabcontent, tablinks;
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(sectionName).style.display = "block";
        evt.currentTarget.className += " active";
      };
      
      return (
        <div>
          <div className="flex justify-center space-x-4">
            <button
              className="cursor-pointer tablinks"
              onClick={(event) => openSection(event, "Summary")}
            >
              Summary
            </button>
            <button
              className=" cursor-pointer tablinks"
              onClick={(event) => openSection(event, "Transaction")}
            >
              Transactions
            </button>
            <button
              className=" cursor-pointer tablinks"
              onClick={(event) => openSection(event, "Market Data")}
            >
              Market Data
            </button>
          </div>
            <div id="Summary" className="tabcontent">
                <SummaryGraph />
                </div>
                <div id="Transaction" className="tabcontent">
                <h3>Transaction</h3>
                </div>
                <div id="Market Data" className="tabcontent">
                <h3>Market Data</h3>
                <MarketData />
                </div>
        </div>
      );
      }