import React, { useState, useEffect, useRef } from "react";
import Pagination from "../CommonComp/Pagination";

function TabLedger({
  activeTab,
  gameHistory,
}) {
  const [activeTab2, setActiveTab2] = useState(1);
  const [tabHistories, setTabHistories] = useState({});
  const [currentPageChart, setCurrentPageChart] = useState(1);
  const chartContainerRef = useRef(null);
  const [userBetHistory, setUserBetHistory] = useState([]);

  // Pagination states
  const [currentPageGameHistory, setCurrentPageGameHistory] = useState(1);
  const [currentPageMyHistory, setCurrentPageMyHistory] = useState(1);
  const rowsPerPage = 5;

  const handleTabClick2 = (tabNumber2) => {
    setActiveTab2(tabNumber2);
  };

  const tabs = [
    { id: 1, label: "Game History" },
    { id: 2, label: "Chart" },
    { id: 3, label: "My History" },
  ];

  const gameTypes = [
    { id: 1, name: "Majestic Pride 30 Sec" },
    { id: 2, name: "Majestic Pride 1 Min" },
    { id: 3, name: "Majestic Pride 3 Min" },
    { id: 4, name: "Majestic Pride 5 Min" },
  ];

  const getTabName = (tabId) => {
    const gameType = gameTypes.find((type) => type.id === tabId);
    return gameType ? gameType.name : "Unknown";
  };

  const numberColorMapping = {
    0: { color: "Red", secondColor: "Violet" },
    1: { color: "Green" },
    2: { color: "Red" },
    3: { color: "Green" },
    4: { color: "Red" },
    5: { color: "Green", secondColor: "Violet" },
    6: { color: "Red" },
    7: { color: "Green" },
    8: { color: "Red" },
    9: { color: "Green" },
  };

  const colorClasses = {
    Red: "text-red-400",
    Green: "text-green-400",
    Violet: "text-violet-400",
  };

  const getBigSmall = (number) => {
    return parseInt(number) >= 5 ? "Big" : "Small";
  };

  useEffect(() => {
    // When gameHistory prop changes, process it properly
    if (gameHistory && gameHistory.length > 0) {
      // Create a copy of the game history that's specific to the active tab
      const filteredHistory = gameHistory.filter(game => 
        game.tabId === activeTab || !game.tabId
      );
      
      setTabHistories(prev => ({
        ...prev,
        [activeTab]: filteredHistory
      }));
    }
  }, [gameHistory, activeTab]);

  const filteredGameHistory = tabHistories[activeTab] || [];

  const enhancedGameHistory = filteredGameHistory.map((game) => {
    if (!game.color || !game.bigSmall) {
      const numberInfo = numberColorMapping[game.number % 10];
      return {
        ...game,
        color: numberInfo.secondColor
          ? `${numberInfo.color} & ${numberInfo.secondColor}`
          : numberInfo.color,
        bigSmall: getBigSmall(game.number),
      };
    }
    return game;
  });

  const uniqueEnhancedGameHistory = enhancedGameHistory.filter(
    (game, index, self) =>
      index ===
      self.findIndex(
        (g) => g.period === game.period && g.number === game.number
      )
  );

  useEffect(() => {
    // Load user bet history for the active tab
    const tabUserBets = localStorage.getItem(`userBets_tab${activeTab}`);
    if (tabUserBets) {
      try {
        setUserBetHistory(JSON.parse(tabUserBets));
      } catch (error) {
        console.error(`Error parsing user bet history for tab ${activeTab}:`, error);
        setUserBetHistory([]);
      }
    } else {
      setUserBetHistory([]);
    }
  }, [activeTab]);

  const renderGameTable = (title) => {
    const totalPages = Math.ceil(
      uniqueEnhancedGameHistory.length / rowsPerPage
    );
    const startIndex = (currentPageGameHistory - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedGames = uniqueEnhancedGameHistory.slice(
      startIndex,
      endIndex
    );

    return (
      <div className="w-full py-4 bg-gradient-to-r from-black via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700">
        <div className="rounded-lg relative text-center px-2 ">
          <span className="text-base font-bold text-yellow-300 block mb-4 uppercase tracking-wider">
            {title}
          </span>
          <div className="overflow-x-auto">
            <table className="rounded-lg w-full text-sm text-left rtl:text-right text-gray-200">
              <thead className="text-xs tracking-wider bg-gray-700 text-yellow-200 border-b border-gray-600">
                <tr>
                  <th scope="col" className="p-3 rounded-tl-lg">
                    Period
                  </th>
                  <th scope="col" className="p-3">
                    Number
                  </th>
                  <th scope="col" className="p-3">
                    Big/Small
                  </th>
                  <th scope="col" className="p-3 rounded-tr-lg">
                    Color
                  </th>
                </tr>
              </thead>
              <tbody className="bg-opacity-80 bg-gray-800">
                {paginatedGames.length > 0 ? (
                  paginatedGames.map((game, index) => {
                    const numberInfo = numberColorMapping[game.number % 10];
                    const hasViolet = numberInfo.secondColor === "Violet";

                    return (
                      <tr
                        key={game.period}
                        className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-200"
                      >
                        <th
                          scope="row"
                          className="text-xs  whitespace-nowrap p-3 text-yellow-100"
                        >
                          {game.period}
                        </th>
                        <td
                          className={`${
                            colorClasses[numberInfo.color]
                          }  text-center text-xl p-3 animate-pulse`}
                        >
                          {game.number}
                        </td>
                        <td
                          className="text-white text-center p-3"
                        >
                          {game.bigSmall}
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center">
                            {hasViolet ? (
                              <div className="flex gap-1">
                                <div className="w-4 h-4 bg-violet-500 rounded-full text-center shadow-lg shadow-violet-500/50"></div>
                                <div
                                  className={`w-4 h-4 ${
                                    numberInfo.color === "Red"
                                      ? "bg-red-500 shadow-red-500/50"
                                      : "bg-green-500 shadow-green-500/50"
                                  } rounded-full text-center shadow-lg`}
                                ></div>
                              </div>
                            ) : (
                              <div
                                className={`w-4 h-4 ${
                                  numberInfo.color === "Red"
                                    ? "bg-red-500 shadow-red-500/50"
                                    : "bg-green-500 shadow-green-500/50"
                                } rounded-full text-center shadow-lg`}
                              ></div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b border-gray-700">
                    <td colSpan="4" className="text-center p-6 text-gray-300">
                      No game history yet for {title}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination for game history */}
        <Pagination
          currentPage={currentPageGameHistory}
          totalPages={totalPages}
          onPageChange={setCurrentPageGameHistory}
        />
      </div>
    );
  };

  const renderMyHistoryTable = (title) => {
    // Filter game history to include only entries where the user placed a bet
    const filteredUserBets = userBetHistory.filter(
      (game) => game.betAmount && game.selectedOption
    );

    // Group bets by period
    const groupedBets = filteredUserBets.reduce((acc, game) => {
      if (!acc[game.period]) {
        acc[game.period] = [];
      }
      acc[game.period].push(game);
      return acc;
    }, {});

    // Pagination for the my history table
    const totalPages = Math.ceil(Object.keys(groupedBets).length / rowsPerPage);
    const startIndex = (currentPageMyHistory - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedBets = Object.entries(groupedBets).slice(
      startIndex,
      endIndex
    );

    return (
      <div className="w-full py-4 bg-gradient-to-r from-black via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700">
        <div className="rounded-lg relative text-center px-2">
          <span className="text-base font-bold text-yellow-300 block mb-4 uppercase tracking-wider">
            {title} - My Bets
          </span>
          <div className="overflow-x-auto">
            <table className="rounded-lg w-full text-sm text-left rtl:text-right text-gray-200">
              <thead className="text-xs bg-gray-700 text-yellow-200 border-b border-gray-600">
                <tr>
                  <th scope="col" className="p-3 rounded-tl-lg">
                    Period
                  </th>
                  <th scope="col" className="p-3">
                    Selection
                  </th>
                  <th scope="col" className="p-3">
                    Amount
                  </th>
                  <th scope="col" className="p-3 rounded-tr-lg">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-opacity-80 bg-gray-800">
                {paginatedBets.length > 0 ? (
                  paginatedBets.map(([period, bets], index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-200"
                    >
                      <th
                        scope="row"
                        className="text-xs  whitespace-nowrap p-3 text-yellow-100"
                      >
                        {period}
                      </th>
                      <td className="text-center p-3 text-white">
                        {bets.map((bet, index) => (
                          <div key={index}>{bet.selectedOption}</div>
                        ))}
                      </td>
                      <td className="text-center p-3 text-white">
                        {bets.map((bet, index) => (
                          <div key={index}>₹{bet.betAmount}</div>
                        ))}
                      </td>
                      <td
                        className={` ${
                          bets.some((bet) => bet.isWin)
                            ? "text-green-400"
                            : "text-red-400"
                        } p-3 ${
                          bets.some((bet) => bet.isWin) ? "animate-pulse" : ""
                        }`}
                      >
                        {bets.some((bet) => bet.isWin)
                          ? `Win ₹${bets.reduce(
                              (acc, bet) => acc + (bet.isWin ? bet.payout : 0),
                              0
                            )}`
                          : "Loss"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-700">
                    <td colSpan="4" className="text-center p-6 text-gray-300">
                      No betting history yet for {title}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination for my history */}
        <Pagination
          currentPage={currentPageMyHistory}
          totalPages={totalPages}
          onPageChange={setCurrentPageMyHistory}
        />
      </div>
    );
  };

  // Effect for drawing connection lines
  useEffect(() => {
    if (activeTab2 === 2 && chartContainerRef.current) {
      // Wait a moment for the UI to render
      setTimeout(() => {
        drawConnectionLines();
      }, 50);
    }
  }, [activeTab2, currentPageChart]);

  // Function to draw connection lines using DOM measurements
  const drawConnectionLines = () => {
    // Find all the rows in the chart
    const rows = document.querySelectorAll(".chart-row");
    if (rows.length <= 1) return;

    // Removed any existing connection lines
    const existingSvg = document.querySelector(".chart-connections");
    if (existingSvg) existingSvg.remove();

    // Create a new SVG element for the connections
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute(
      "class",
      "chart-connections absolute top-0 left-0 w-full h-full pointer-events-none"
    );
    svg.style.zIndex = "1";

    // Get the position of the chart container for relative positioning
    const containerRect = chartContainerRef.current.getBoundingClientRect();

    // For each pair of consecutive rows
    for (let i = 0; i < rows.length - 1; i++) {
      const currentRow = rows[i];
      const nextRow = rows[i + 1];

      // Find the highlighted numbers in each row
      const currentHighlight = currentRow.querySelector(".highlighted-number");
      const nextHighlight = nextRow.querySelector(".highlighted-number");

      if (currentHighlight && nextHighlight) {
        // Get the positions relative to the container
        const currentRect = currentHighlight.getBoundingClientRect();
        const nextRect = nextHighlight.getBoundingClientRect();

        // Create a line element
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        // Calculate positions relative to the container
        const x1 =
          currentRect.left + currentRect.width / 2 - containerRect.left;
        const y1 = currentRect.top + currentRect.height / 2 - containerRect.top;
        const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
        const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;

        // Set line attributes
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "rgba(255, 0, 0, 0.7)");
        line.setAttribute("stroke-width", "1.2");
        line.setAttribute("stroke-dasharray", "2,1");
        line.setAttribute("stroke-linecap", "round");

        // Added the line to the SVG
        svg.appendChild(line);
      }
    }

    // Added the SVG to the chart container
    chartContainerRef.current.appendChild(svg);
  };

  // useEffect to handle responsiveness
  useEffect(() => {
    if (activeTab2 === 2 && chartContainerRef.current) {
      // Initial drawing
      setTimeout(() => {
        drawConnectionLines();
      }, 50);

      // Added resize event listener for responsiveness
      const handleResize = () => {
        drawConnectionLines();
      };

      window.addEventListener("resize", handleResize);

      // Clean up
      return () => {
        window.removeEventListener("resize", handleResize);
        const existingSvg = document.querySelector(".chart-connections");
        if (existingSvg) existingSvg.remove();
      };
    }
  }, [activeTab2, currentPageChart]);

  // useEffect to redraw lines when component updates
  useEffect(() => {
    if (activeTab2 === 2 && chartContainerRef.current) {
      drawConnectionLines();
    }
  }, [enhancedGameHistory, activeTab2]);

  const renderChart = (title) => {
    // Filter out duplicate periods and sort by period
    const uniquePeriods = [
      ...new Set(enhancedGameHistory.map((game) => game.period)),
    ];
    const sortedPeriods = uniquePeriods.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""));
      const numB = parseInt(b.replace(/\D/g, ""));
      return numB - numA; // Descending order (most recent first)
    });

    // Get unique games for each period
    const uniqueGames = sortedPeriods.map((period) =>
      enhancedGameHistory.find((game) => game.period === period)
    );

    // Pagination states for chart
    const rowsPerPage = 5;
    const totalPages = Math.ceil(uniqueGames.length / rowsPerPage);
    const startIndex = (currentPageChart - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedGames = uniqueGames.slice(startIndex, endIndex);

    // Calculate statistics based on all games, not just the paginated ones
    const calculateStats = () => {
      const stats = {
        winningNumbers: Array(10).fill(0),
        missing: Array(10).fill(0),
        consecutive: Array(10).fill(0),
      };

      // Count winning numbers
      uniqueGames.forEach((game) => {
        const num = game.number % 10;
        stats.winningNumbers[num]++;
      });

      return stats;
    };

    const stats = calculateStats();

    return (
      <div className="w-full py-4 bg-gradient-to-r from-black via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700">
        <div className="rounded-lg relative">
          <span className="text-sm font-bold text-yellow-300 block mb-4 uppercase tracking-wider text-center">
            {title} - Result Patterns
          </span>

          <div
            className="overflow-x-auto relative chart-container"
            ref={chartContainerRef}
          >
            {/* Period and Number Header */}
            <div className="flex justify-between px-4 mb-3 pb-2 border-b-2 border-gray-600">
              <div className="text-gray-200 font-semibold">Period</div>
              <div className="text-gray-200 font-semibold">Number</div>
            </div>

            {/* Statistics Row */}
            <div className="mb-4 px-3">
              <div className="text-xs text-gray-100 font-medium mb-1 md:mb-3">
                Statistic (last {uniqueGames.length} Periods)
              </div>
              <div className="flex items-center mb-1 md:mb-2">
                <div className="w-24 text-xs text-gray-100 font-medium">
                  Winning number
                </div>
                <div className="flex flex-1 gap-1 ml-2 md:ml-10">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                    const numberInfo = numberColorMapping[num];
                    const bgColor =
                      numberInfo.color === "Red"
                        ? "bg-red-500"
                        : "bg-green-500";
                    const hasViolet = numberInfo.secondColor === "Violet";

                    return (
                      <div
                        key={num}
                        className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-xs 
                            ${bgColor} ${
                          stats.winningNumbers[num] > 0 ? "" : "opacity-60"
                        }
                            ${hasViolet ? "ring-2 ring-violet-500" : ""}
                          `}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Frequency row */}
              <div className="flex items-center mb-1">
                <div className="w-24 text-xs text-gray-100 font-medium">
                  Frequency
                </div>
                <div className="flex flex-1 gap-1 ml-2 md:ml-10">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                    return (
                      <div
                        key={num}
                        className="w-[18px] h-[18px] flex items-center justify-center text-gray-300 text-xs"
                      >
                        {stats.winningNumbers[num]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results for Each Period */}
            <div className="space-y-3">
              {paginatedGames.map((game, index) => {
                const winningNumber = game.number % 10;
                const numberInfo = numberColorMapping[winningNumber];
                const hasViolet = numberInfo.secondColor === "Violet";

                return (
                  <div
                    key={game.period}
                    className="flex items-center px-3 h-10 chart-row"
                  >
                    {/* Period */}
                    <div className="w-32 text-[10px] mr-2 text-gray-100 font-medium">
                      {game.period}
                    </div>

                    {/* Number circles */}
                    <div className="flex flex-1 gap-1">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                        const isWinningNumber = num === winningNumber;
                        const numInfo = numberColorMapping[num];
                        const hasVioletNum = numInfo.secondColor === "Violet";

                        return (
                          <div
                            key={num}
                            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs
                                ${
                                  isWinningNumber
                                    ? "text-white font-bold highlighted-number"
                                    : "text-gray-400 border border-gray-600"
                                } 
                                ${
                                  isWinningNumber && numInfo.color === "Red"
                                    ? "bg-red-500"
                                    : ""
                                }
                                ${
                                  isWinningNumber && numInfo.color === "Green"
                                    ? "bg-green-500"
                                    : ""
                                }
                                ${
                                  isWinningNumber && hasVioletNum
                                    ? "ring-2 ring-violet-500"
                                    : ""
                                }
                                ${!isWinningNumber ? "bg-gray-800" : ""}
                              `}
                          >
                            {num}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {uniqueGames.length === 0 && (
                <div className="p-6 text-center text-gray-300">
                  No data available to display chart for {title}
                </div>
              )}
            </div>
          </div>

          {/* Pagination for chart */}
          <Pagination
            currentPage={currentPageChart}
            totalPages={totalPages}
            onPageChange={setCurrentPageChart}
          />
        </div>
      </div>
    );
  };

  // useEffect to log the current tab and filtered data for debugging
  useEffect(() => {
    console.log(
      `Active tab: ${activeTab}, Game type: ${getTabName(activeTab)}`
    );
    console.log(`Filtered history count: ${filteredGameHistory.length}`);
  }, [activeTab, filteredGameHistory]);

  return (
    <div className="w-full px-2 py-3 bg-gradient-to-r from-gray-900 to-black rounded-2xl">
      {/* Sub-tabs navigation */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg shadow-lg bg-gray-700 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-2 text-sm font-bold tracking-wider transition-all duration-300 ${
                activeTab2 === tab.id
                  ? "btn-gold-ltr shadow-md"
                  : "bg-transparent text-gray-200 hover:text-white"
              } ${tab.id === 1 ? "rounded-l-lg" : ""} ${
                tab.id === tabs.length ? "rounded-r-lg" : ""
              }`}
              onClick={() => handleTabClick2(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="transform transition-all duration-300">
        {activeTab2 === 1 && renderGameTable(getTabName(activeTab))}
        {activeTab2 === 2 && renderChart(getTabName(activeTab))}
        {activeTab2 === 3 && renderMyHistoryTable(getTabName(activeTab))}
      </div>
    </div>
  );
}

export default TabLedger;
