import React, { useState, useEffect } from "react";
import { ChevronLeft, Filter, Calendar, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";

function TransactionHistory() {
  const navigate = useNavigate();
  const [gameHistory, setGameHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedGameType, setSelectedGameType] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [showFilters, setShowFilters] = useState(false);

  const activeGameTab = localStorage.getItem("activeGameTab");
  const gameTypes = [
    { id: 1, name: "Majestic Pride 30 Sec" },
    { id: 2, name: "Majestic Pride 1 Min" },
    { id: 3, name: "Majestic Pride 3 Min" },
    { id: 4, name: "Majestic Pride 5 Min" },
  ];

  const activeGame =
    gameTypes.find((game) => game.id === Number(activeGameTab)) || gameTypes[0];

  useEffect(() => {
    // Retrieve full game history from localStorage
    const storedHistory = localStorage.getItem("gameHistory_tab1");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setGameHistory(parsedHistory);
      setFilteredHistory(parsedHistory); // Initialize filtered history with all history
    }
  }, []);

  useEffect(() => {
    // Apply filters whenever they change
    let result = [...gameHistory];

    // Filter by game type
    if (selectedGameType) {
      result = result.filter((entry) => entry.gameType === selectedGameType.id);
    }

    // Filter by date range
    if (dateRange.startDate) {
      const startDate = new Date(dateRange.startDate);
      result = result.filter((entry) => {
        const entryDate = new Date(entry.timestamp.split(" ")[0]);
        return entryDate >= startDate;
      });
    }

    if (dateRange.endDate) {
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59); // Set to end of day
      result = result.filter((entry) => {
        const entryDate = new Date(entry.timestamp.split(" ")[0]);
        return entryDate <= endDate;
      });
    }

    setFilteredHistory(result);
  }, [selectedGameType, dateRange, gameHistory]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setSelectedGameType(null);
    setDateRange({ startDate: "", endDate: "" });
  };

  const getGameNameById = (id) => {
    const game = gameTypes.find((game) => game.id === id);
    return game ? game.name : "Unknown Game";
  };

  return (
    <>
      <div className="bg-gray-900 max-w-md mx-auto">
        <div className="pb-14">
          {/* Header (Fixed) */}
          <div className="grid grid-cols-3 p-3 text-center shadow-md sticky top-0 z-10 bg-gray-700">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="stroke-white" />
            </button>
            <span className="font-semibold text-lg whitespace-nowrap text-white">
              Transaction History
            </span>
            <button onClick={toggleFilters}>
              <Filter className="stroke-white ml-auto" />
            </button>
          </div>

          {/* Filter Section */}
          {showFilters && (
            <div className="p-4 bg-gray-800 border-b border-gray-700">
              <div className="space-y-4">
                {/* Date Filter */}
                <div>
                  <h3 className="text-white text-sm mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Date Range
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-300 text-xs">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                        value={dateRange.startDate}
                        onChange={(e) =>
                          setDateRange({
                            ...dateRange,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-xs">End Date</label>
                      <input
                        type="date"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                        value={dateRange.endDate}
                        onChange={(e) =>
                          setDateRange({
                            ...dateRange,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Game Type Filter */}
                <div>
                  <h3 className="text-white text-sm mb-2">Game Type</h3>
                  <div className="relative">
                    <div
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        document.getElementById("gameTypeSelect").click()
                      }
                    >
                      <span>
                        {selectedGameType ? selectedGameType.name : "All Games"}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    <select
                      id="gameTypeSelect"
                      className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
                      value={selectedGameType ? selectedGameType.id : ""}
                      onChange={(e) => {
                        const selectedId = Number(e.target.value);
                        const selected = selectedId
                          ? gameTypes.find((game) => game.id === selectedId)
                          : null;
                        setSelectedGameType(selected);
                      }}
                    >
                      <option value="">All Games</option>
                      {gameTypes.map((game) => (
                        <option key={game.id} value={game.id}>
                          {game.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetFilters}
                  className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          <div className="p-4 flex justify-center items-center">
            <div className="w-full max-w-md p-2 rounded-lg shadow-md">
              {/* Filter Results Summary */}
              {(selectedGameType ||
                dateRange.startDate ||
                dateRange.endDate) && (
                <div className="mb-4 p-2 bg-gray-800 rounded-md text-white text-sm">
                  <p>Showing {filteredHistory.length} results with filters:</p>
                  <ul className="text-gray-300 text-xs mt-1">
                    {selectedGameType && <li>Game: {selectedGameType.name}</li>}
                    {dateRange.startDate && (
                      <li>From: {dateRange.startDate}</li>
                    )}
                    {dateRange.endDate && <li>To: {dateRange.endDate}</li>}
                  </ul>
                </div>
              )}

              {/* Game History List */}
              {filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="border border-gray-600 bg-gray-800 rounded-md p-4 text-white space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Detail</span>
                        <span>
                          {entry.gameType
                            ? getGameNameById(entry.gameType)
                            : activeGame.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Time</span>
                        <span>{entry.timestamp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Bet Amount</span>
                        <span
                          className={`font-semibold ${
                            entry.isWin ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          ₹{entry.betAmount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-white">
                  No game history found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TransactionHistory;
