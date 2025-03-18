import React, { useState, useEffect } from "react";
import ball1 from "../../UserPanel/assets/purplered0.png";
import ball2 from "../../UserPanel/assets/green1.png";
import ball3 from "../../UserPanel/assets/red2.png";
import ball4 from "../../UserPanel/assets/green3.png";
import ball5 from "../../UserPanel/assets/red4.png";
import ball6 from "../../UserPanel/assets/greenviolet5.png";
import ball7 from "../../UserPanel/assets/red6.png";
import ball8 from "../../UserPanel/assets/green7.png";
import ball9 from "../../UserPanel/assets/red8.png";
import ball10 from "../../UserPanel/assets/green9.png";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

const LiveGame = () => {
  const statsPaginate = (pageNumber) => setStatsCurrentPage(pageNumber);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Modify the activeTab state initialization to check localStorage first
  const [activeTab, setActiveTab] = useState(() => {
    // Try to get the saved tab from localStorage
    const savedTab = localStorage.getItem("activeGameTab");
    // If it exists, parse it as an integer and return it
    return savedTab ? parseInt(savedTab) : 1;
  });
  const [currentPeriods, setCurrentPeriods] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [gameHistory, setGameHistory] = useState({});
  const [presetWinners, setPresetWinners] = useState({});
  const [futureGames, setFutureGames] = useState({});
  const [previousPeriod, setPreviousPeriod] = useState(null);
  const [betTableData, setBetTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [betSummary, setBetSummary] = useState({
    numbers: {},
    colors: {},
    bigSmall: {},
  });
  const [summaryCurrentPage, setSummaryCurrentPage] = useState(1);
  const [summaryItemsPerPage, setSummaryItemsPerPage] = useState(3);

  const summaryPaginate = (pageNumber) => setSummaryCurrentPage(pageNumber);

  const getUserInfo = () => {
    const userToken = localStorage.getItem("userToken");
    console.log("user data>>>>>",userToken)
    if (userToken) {
      const userData = JSON.parse(userToken);
      return userData.users;
    }
    return null;
  };

  

  // Define tabs to match user panel
  const tabs = [
    { id: 1, label: "M Pride 30 sec", minutes: 0, seconds: 30 },
    { id: 2, label: "M Pride 1 Min", minutes: 1, seconds: 0 },
    { id: 3, label: "M Pride 3 Min", minutes: 3, seconds: 0 },
    { id: 4, label: "M Pride 5 Min", minutes: 5, seconds: 0 },
  ];

  // Ball images mapping for displaying numbers
  const numberToBallImage = {
    0: ball1, // Purple/Red (0)
    1: ball2, // Green (1)
    2: ball3, // Red (2)
    3: ball4, // Green (3)
    4: ball5, // Red (4)
    5: ball6, // Green/Violet (5)
    6: ball7, // Red (6)
    7: ball8, // Green (7)
    8: ball9, // Red (8)
    9: ball10, // Green (9)
  };

  // Add this function to filter out any invalid or duplicate periods
  const getUniqueValidPeriods = (history) => {
    if (!history || !Array.isArray(history)) return [];

    // Use a Set to track unique period IDs
    const uniquePeriods = new Set();

    // Filter the history to only include valid entries with unique periods
    return history.filter((entry) => {
      // Check if entry is valid and has a period
      if (!entry || !entry.period) return false;

      // If we've seen this period before, exclude it
      if (uniquePeriods.has(entry.period)) return false;

      // Otherwise, add to our set and include it
      uniquePeriods.add(entry.period);
      return true;
    });
  };

  const [statsCurrentPage, setStatsCurrentPage] = useState(1);
  const statsItemsPerPage = 8;

  const validGameHistory = getUniqueValidPeriods(gameHistory[activeTab] || []);

  const statsIndexOfLastItem = statsCurrentPage * statsItemsPerPage;
  const statsIndexOfFirstItem = statsIndexOfLastItem - statsItemsPerPage;
  const statsCurrentItems = validGameHistory.slice(
    statsIndexOfFirstItem,
    statsIndexOfLastItem
  );

  useEffect(() => {
    const fetchBetData = () => {
      const bets = JSON.parse(
        localStorage.getItem(`pendingBets_tab${activeTab}`) || "[]"
      );

      // Get user information
      const userInfo = getUserInfo();

      // More detailed extraction of bet data to match ColorGame structure
      const betTableData = bets.map((bet) => {
        // Handle color names properly
        let betOption;
        if (
          bet.modalContent.index !== null &&
          bet.modalContent.index !== undefined
        ) {
          betOption = `Number ${bet.modalContent.index}`;
        } else {
          // Convert color codes to color names
          betOption = bet.modalContent.colors
            .map((c) => {
              if (c === "#e8373e") return "Red";
              if (c === "#5cce90") return "Green";
              if (c === "#b35af6") return "Violet";
              return c; // For Big/Small or if already a string name
            })
            .join(", ");
        }

        return {
          number: betOption,
          amount: `₹${bet.amount}`,
          user: userInfo ? userInfo.phone || userInfo.email : "Unknown", //  user's phone or email
        };
      });

      setBetTableData(betTableData);

      // Generate bet summary data
      const summary = {
        numbers: {},
        colors: {},
        bigSmall: {},
      };

      betTableData.forEach((bet) => {
        const amountValue = parseInt(bet.amount.replace("₹", ""));

        // Handle number bets
        if (bet.number.startsWith("Number")) {
          const num = bet.number.split(" ")[1];
          if (!summary.numbers[num]) {
            summary.numbers[num] = 0;
          }
          summary.numbers[num] += amountValue;
        }
        // Handle color bets
        else if (
          ["Red", "Green", "Violet", "Red, Violet", "Green, Violet"].includes(
            bet.number
          )
        ) {
          if (!summary.colors[bet.number]) {
            summary.colors[bet.number] = 0;
          }
          summary.colors[bet.number] += amountValue;
        }
        // Handle Big/Small bets
        else if (["Big", "Small"].includes(bet.number)) {
          if (!summary.bigSmall[bet.number]) {
            summary.bigSmall[bet.number] = 0;
          }
          summary.bigSmall[bet.number] += amountValue;
        }
      });

      setBetSummary(summary);

      // Reset to page 1 if there's no data or if current page exceeds total pages
      const totalPages = Math.max(
        1,
        Math.ceil(betTableData.length / itemsPerPage)
      );
      if (betTableData.length === 0 || currentPage > totalPages) {
        setCurrentPage(1);
      }
    };

    fetchBetData();

    // Set up an interval to refresh bet data periodically
    const intervalId = setInterval(fetchBetData, 2000);

    return () => clearInterval(intervalId);
  }, [activeTab]);

  // Load current periods and time remaining from localStorage
  useEffect(() => {
    const loadPeriodsAndTime = () => {
      const periods = {};
      const times = {};
      const history = {};
      const winners = JSON.parse(
        localStorage.getItem("adminPresetWinners") || "{}"
      );
      const future = {};

      tabs.forEach((tab) => {
        // Get current period from localStorage
        const currentPeriod = localStorage.getItem(`dateNumber_${tab.id}`);
        if (currentPeriod) {
          periods[tab.id] = currentPeriod;

          // Check if this period has a preset winner and is now the current period
          // If so, delete it from the presetWinners object
          if (winners[currentPeriod] !== undefined) {
            delete winners[currentPeriod];
            localStorage.setItem("adminPresetWinners", JSON.stringify(winners));
          }
        }

        // Get time remaining calculation
        const endTimeString = localStorage.getItem(`endTime_tab${tab.id}`);
        if (endTimeString) {
          const endTime = parseInt(endTimeString);
          const now = new Date().getTime();
          const remaining = Math.max(0, endTime - now);
          times[tab.id] = remaining;
        }

        // Load game history for this tab
        let tabHistory = JSON.parse(
          localStorage.getItem(`gameHistory_tab${tab.id}`) || "[]"
        );

        tabHistory = getUniqueValidPeriods(tabHistory);

        history[tab.id] = tabHistory;

        // Save the filtered history back to storage
        localStorage.setItem(
          `gameHistory_tab${tab.id}`,
          JSON.stringify(tabHistory)
        );

        // Calculate future game periods
        if (currentPeriod && endTimeString) {
          future[tab.id] = calculateFutureGames(
            tab,
            currentPeriod,
            endTimeString
          );
        }
      });

      setCurrentPeriods(periods);
      setTimeRemaining(times);
      setGameHistory(history);
      setPresetWinners(winners);
      setFutureGames(future);
    };

    // Calculate future game periods based on current period and time
    const calculateFutureGames = (tab, currentPeriod, endTimeString) => {
      if (!currentPeriod || !endTimeString) return [];

      const endTime = parseInt(endTimeString);
      const now = new Date().getTime();
      const futureGames = [];

      // Add current period as first item
      futureGames.push({
        period: currentPeriod,
        isCurrent: true,
        timeRemaining: Math.max(0, endTime - now),
      });

      // Calculate next 5 future periods
      let nextEndTime = endTime;
      let nextPeriod = currentPeriod;

      for (let i = 0; i < 5; i++) {
        const interval = (tab.minutes * 60 + tab.seconds) * 1000;
        nextEndTime += interval;
        // Generate next period by adding the exact interval in seconds
        nextPeriod = generateNextPeriod(nextPeriod, tab);

        futureGames.push({
          period: nextPeriod,
          isCurrent: false,
          timeRemaining: nextEndTime - now,
        });
      }

      return futureGames;
    };

    // Generate next period ID based on current one
    const generateNextPeriod = (currentPeriod, tab) => {
      if (!currentPeriod) return null;

      // Extracting time components from current period ID (format: YYYYMMDDHHmmss)
      const year = parseInt(currentPeriod.substring(0, 4));
      const month = parseInt(currentPeriod.substring(4, 6)) - 1; // Months are 0-indexed
      const day = parseInt(currentPeriod.substring(6, 8));
      const hour = parseInt(currentPeriod.substring(8, 10));
      const minute = parseInt(currentPeriod.substring(10, 12));
      const second = parseInt(currentPeriod.substring(12, 14));

      // Create date object with exact time
      const date = new Date(year, month, day, hour, minute, second);

      // Add the exact interval based on the tab + 1 (fix for correct period numbering)
      const intervalSeconds = tab.minutes * 60 + tab.seconds;
      date.setSeconds(date.getSeconds() + intervalSeconds + 1); // Added +1 here to fix the period issue

      // Format back to period ID with proper padding
      const nextYear = date.getFullYear();
      const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
      const nextDay = String(date.getDate()).padStart(2, "0");
      const nextHour = String(date.getHours()).padStart(2, "0");
      const nextMinute = String(date.getMinutes()).padStart(2, "0");
      const nextSecond = String(date.getSeconds()).padStart(2, "0");

      return `${nextYear}${nextMonth}${nextDay}${nextHour}${nextMinute}${nextSecond}`;
    };

    // Load initial data
    loadPeriodsAndTime();

    // Set up interval to refresh data every second
    const intervalId = setInterval(loadPeriodsAndTime, 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Create a separate useEffect for timer updates
  useEffect(() => {
    const updateTimer = () => {
      // For each tab, get the endTime from localStorage that ColorGame is using
      const newTimes = {};

      tabs.forEach((tab) => {
        const endTimeString = localStorage.getItem(`endTime_tab${tab.id}`);
        if (endTimeString) {
          const endTime = parseInt(endTimeString);
          const now = new Date().getTime();
          const remaining = Math.max(0, endTime - now);
          newTimes[tab.id] = remaining;
        } else {
          // If endTime doesn't exist yet, calculate from timer_tabId
          const savedTime = JSON.parse(localStorage.getItem(`timer_${tab.id}`));
          if (savedTime) {
            const totalMs = (savedTime.minutes * 60 + savedTime.seconds) * 1000;
            newTimes[tab.id] = totalMs;
          } else {
            // Default fallback - use the tab's configured time
            const tabConfig = tabs.find((t) => t.id === tab.id);
            if (tabConfig) {
              const totalMs =
                (tabConfig.minutes * 60 + tabConfig.seconds) * 1000;
              newTimes[tab.id] = totalMs;
            }
          }
        }
      });

      setTimeRemaining(newTimes);
    };

    // Update timer right away
    updateTimer();

    // Use a shorter interval for smoother timer updates
    const timerInterval = setInterval(updateTimer, 100);

    return () => clearInterval(timerInterval);
  }, []);

  // Check for period change and reset selection if needed
  useEffect(() => {
    const currentPeriod = currentPeriods[activeTab];

    if (previousPeriod && previousPeriod !== currentPeriod) {
      if (previousPeriod) {
        // Check if there was a preset number for the previous period
        const presetNumber = presetWinners[previousPeriod];

        // If there was a preset number, just update the presetWinners state
        if (presetNumber !== undefined) {
          // Remove this period from presetWinners after it's been processed
          const updatedWinners = { ...presetWinners };
          delete updatedWinners[previousPeriod];
          setPresetWinners(updatedWinners);
          localStorage.setItem(
            "adminPresetWinners",
            JSON.stringify(updatedWinners)
          );
        }
      }

      setSelectedNumber(null);

      // If the selected period was the previous current period, update to new current period
      if (selectedPeriod === previousPeriod) {
        setSelectedPeriod(currentPeriod);
      }
    }

    // Update previousPeriod for next comparison
    if (currentPeriod) {
      setPreviousPeriod(currentPeriod);
    }
  }, [
    currentPeriods,
    activeTab,
    previousPeriod,
    selectedPeriod,
    presetWinners,
  ]);

  // Add a new useEffect to save activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeGameTab", activeTab.toString());
  }, [activeTab]);

  // Handle tab change
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSelectedPeriod(null);
    setSelectedNumber(null);
  };

  // Improved period selection handler with better UX
  const handlePeriodChange = (e) => {
    const value = e.target.value;

    // If the value is empty, do nothing
    if (!value) return;

    // Set the selected period
    setSelectedPeriod(value);

    // Clear any previously selected number
    setSelectedNumber(null);

    // Focus away from dropdown to improve UX
    e.target.blur();
  };

  // Handle number selection
  const handleNumberSelect = (number) => {
    if (!selectedPeriod) {
      alert("Please select a period first");
      return;
    }

    setSelectedNumber(number);

    // Store selected number for this period in localStorage
    const winners = { ...presetWinners }; // Create a new object to avoid direct state mutation
    winners[selectedPeriod] = number;
    localStorage.setItem("adminPresetWinners", JSON.stringify(winners));
    setPresetWinners(winners);
  };

  // Format time remaining as MM:SS
  const formatTimeRemaining = (ms) => {
    if (!ms && ms !== 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Determine color of a number
  const getBallColor = (number) => {
    if (number === 0) return "Violet/Red";
    if (number === 5) return "Violet/Green";
    if (number % 2 === 1) return "Green";
    return "Red";
  };

  // Determine if a number is Big or Small
  const getBallSize = (number) => {
    return number >= 5 ? "Big" : "Small";
  };

  // Render color indicator with proper styling
  const renderColorIndicator = (color) => {
    const colors = {
      Red: "bg-red-500",
      Green: "bg-green-500",
      "Violet/Red": "bg-gradient-to-r from-violet-500 to-red-500",
      "Violet/Green": "bg-gradient-to-r from-violet-500 to-green-500",
    };

    const bgClass = colors[color] || "bg-gray-500";

    return <div className={`w-4 h-4 rounded-full ${bgClass}`}></div>;
  };

  // Check if a game was preset (for history display)
  const checkIfGameWasPreset = (period) => {
    // First check if the game history has the wasPreset flag
    const gameHistoryItem = (gameHistory[activeTab] || []).find(
      (game) => game.period === period
    );

    return gameHistoryItem && gameHistoryItem.wasPreset;
  };

  const saveGameResult = (period, number) => {
    // Check if this period had a preset winner
    const wasPreset = presetWinners[period] !== undefined;

    const gameResult = {
      period,
      number,
      color: getBallColor(number),
      bigSmall: getBallSize(number),
      timestamp: new Date().toLocaleString(),
      wasPreset: wasPreset, // Add this flag to track if it was preset
    };

    // Add to history
    const history = JSON.parse(
      localStorage.getItem(`gameHistory_tab${activeTab}`) || "[]"
    );
    history.unshift(gameResult);
    localStorage.setItem(
      `gameHistory_tab${activeTab}`,
      JSON.stringify(history)
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = betTableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to render color indicators
  const renderBetColorIndicator = (colorString) => {
    if (colorString === "Red") {
      return <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>;
    } else if (colorString === "Green") {
      return <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>;
    } else if (colorString === "Violet") {
      return <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>;
    } else if (colorString === "Red, Violet") {
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-purple-500 mr-2"></div>
      );
    } else if (colorString === "Green, Violet") {
      return (
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-purple-500 mr-2"></div>
      );
    } else if (colorString === "Big") {
      return <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>;
    } else if (colorString === "Small") {
      return <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>;
    }
    return <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>;
  };

  const processSummaryForPagination = () => {
    const allSummaryItems = [
      ...Object.entries(betSummary.numbers).map(([num, amount]) => ({
        type: "number",
        value: num,
        display: `Number ${num}`,
        amount,
      })),
      ...Object.entries(betSummary.colors).map(([color, amount]) => ({
        type: "color",
        value: color,
        display: color,
        amount,
      })),
      ...Object.entries(betSummary.bigSmall).map(([size, amount]) => ({
        type: "size",
        value: size,
        display: size,
        amount,
      })),
    ];

    const summaryIndexOfLastItem = summaryCurrentPage * summaryItemsPerPage;
    const summaryIndexOfFirstItem =
      summaryIndexOfLastItem - summaryItemsPerPage;
    return {
      items: allSummaryItems.slice(
        summaryIndexOfFirstItem,
        summaryIndexOfLastItem
      ),
      totalItems: allSummaryItems.length,
    };
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
              Live Game Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
              Monitor and manage current and upcoming game periods. Optionally
              select winning numbers for specific periods.
            </p>

            {/* Tabs */}
            <div className="mb-6">
              <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <li key={tab.id} className="mr-2">
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className={`inline-block p-4 rounded-t-lg ${
                        activeTab === tab.id
                          ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border-b-2 border-blue-600 dark:border-blue-500"
                          : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Game Info Panel */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-3 md:px-6 py-6 mb-6">
              <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Current Game Status -{" "}
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <div className="flex  items-center">
                  <div className="flex items-center mr-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                      Current Period:
                    </span>
                    <span className="text-[13px] sm:text-sm font-bold text-gray-900 dark:text-white">
                      {currentPeriods[activeTab] || "Loading..."}
                    </span>
                  </div>
                  {/* <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                      Time Remaining:
                    </span>
                    <span className="text-sm font-bold text-red-600 dark:text-red-400">
                    {formatTimeRemaining(timeRemaining[activeTab])}
                    </span>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-row gap-3 sm:gap-0 justify-between">
                {/* Recent Game Results */}
                <div className="mb-6">
                  <h3 className="text-xs sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recent Results
                  </h3>
                  <div className="flex space-x-1 sm:space-x-3">
                    {(gameHistory[activeTab] || [])
                      .slice(0, 5)
                      .map((game, idx) => (
                        <div key={idx} className="text-center">
                          <img
                            src={numberToBallImage[game.number]}
                            className="w-5 sm:w-12 h-5 sm:h-12"
                            alt={`Ball ${game.number}`}
                          />
                          <div className="text-xs mt-1 font-medium text-gray-600 dark:text-gray-400">
                            {game.number}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Period Selection Dropdown */}
                <div className="mb-6">
                  <label
                    htmlFor="period-select"
                    className="block mb-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    Select Period to Manage
                  </label>
                  <div className="flex space-x-3">
                    <select
                      id="period-select"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 sm:py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={selectedPeriod || ""}
                      onChange={handlePeriodChange}
                    >
                      <option value="">Choose a period</option>
                      {(futureGames[activeTab] || []).map((game, idx) => (
                        <option key={idx} value={game.period}>
                          {game.period} {game.isCurrent ? "(Current)" : ""}
                        </option>
                      ))}
                    </select>

                    {selectedPeriod &&
                      presetWinners[selectedPeriod] !== undefined && (
                        <div className="flex items-center justify-between w-[12rem] px-1 py-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-300 ">
                            Preset Winner:
                          </span>
                          <div className="flex items-center">
                            <img
                              src={
                                numberToBallImage[presetWinners[selectedPeriod]]
                              }
                              className="w-6 h-6"
                              alt={`Ball ${presetWinners[selectedPeriod]}`}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {/* Number Selection Grid */}
                <div className="mb-4">
                  <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Winning Number
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                      <div
                        key={number}
                        className={`relative cursor-pointer overflow-hidden rounded-lg transform transition-all duration-200 ${
                          selectedNumber === number
                            ? "scale-110 ring-4 ring-blue-500 shadow-lg"
                            : "hover:scale-105 hover:shadow-md"
                        }`}
                        onClick={() => handleNumberSelect(number)}
                      >
                        <div className="relative">
                          <img
                            src={numberToBallImage[number]}
                            alt={`ball-${number}`}
                            className={`w-full h-auto ${
                              selectedNumber === number
                                ? "filter brightness-110"
                                : ""
                            }`}
                          />
                          {selectedNumber === number && (
                            <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse"></div>
                          )}
                        </div>
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${
                            selectedNumber === number
                              ? "from-blue-500"
                              : "from-black"
                          } to-transparent p-2`}
                        >
                          <div className="text-center text-white text-xs font-medium">
                            {number} - {getBallColor(number)}
                          </div>
                        </div>
                        {selectedNumber === number && (
                          <div className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-bl-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color and Size Legend */}

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg  sm:px-4 mb-6">
                  <h2 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Bet Table
                  </h2>
                  <div className="overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-nowrap">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-2">
                            Number/Color
                          </th>
                          <th scope="col" className="px-6 py-2">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-2">
                            User
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((item, idx) => (
                            <tr
                              key={idx}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <td className="px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                <div className="flex items-center">
                                  {item.number.startsWith("Number") ? (
                                    <img
                                      src={
                                        numberToBallImage[
                                          item.number.split(" ")[1]
                                        ]
                                      }
                                      className="w-6 h-6 mr-2"
                                      alt={`Ball ${item.number.split(" ")[1]}`}
                                    />
                                  ) : (
                                    renderBetColorIndicator(item.number)
                                  )}
                                  {item.number}
                                </div>
                              </td>
                              <td className="px-6 py-2">{item.amount}</td>
                              <td className="px-6 py-2">{item.user}</td>
                            </tr>
                          ))
                        ) : (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td
                              colSpan="2"
                              className="px-6 py-4 text-center font-medium text-gray-500 dark:text-gray-400"
                            >
                              No bets available for this game
                            </td>
                          </tr>
                        )}
                        {/* Added empty rows to maintain consistent height only when there are items */}
                        {currentItems.length > 0 &&
                          currentItems.length < itemsPerPage &&
                          Array(itemsPerPage - currentItems.length)
                            .fill()
                            .map((_, idx) => (
                              <tr
                                key={`empty-${idx}`}
                                className="bg-white dark:bg-gray-800 h-10"
                              >
                                <td colSpan="2"></td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Fixed-height container for pagination */}
                  <div className="flex justify-between items-center mt-4 h-10">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1 || betTableData.length === 0}
                      className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                      Page {betTableData.length === 0 ? 1 : currentPage} of{" "}
                      {Math.max(
                        1,
                        Math.ceil(betTableData.length / itemsPerPage)
                      )}
                    </span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage >=
                          Math.max(
                            1,
                            Math.ceil(betTableData.length / itemsPerPage)
                          ) || betTableData.length === 0
                      }
                      className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Bet Summary Table */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg sm:px-4 mb-6">
                  <h2 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Bet Summary
                  </h2>
                  <div className="overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-nowrap">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-2">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-2">
                            Total Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="min-h-[100px]">
                        {" "}
                        {/* Set a minimum height for the table body */}
                        {(() => {
                          const { items, totalItems } =
                            processSummaryForPagination();

                          if (items.length > 0) {
                            const rows = items.map((item, idx) => (
                              <tr
                                key={`summary-${idx}`}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                              >
                                <td className="px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                  <div className="flex items-center">
                                    {item.type === "number" ? (
                                      <img
                                        src={numberToBallImage[item.value]}
                                        className="w-6 h-6 mr-2"
                                        alt={`Ball ${item.value}`}
                                      />
                                    ) : (
                                      renderBetColorIndicator(item.value)
                                    )}
                                    {item.display}
                                  </div>
                                </td>
                                <td className="px-6 py-2">₹{item.amount}</td>
                              </tr>
                            ));

                            // Add empty rows to maintain consistent height only when there are items
                            if (items.length < summaryItemsPerPage) {
                              const emptyRows = Array(
                                summaryItemsPerPage - items.length
                              )
                                .fill()
                                .map((_, idx) => (
                                  <tr
                                    key={`empty-summary-${idx}`}
                                    className="bg-white dark:bg-gray-800 h-10"
                                  >
                                    <td colSpan="2"></td>
                                  </tr>
                                ));
                              return [...rows, ...emptyRows];
                            }

                            return rows;
                          } else {
                            // When no items, just show the message without empty rows
                            return (
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td
                                  colSpan="2"
                                  className="px-6 py-4 text-center font-medium text-gray-500 dark:text-gray-400"
                                >
                                  No bets summary available
                                </td>
                              </tr>
                            );
                          }
                        })()}
                      </tbody>
                    </table>
                  </div>
                  {/* Fixed-height container for pagination */}
                  <div className="flex justify-between items-center mt-4 h-10">
                    {(() => {
                      const { totalItems } = processSummaryForPagination();
                      const totalPages = Math.max(
                        1,
                        Math.ceil(totalItems / summaryItemsPerPage)
                      );

                      return (
                        <>
                          <button
                            onClick={() =>
                              summaryPaginate(summaryCurrentPage - 1)
                            }
                            disabled={
                              summaryCurrentPage === 1 || totalItems === 0
                            }
                            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
                          >
                            Previous
                          </button>
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            Page {totalItems === 0 ? 1 : summaryCurrentPage} of{" "}
                            {totalPages}
                          </span>
                          <button
                            onClick={() =>
                              summaryPaginate(summaryCurrentPage + 1)
                            }
                            disabled={
                              summaryCurrentPage >= totalPages ||
                              totalItems === 0
                            }
                            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
                          >
                            Next
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Game Stats and History */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-3 sm:px-6 py-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
                Game Statistics
              </h2>
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-nowrap">
                  <thead className="text-xs text-gray-700 sm:uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                        Period
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                        Number
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                        Color
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                        Size
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {statsCurrentItems.map((game, idx) => (
                      <tr
                        key={idx}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {game.period}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-3">
                          <div className="flex items-center">
                            <img
                              src={numberToBallImage[game.number]}
                              className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
                              alt={`Ball ${game.number}`}
                            />
                            {game.number}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-3">
                          <div className="flex items-center">
                            {renderColorIndicator(game.color)}
                            <span className="ml-2">{game.color}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-3">
                          {game.bigSmall}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">
                          {game.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => statsPaginate(statsCurrentPage - 1)}
                  disabled={statsCurrentPage === 1}
                  className="px-3 sm:px-4 py-1 sm:py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  Page {statsCurrentPage} of{" "}
                  {Math.ceil(validGameHistory.length / statsItemsPerPage)}
                </span>
                <button
                  onClick={() => statsPaginate(statsCurrentPage + 1)}
                  disabled={
                    statsCurrentPage ===
                    Math.ceil(
                      (gameHistory[activeTab] || []).length / statsItemsPerPage
                    )
                  }
                  className="px-3 sm:px-4 py-1 sm:py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveGame;
