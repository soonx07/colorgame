import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Calendar, Clock, Trophy, X, ArrowDown, ChevronDown } from "lucide-react";
import ball1 from "../assets/purplered0.png";
import ball2 from "../assets/green1.png";
import ball3 from "../assets/red2.png";
import ball4 from "../assets/green3.png";
import ball5 from "../assets/red4.png";
import ball6 from "../assets/greenviolet5.png";
import ball7 from "../assets/red6.png";
import ball8 from "../assets/green7.png";
import ball9 from "../assets/red8.png";
import ball10 from "../assets/green9.png";
import "../assets/UserPanelStyles/userPanelStyle.css";

function Activity() {
  const [activityLogs, setActivityLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    // Load activity logs from localStorage
    loadActivityLogs();
    
    // Set up event listener for storage changes
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Format date consistently as DD/MM/YYYY
  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  // Format time consistently as HH:MM
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return "Invalid Time";
      }
      
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error("Time formatting error:", error);
      return "Invalid Time";
    }
  };

  // Handle changes in localStorage from other components
  const handleStorageChange = (e) => {
    if (e.key === "activityLogs" || 
        e.key === "walletBalance" || 
        e.key?.startsWith("gameHistory") || 
        e.key?.startsWith("pendingBets")) {
      loadActivityLogs();
    }
  };

  // Process game history logs from all tabs
  const processGameHistoryLogs = () => {
    const logs = [];
  
    // Process logs from each tab (1-4)
    for (let tabId = 1; tabId <= 4; tabId++) {
      const tabHistory = JSON.parse(localStorage.getItem(`gameHistory_tab${tabId}`) || "[]");
      
      // Convert each game result to an activity log
      tabHistory.forEach(game => {
        const tabName = getTabName(tabId);
        const isWin = game.isWin;
        
        // Ensure timestamp is a valid number
        const timestamp = new Date(game.timestamp).getTime();
        
        // Create activity log for game result
        logs.push({
          id: `game-${game.period}-${tabId}`,
          type: isWin ? "win" : "lose",
          timestamp: isNaN(timestamp) ? Date.now() : timestamp,
          message: isWin 
            ? `Won ${game.payout.toFixed(2)} Rs on ${tabName}`
            : `Lost bet on ${tabName}`,
          details: {
            period: game.period,
            tabId: tabId,
            number: game.number,
            color: game.color,
            bigSmall: game.bigSmall,
            betAmount: game.betAmount,
            payout: game.payout,
            selectedOption: game.selectedOption
          }
        });
      });
    }
    
    return logs;
  };

  // Get tab name based on tab ID
  const getTabName = (tabId) => {
    const tabs = {
      1: "M Pride 30 sec",
      2: "M Pride 1 Min",
      3: "M Pride 3 Min",
      4: "M Pride 5 Min"
    };
    return tabs[tabId] || `Tab ${tabId}`;
  };

  // Process wallet transactions
  const processWalletLogs = () => {
    const walletLogs = JSON.parse(localStorage.getItem("walletTransactions") || "[]");
    
    return walletLogs.map(transaction => {
      // Ensure timestamp is a valid number
      const timestamp = new Date(transaction.timestamp).getTime();
      
      return {
        id: `wallet-${transaction.id || Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: transaction.type,
        timestamp: isNaN(timestamp) ? Date.now() : timestamp,
        message: `${transaction.type === "deposit" ? "Deposited" : "Withdrew"} ${transaction.amount} Rs`,
        details: {
          amount: transaction.amount,
          balance: transaction.balance,
          method: transaction.method || "N/A"
        }
      };
    });
  };

  // Track login/logout events
  const processAuthLogs = () => {
    const authLogs = JSON.parse(localStorage.getItem("authActivity") || "[]");
    
    // If no login is recorded but wallet has a balance, add a default login
    if (authLogs.length === 0 && localStorage.getItem("walletBalance")) {
      const defaultLogin = {
        type: "login",
        timestamp: Date.now() - 86400000, // 1 day ago
        message: "User logged in",
        details: { method: "auto" }
      };
      
      return [defaultLogin];
    }
    
    return authLogs;
  };

  // Load and combine all activity logs
  const loadActivityLogs = () => {
    try {
      // Load existing logs
      let storedLogs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
      
      // Process game history
      const gameLogs = processGameHistoryLogs();
      
      // Process wallet transactions
      const walletLogs = processWalletLogs();
      
      // Process auth events
      const authLogs = processAuthLogs();
      
      // Combine all logs
      const allLogs = [...storedLogs, ...gameLogs, ...walletLogs, ...authLogs];
      
      // Remove duplicates by ID
      const uniqueLogs = Array.from(
        new Map(allLogs.map(log => [log.id, log])).values()
      );
      
      // Sort by timestamp (newest first)
      uniqueLogs.sort((a, b) => b.timestamp - a.timestamp);
      
      // Update state
      setActivityLogs(uniqueLogs);
      setFilteredLogs(uniqueLogs);
      
      // Save back to localStorage
      localStorage.setItem("activityLogs", JSON.stringify(uniqueLogs));
    } catch (error) {
      console.error("Error loading activity logs:", error);
      setActivityLogs([]);
      setFilteredLogs([]);
    }
  };

  // Filter logs by type
  const filterLogs = (type) => {
    setActiveFilter(type);
    
    if (type === "all") {
      setFilteredLogs(activityLogs);
    } else {
      setFilteredLogs(activityLogs.filter(log => log.type === type));
    }
  };

  // Group logs by date for better organization
  const groupLogsByDate = () => {
    const groups = {};
    
    filteredLogs.forEach(log => {
      // Use consistent date format DD/MM/YYYY
      const date = formatDate(log.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
    });
    
    return groups;
  };

  // Toggle group expansion
  const toggleGroup = (date) => {
    setExpandedGroups(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  // Get color class based on log type
  const getColorClass = (type) => {
    switch(type) {
      case "win": return "bg-gradient-to-r from-green-400 to-green-600";
      case "lose": return "bg-gradient-to-r from-red-400 to-red-600";
      case "login": return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "logout": return "bg-gradient-to-r from-gray-400 to-gray-600";
      case "deposit": return "bg-gradient-to-r from-purple-400 to-purple-600";
      case "withdraw": return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      default: return "bg-gradient-to-r from-gray-500 to-gray-700";
    }
  };

  // Get icon based on log type
  const getLogIcon = (type) => {
    switch(type) {
      case "win": return <Trophy className="h-5 w-5" />;
      case "lose": return <X className="h-5 w-5" />;
      case "login": return <ArrowDown className="h-5 w-5" />;
      case "logout": return <ArrowDown className="h-5 w-5 transform rotate-180" />;
      case "deposit": return <ArrowDown className="h-5 w-5" />;
      case "withdraw": return <ArrowDown className="h-5 w-5 transform rotate-180" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  // Get ball image based on number
  const getBallImage = (number) => {
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
    return numberToBallImage[number];
  };

  const logGroups = groupLogsByDate();

  return (
    <div className="max-w-md mx-auto bg-[#1e2530] min-h-screen pb-14">
      <Navbar link="/user/game" />
      
      <div className="mx-2 mt-2">
        {/* Header */}
        <div className="gradient-top-btm rounded-xl p-4 mb-4 shadow">
          <h1 className="text-xl font-bold text-center text-[#8f5106ea]">Activity Center</h1>
          <p className="text-center text-[#8f5106ea] text-sm">
            Track your game history and account activity
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-3 mb-4 shadow">
          <div 
            className="flex justify-between items-center" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="text-white font-medium">Filter Activities</span>
            <ChevronDown className={`w-5 h-5 text-white transition-transform ${showFilters ? 'transform rotate-180' : ''}`}/>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button 
                className={`p-2 rounded-lg text-sm font-medium ${activeFilter === 'all' ? 'gradient-btm-top text-[#8f5106ea]' : 'bg-gray-700 text-white'}`}
                onClick={() => filterLogs('all')}
              >
                All
              </button>
              <button 
                className={`p-2 rounded-lg text-sm font-medium ${activeFilter === 'win' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gray-700 text-white'}`}
                onClick={() => filterLogs('win')}
              >
                Wins
              </button>
              <button 
                className={`p-2 rounded-lg text-sm font-medium ${activeFilter === 'lose' ? 'bg-gradient-to-r from-red-400 to-red-600 text-white' : 'bg-gray-700 text-white'}`}
                onClick={() => filterLogs('lose')}
              >
                Losses
              </button>
              <button 
                className={`p-2 rounded-lg text-sm font-medium ${activeFilter === 'deposit' ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white' : 'bg-gray-700 text-white'}`}
                onClick={() => filterLogs('deposit')}
              >
                Deposits
              </button>
              <button 
                className={`p-2 rounded-lg text-sm font-medium ${activeFilter === 'withdraw' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' : 'bg-gray-700 text-white'}`}
                onClick={() => filterLogs('withdraw')}
              >
                Withdrawals
              </button>
              <button 
                className={`p-2 rounded-lg text-sm font-medium ${activeFilter === 'login' || activeFilter === 'logout' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' : 'bg-gray-700 text-white'}`}
                onClick={() => filterLogs('login')}
              >
                Login/Logout
              </button>
            </div>
          )}
        </div>

        {/* Activity Logs */}
        <div className="space-y-4 mb-16">
          {Object.keys(logGroups).length > 0 ? (
            Object.entries(logGroups).map(([date, logs]) => (
              <div key={date} className="bg-gray-800 rounded-xl overflow-hidden shadow">
                <div 
                  className="gradient-top-left p-3 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleGroup(date)}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-[#8f5106ea]" />
                    <span className="font-medium text-[#8f5106ea]">{date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#8f5106ea]">{logs.length} activities</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-[#8f5106ea] transition-transform ${expandedGroups[date] ? 'transform rotate-180' : ''}`} 
                    />
                  </div>
                </div>
                
                {expandedGroups[date] && (
                  <div className="divide-y divide-gray-700">
                    {logs.map((log) => (
                      <div key={log.id} className="p-3 hover:bg-gray-700">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-xl ${getColorClass(log.type)} flex-shrink-0`}>
                            {getLogIcon(log.type)}
                          </div>
                          <div className="ml-3 flex-grow">
                            <div className="flex justify-between">
                              <p className="font-medium text-white">{log.message}</p>
                              <p className="text-xs text-gray-400">
                                {formatTime(log.timestamp)}
                              </p>
                            </div>
                            {/* Additional details based on log type */}
                            {(log.type === 'win' || log.type === 'lose') && log.details && (
                              <div className="mt-2 bg-gray-900 p-2 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {log.details.number !== undefined && (
                                      <img 
                                        src={getBallImage(log.details.number)} 
                                        alt={`Ball ${log.details.number}`} 
                                        className="w-6 h-6 mr-2"
                                      />
                                    )}
                                    <span className="text-sm">
                                      Period: {log.details.period} - {getTabName(log.details.tabId)}
                                    </span>
                                  </div>
                                  <span className={`text-sm ${log.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                                    {log.type === 'win' ? '+' : '-'}{log.details.betAmount} Rs
                                  </span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  Bet on: {log.details.selectedOption}
                                </div>
                              </div>
                            )}

                            {/* Deposit/Withdraw details */}
                            {(log.type === 'deposit' || log.type === 'withdraw') && log.details && (
                              <div className="mt-1 text-sm text-gray-400">
                                <div>Method: {log.details.method}</div>
                                <div>New Balance: {log.details.balance} Rs</div>
                              </div>
                            )}

                            {/* Login/Logout details */}
                            {(log.type === 'login' || log.type === 'logout') && log.details && (
                              <div className="mt-1 text-sm text-gray-400">
                                <div>Method: {log.details.method}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-gray-400">No activity found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Activity;