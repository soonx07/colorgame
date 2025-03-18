import React, { useState, useEffect } from "react";
import { Coins, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import BackButton from "../../component/CommonComp/BackButton";

const GameStatistics = () => {
  const [activeTab, setActiveTab] = useState("Lottery");
  const [gameHistory, setGameHistory] = useState([]);

  const navigate = useNavigate();

  // Load game history from local storage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("gameHistory_tab1");
    const activeGameTab = localStorage.getItem("activeGameTab");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setGameHistory(parsedHistory);
      } catch (error) {
        console.error("Error parsing game history:", error);
        setGameHistory([]); // Set to empty array if parsing fails
      }
    }
  }, []);

  const activeGameTab = localStorage.getItem("activeGameTab");
  const gameTypes = [
    { id: 1, name: "Majestic Pride 30 Sec" },
    { id: 2, name: "Majestic Pride 1 Min" },
    { id: 3, name: "Majestic Pride 3 Min" },
    { id: 4, name: "Majestic Pride 5 Min" },
  ];

  const activeGame =
    gameTypes.find((game) => game.id === Number(activeGameTab)) || gameTypes[0]; // Default to first game if not found

  const tabs = ["Lottery", "Casino", "Fishing", "Run"];

  return (
    <>
      <div className=" bg-gray-900 max-w-md mx-auto">
        <div className="pb-14">
          {/* Header (Fixed) */}
          <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Game Statistics
          </p>
        </header>
          <div className="max-w-md mx-auto  shadow-lg rounded-lg overflow-hidden pt-16">
            {/* Tabs */}
            <div className="flex bg-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 text-center ${
                    activeTab === tab
                      ? "bg-yellow-500 text-white font-bold"
                      : "text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Game History List */}
            {activeTab === "Lottery" && gameHistory.length > 0 ? (
              <div className="bg-gray-900 flex flex-col gap-4">
                {gameHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 transition-colors m-2 border border-gray-200 rounded-xl text-white"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold">
                          {activeGame.name}{" "}
                        </span>
                      </div>
                      <span
                        className={`
                  px-2 py-1 rounded text-xs font-bold
                  ${
                    !entry.isWin
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }
                `}
                      >
                        {entry.isWin ? "Win" : "Lose"}
                      </span>
                    </div>
                    <div className="text-sm text-white space-y-1 border-b pb-2">
                      <div className="flex justify-between items-center">
                        <p>Period:</p>
                        <p> {entry.period}</p>
                      </div>
                      <div className="flex justify-between">
                        <span>Big/Small: </span>
                        <span>{entry.bigSmall}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date: </span>
                        <span>{entry.timestamp}</span>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1  text-sm ">
                      <div className="flex justify-between items-center">
                        <span className="text-white ">Selected Option</span>
                        <p className="font-semibold">{entry.selectedOption}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white ">Color</span>
                        <p
                          className={`font-semibold ${
                            entry.color === "Green"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {entry.color}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-white ">Bet Amount</span>
                        <p className="font-semibold">₹{entry.betAmount}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-white ">Result Number</span>
                        <p className="font-semibold">{entry.result}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-white ">
                      <span>Payout</span>
                      <span
                        className={
                          entry.payout > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        ₹{entry.payout}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-white ">
                No game history found
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GameStatistics;
