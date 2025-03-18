import { useState, useEffect } from "react";
import Modal from "../component/dashboard/Modal";
import timeicon from "../assets/time.png";
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
import Wallet from "../component/dashboard/Wallet";
import Notification from "../component/dashboard/Notification";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import CountdownModal from "../component/dashboard/CountdownModal";
import CountdownTimer from "../component/dashboard/CountdownTimer";
import TabLedger from "../component/dashboard/TabLedger";
import loseSoundPath from "../assets/loseSound.m4a";
import winSoundPath from "../assets/winSound.m4a";
import { X } from "lucide-react";
import { BsInfoCircleFill } from "react-icons/bs";
import "../assets/UserPanelStyles/userPanelStyle.css";
import GameMessage from "../component/GameMessage";

// Import win/lose sound effects
const winSound = new Audio(winSoundPath);
const loseSound = new Audio(loseSoundPath);

function Colorgame() {
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ index: null, colors: [] });
  const [selectedColor, setSelectedColor] = useState(null);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [gameHistory, setGameHistory] = useState([]);
  const [dateNumbers, setDateNumbers] = useState({
    dateNumber1: null,
    dateNumber2: null,
    dateNumber3: null,
    dateNumber4: null,
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(""); // "win" or "lose"
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [gameData, setGameData] = useState({});

  // Loading wallet balance from localStorage on component mount
  useEffect(() => {
    const storedBalance = localStorage.getItem("walletBalance");
    console.log("Stored balance:", storedBalance);
    if (storedBalance && !isNaN(parseFloat(storedBalance))) {
      setWalletBalance(parseFloat(storedBalance));
    } else {
      setWalletBalance(5000);
      localStorage.setItem("walletBalance", "5000");
    }
  }, []);

  useEffect(() => {
    // Add event listener for storage changes to sync across tabs/components
    const handleStorageChange = (e) => {
      if (e.key === "walletBalance" && e.newValue) {
        setWalletBalance(parseFloat(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Display message function
  const displayMessage = (msg, duration = 3000, type = "", gameData = {}) => {
    console.log("Setting message:", msg, "Type:", type, "Game Data:", gameData);
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setGameData(gameData);

    // Play sound based on message type
    if (type === "win") {
      winSound.play();
    } else if (type === "lose") {
      loseSound.play();
    }

    // Clear any existing timeout
    if (window.messageTimeout) {
      clearTimeout(window.messageTimeout);
    }

    // Set new timeout with longer durations for win/lose messages
    window.messageTimeout = setTimeout(
      () => {
        setShowMessage(false);
      },
      type === "win" || type === "lose" || type === "insufficient"
        ? 8000
        : duration
    );
  };

  // Hide message function
  const hideMessage = () => {
    setShowMessage(false);
  };

  // Handle bet placement
  const handleBet = (amount) => {
    if (walletBalance < amount) {
      displayMessage(
        "Insufficient balance! Please add funds to your wallet.",
        3000,
        "insufficient",
        {
          balance: walletBalance,
          betAmount: amount,
        }
      );
      return;
    }

    // Deduct the bet amount from the wallet only if sufficient funds
    const newBalance = walletBalance - amount;
    setWalletBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());

    displayMessage("Bet placed successfully!\nGood luck!", 3000);

    // Get current period ID
    const currentTabId = activeTab;
    const currentPeriod = dateNumbers[`dateNumber${currentTabId}`];

    // Store the bet information for processing after countdown
    const betInfo = {
      amount,
      modalContent,
      period: currentPeriod,
    };

    // Load existing bets from localStorage
    const existingBets = JSON.parse(
      localStorage.getItem(`pendingBets_tab${activeTab}`) || "[]"
    );

    // Add the new bet to the existing bets
    const updatedBets = [...existingBets, betInfo];

    // Save the updated bets to localStorage
    localStorage.setItem(
      `pendingBets_tab${activeTab}`,
      JSON.stringify(updatedBets)
    );

    // Close the modal
    setShowModal(false);
  };

  useEffect(() => {
    console.log("Wallet Balance Updated:", walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    console.log("Game History Updated:", gameHistory);
  }, [gameHistory]);

  const tabs = [
    { id: 1, label: "M Pride 30 sec", minutes: 0, seconds: 30 },
    { id: 2, label: "M Pride 1 Min", minutes: 1, seconds: 0 },
    { id: 3, label: "M Pride 3 Min", minutes: 3, seconds: 0 },
    { id: 4, label: "M Pride 5 Min", minutes: 5, seconds: 0 },
  ];

  const buttonLabels = ["Random", "2X", "5X", "10X", "20X", "50X", "100X"];

  const images = [
    { src: ball1, colors: ["#b35af6", "#e8373e"] },
    { src: ball2, colors: ["#5cce90"] },
    { src: ball3, colors: ["#e8373e"] },
    { src: ball4, colors: ["#5cce90"] },
    { src: ball5, colors: ["#e8373e"] },
    { src: ball6, colors: ["#5cce90", "#b35af6"] },
    { src: ball7, colors: ["#e8373e"] },
    { src: ball8, colors: ["#5cce90"] },
    { src: ball9, colors: ["#e8373e"] },
    { src: ball10, colors: ["#5cce90"] },
  ];

  const colors = {
    "#e8373e": {
      name: "Red",
      class:
        "bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50",
    },
    "#5cce90": {
      name: "Green",
      class:
        "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-lg shadow-green-500/50",
    },
    "#b35af6": {
      name: "Violet",
      class:
        "bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600 hover:bg-gradient-to-br shadow-lg shadow-violet-500/50",
    },
  };

  const sizes = {
    Big: {
      name: "Big",
      class:
        "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br shadow-lg shadow-green-500/50",
    },
    Small: {
      name: "Small",
      class:
        "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br shadow-lg shadow-violet-500/50",
    },
  };

  const handleBtncolorClick = (color) => {
    setSelectedColor(color);
    localStorage.setItem("buttonText", color);

    setModalContent({
      index: null,
      colors: [color], // Store the hex color
    });

    setShowModal(true);
  };

  const handleBtnSizeClick = (sizeKey) => {
    localStorage.setItem("buttonsize", sizeKey);

    setModalContent({
      index: null,
      colors: [sizeKey], // Store the size key directly
    });

    setShowModal(true);
  };

  const handleImageClick = (index) => {
    const selectedBall = images[index];

    console.log(`Clicked on image ${index}, Colors: `, selectedBall.colors);

    setModalContent({
      index: index,
      colors: selectedBall.colors, // Store color codes
    });

    setShowModal(true);
  };

  // Function to generate current period ID
  const generatePeriodId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  // Function to load date numbers from local storage
  const loadDateNumbers = () => {
    const formattedDate = generatePeriodId();

    const storedDateNumbers = {
      dateNumber1: localStorage.getItem("dateNumber_1") || formattedDate,
      dateNumber2: localStorage.getItem("dateNumber_2") || formattedDate,
      dateNumber3: localStorage.getItem("dateNumber_3") || formattedDate,
      dateNumber4: localStorage.getItem("dateNumber_4") || formattedDate,
    };

    // Parse and set the state
    setDateNumbers({
      dateNumber1: storedDateNumbers.dateNumber1,
      dateNumber2: storedDateNumbers.dateNumber2,
      dateNumber3: storedDateNumbers.dateNumber3,
      dateNumber4: storedDateNumbers.dateNumber4,
    });
  };

  // Function to clear game history
  const clearGameHistory = () => {
    setGameHistory([]);
    localStorage.removeItem("gameHistory");
    displayMessage("Game history cleared successfully!", 3000);
  };

  useEffect(() => {
    // Load date numbers when the component mounts
    loadDateNumbers();

    // Set up an interval to refresh period IDs every second
    const intervalId = setInterval(() => {
      loadDateNumbers();
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);


  // Close Betting Modal when Timer Modal opens
  useEffect(() => {
    if (showCounterModal) {
      setShowModal(false);
    }
  }, [showCounterModal]);

  

  // Load tab-specific game history when active tab changes
  useEffect(() => {
    if (gameHistory.length > 0) {
      const tabHistory = loadGameHistoryForTab(activeTab);

      if (tabHistory.length > 0) {
        const mergedHistory = [...gameHistory];
        saveGameHistoryForTab(activeTab, mergedHistory);
      } else {
        saveGameHistoryForTab(activeTab, gameHistory);
      }
    }

    const tabHistory = loadGameHistoryForTab(activeTab);
    if (tabHistory.length > 0) {
      setGameHistory(tabHistory);
    }
  }, [activeTab]);

  // Function to handle date number change from CountdownTimer
  const handleDateNumberChange = (newDateNumber, tabId) => {
    localStorage.setItem(`dateNumber_${tabId}`, newDateNumber);

    setDateNumbers((prev) => ({
      ...prev,
      [`dateNumber${tabId}`]: newDateNumber,
    }));
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  // useEffect to save and restore the active tab
  useEffect(() => {
    const savedTab = localStorage.getItem("activeColorGameTab");

    // If a saved tab exists and is valid, set it as the active tab
    if (
      savedTab &&
      !isNaN(parseInt(savedTab)) &&
      parseInt(savedTab) >= 1 &&
      parseInt(savedTab) <= 4
    ) {
      setActiveTab(parseInt(savedTab));
    } else {
      // If no saved tab or invalid, default to tab 1
      setActiveTab(1);
    }

    // Load date numbers when the component mounts
    loadDateNumbers();

    // Set up an interval to refresh period IDs every second
    const intervalId = setInterval(() => {
      loadDateNumbers();
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // function to also save the selected tab
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);

    // Save the active tab to localStorage
    localStorage.setItem("activeColorGameTab", tabNumber.toString());

    // Load the tab-specific game history
    const tabHistory = loadGameHistoryForTab(tabNumber);
    setGameHistory(tabHistory || []);
  };

  // Function to open How To Play modal
  const openHowToPlayModal = () => {
    setShowHowToPlayModal(true);
  };

  // Function to close How To Play modal
  const closeHowToPlayModal = () => {
    setShowHowToPlayModal(false);
  };

  const saveGameHistoryForTab = (tabId, history) => {
    localStorage.setItem(`gameHistory_tab${tabId}`, JSON.stringify(history));
  };

  // Function to load game history for a specific tab
  const loadGameHistoryForTab = (tabId) => {
    const tabHistory = localStorage.getItem(`gameHistory_tab${tabId}`);
    if (tabHistory) {
      try {
        return JSON.parse(tabHistory);
      } catch (error) {
        console.error(`Error parsing game history for tab ${tabId}:`, error);
        return [];
      }
    }
    return [];
  };

  // Then in useEffect for tab changes:
  useEffect(() => {
    const history = loadGameHistoryForTab(activeTab);
    setGameHistory(history);
  }, [activeTab]);

  // handleCountdownComplete to save history per tab and main game logic of winning and losing
  const handleCountdownComplete = (tabId, periodId) => {
    // Check if admin has preset a winner for this period
    const presetWinners = JSON.parse(
      localStorage.getItem("adminPresetWinners") || "{}"
    );
    // Generate a random winning number (0-9) or use admin preset
    const winningNumber =
      presetWinners[periodId] !== undefined
        ? parseInt(presetWinners[periodId])
        : Math.floor(Math.random() * 10);

    // Determine if the number is Big (5-9) or Small (0-4)
    const bigSmall = winningNumber >= 5 ? "Big" : "Small";

    // Determine color: Red (1,3,5,7,9), Green (0,2,4,6,8), Violet (0,5)
    let color;
    if (winningNumber % 2 === 1) {
      color = "Green";
    } else {
      color = "Red";
    }
    if (winningNumber === 0 || winningNumber === 5) {
      color = winningNumber === 0 ? "Violet/Red" : "Violet/Green";
    }

    // Create a result object for the game result
    const gameResult = {
      period: periodId,
      timestamp: new Date().toLocaleString(),
      number: winningNumber,
      color: color,
      bigSmall: bigSmall,
      tabId: tabId, // Add tabId to identify which tab this result belongs to
    };

    // Save this game result regardless of whether user placed bets
    const tabGameHistory = JSON.parse(
      localStorage.getItem(`gameHistory_tab${tabId}`) || "[]"
    );
    const updatedTabGameHistory = [gameResult, ...tabGameHistory];
    localStorage.setItem(
      `gameHistory_tab${tabId}`,
      JSON.stringify(updatedTabGameHistory)
    );

    // If current tab matches the game that just completed, update the state
    if (tabId === activeTab) {
      setGameHistory(updatedTabGameHistory);
    }

    // Process pending bets
    const pendingBetsJson = localStorage.getItem(`pendingBets_tab${tabId}`);
    let processedGameResults = []; // Define this variable outside the try/catch block

    if (pendingBetsJson) {
      try {
        const pendingBets = JSON.parse(pendingBetsJson);

        // Clear the pending bets immediately to prevent double processing
        localStorage.removeItem(`pendingBets_tab${tabId}`);

        // Process each bet
        processedGameResults = pendingBets.map((pendingBet) => {
          const { amount, modalContent } = pendingBet;

          // Check if user won based on their selection
          let isWin = false;
          let multiplier = 1;

          if (modalContent.index !== null && modalContent.index !== undefined) {
            // If user selected a specific ball (0-9)
            isWin = modalContent.index === winningNumber;
            multiplier = 7.98; // 7.98x for number bets
          } else if (
            modalContent.colors.includes("Big") ||
            modalContent.colors.includes("Small")
          ) {
            // If user selected Big or Small
            isWin = modalContent.colors.includes(bigSmall);
            multiplier = 1.98; // 1.98 for Big/Small
          } else {
            // If user selected a color or colors
            const selectedColors = modalContent.colors.map((c) => {
              if (c === "#e8373e") return "Red";
              if (c === "#5cce90") return "Green";
              if (c === "#b35af6") return "Violet";
              return c;
            });

            // Check if any of the selected colors match the result
            isWin = selectedColors.some((selectedColor) => {
              if (selectedColor === "Red") return color.includes("Red");
              if (selectedColor === "Green") return color.includes("Green");
              if (selectedColor === "Violet") return color.includes("Violet");
              return false;
            });

            // Calculate multiplier based on selection
            if (selectedColors.includes("Violet")) {
              multiplier = 1.58; // 1.58 for Violet color bets
            } else {
              multiplier = 1.98; // for Red/Green color bets
            }
          }

          const winAmount = isWin ? amount * multiplier : 0;

          // Update wallet balance if user wins
          if (isWin) {
            const newBalance = walletBalance + winAmount;
            setWalletBalance(newBalance);
            localStorage.setItem("walletBalance", newBalance.toString());
          }

          // Create a result object with all necessary information
          return {
            period: periodId,
            timestamp: new Date().toLocaleString(),
            betAmount: amount,
            selectedOption:
              modalContent.index !== null
                ? `Number ${modalContent.index}`
                : modalContent.colors
                    .map((c) => {
                      if (c === "#e8373e") return "Red";
                      if (c === "#5cce90") return "Green";
                      if (c === "#b35af6") return "Violet";
                      return c;
                    })
                    .join(", "),
            result: winningNumber,
            number: winningNumber,
            color: color,
            bigSmall: bigSmall,
            isWin: isWin,
            payout: winAmount,
            tabId: tabId,
          };
        });

        // Add game results to both the global history and tab-specific history
        setGameHistory((prev) => {
          const updatedHistory = [...processedGameResults, ...prev];
          localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
          return updatedHistory;
        });

        // Load the current tab history
        const tabHistory = loadGameHistoryForTab(tabId);
        const updatedTabHistory = [...processedGameResults, ...tabHistory];

        // Save to tab-specific history
        saveGameHistoryForTab(tabId, updatedTabHistory);

        // Update game history if the active tab matches the completed game's tab
        if (tabId === activeTab) {
          setGameHistory(updatedTabHistory);
        }

        // Display win/lose message
        const winningBets = processedGameResults.filter(
          (result) => result.isWin
        );
        if (winningBets.length > 0) {
          const totalWinnings = winningBets.reduce(
            (sum, bet) => sum + bet.payout,
            0
          );

          displayMessage(
            `Congratulations!\nYou Won ${periodId}\n${winningNumber} Rs. ${totalWinnings.toFixed(
              2
            )}`,
            8000,
            "win",
            {
              periodId: periodId,
              number: winningNumber,
              color: color,
              size: bigSmall,
              winAmount: totalWinnings,
              tabId: tabId.toString(),
            }
          );
        } else if (pendingBets.length > 0) {
          displayMessage(
            `Better luck next time!\nThe number was ${winningNumber} (${color})\nTry again!`,
            8000,
            "lose",
            {
              periodId: periodId,
              number: winningNumber,
              color: color,
              size: bigSmall,
              tabId: tabId.toString(),
            }
          );
        }
      } catch (error) {
        console.error("Error processing game result:", error);
        processedGameResults = []; // Reset in case of error
      }
    }

    // Now we can safely check processedGameResults outside the try/catch block
    if (processedGameResults && processedGameResults.length > 0) {
      // Save user bet history separately
      const userBetHistory = JSON.parse(
        localStorage.getItem(`userBets_tab${tabId}`) || "[]"
      );
      const updatedUserBetHistory = [
        ...processedGameResults,
        ...userBetHistory,
      ];
      localStorage.setItem(
        `userBets_tab${tabId}`,
        JSON.stringify(updatedUserBetHistory)
      );
    }
  };

  useEffect(() => {
    const tabHistory = loadGameHistoryForTab(activeTab);
    setGameHistory(tabHistory || []);
    console.log(`Loaded history for tab ${activeTab}:`, tabHistory);
  }, [activeTab]);

  // useEffect hook to load tab-specific history when active tab changes
  useEffect(() => {
    // Load the history for the active tab
    const tabHistory = loadGameHistoryForTab(activeTab);
    if (tabHistory.length > 0) {
      setGameHistory(tabHistory);
    } else {
      // If no tab-specific history exists, try to load from global history
      const globalHistory = JSON.parse(
        localStorage.getItem("gameHistory") || "[]"
      );
      setGameHistory(globalHistory);

      // And save it to the tab-specific storage
      if (globalHistory.length > 0) {
        saveGameHistoryForTab(activeTab, globalHistory);
      }
    }
  }, [activeTab]);

  // Render game info panel for each tab
  const renderGameInfoPanel = (tabId) => {
    const currentTab = tabs.find((tab) => tab.id === tabId);
    const dateNumberKey = `dateNumber${tabId}`;

    // Get the latest 5 unique period results from history for this tab
    const tabHistory = loadGameHistoryForTab(tabId);
    const uniquePeriods = [...new Set(tabHistory.map((game) => game.period))];
    const latestResults = uniquePeriods
      .slice(0, 5)
      .map((period) => tabHistory.find((game) => game.period === period));

    // Mapping of ball numbers to their corresponding images
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

    return (
      <div className="w-full gradient-top-btm rounded-xl shadow relative">
        <div className="w-5 h-5 rounded-full bg-[#1e2530] absolute -top-3 right-[40%] left-[48%]"></div>
        <div className="w-5 h-5 rounded-full bg-[#1e2530] absolute -bottom-3 right-[40%] left-[47%]"></div>
        <div className="px-2 flex divide-x divide-dashed divide-white/30">
          <div className="flex flex-col justify-between w-6/12 my-3 mr-1">
            <div className="flex items-center">
              <div
                className="flex gap-1 items-center border border-[#8f5206] text-[#8f5206] font-medium rounded-full text-xs px-5 py-0.5 text-center w-full mx-1 mr-4 cursor-pointer"
                onClick={openHowToPlayModal}
              >
                <BsInfoCircleFill />
                <span>How to Play</span>
              </div>
            </div>
            <div className="flex">
              <h5 className="text-xs font-semibold tracking-tight text-[#8f5106ea]">
                {currentTab?.label}
              </h5>
            </div>
            <div className="flex gap-2">
              {latestResults.length > 0 ? (
                latestResults.map((result, idx) => (
                  <img
                    key={idx}
                    src={numberToBallImage[result.number]}
                    className="w-6"
                    alt={`Ball ${result.number}`}
                    title={`Number ${result.number}: ${result.color}`}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex justify-between flex-col w-6/12 my-4">
            <div className="flex items-end justify-end gap-1">
              <span className="font-bold text-[#8f5106ea] text-sm">
                Time Remaining
              </span>
            </div>
            <div className="flex items-end justify-end py-1.5">
              <h5 className="text-lg font-semibold tracking-tight text-[#8f5106ea]">
                <CountdownTimer
                  initialMinutes={currentTab?.minutes || 0}
                  initialSeconds={currentTab?.seconds || 0}
                  tabId={tabId}
                  activeTab={activeTab}
                  onDateNumberChange={(newDateNumber) =>
                    handleDateNumberChange(newDateNumber, tabId)
                  }
                  setShowCounterModal={setShowCounterModal}
                  showCounterModal={showCounterModal}
                  setShowModal={setShowModal}
                  onCountdownComplete={handleCountdownComplete}
                />
              </h5>
            </div>
            <div className="flex items-end justify-end gap-2">
              <span className="font-bold text-[#8f5106ea] leading-none">
                {dateNumbers[dateNumberKey]}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const howToPlayInstructions = [
    "Select a color (Red, Green, or Violet) or a size (Big or Small) to place your bet.",
    "You can also bet on specific numbers (0-9) for higher payouts.",
    "Wait for the countdown timer to complete to see the results.",
    "Wins are calculated based on your selection and the payout multiplier.",
    "Red/Green bets pay 2x, Violet bets pay 4.5x, and specific number bets pay 9x.",
    "Big numbers are 5-9, Small numbers are 0-4.",
    "Red numbers are 1, 3, 5, 7, 9. Green numbers are 0, 2, 4, 6, 8.",
    "Numbers 0 and 5 are also Violet.",
  ];

  return (
    <div className="max-w-md mx-auto bg-[#1e2530] pb-1">
      <Navbar link="/user/home" />

      <div className=" mx-2  flex flex-col gap-2  relative ">
        <GameMessage
          message={message}
          messageType={messageType}
          showMessage={showMessage}
          hideMessage={() => setShowMessage(false)}
          gameData={gameData}
        />

        <Wallet
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
        />

        {/* How To Play Modal */}
        {showHowToPlayModal && (
          <div
            className="fixed max-w-md mx-auto inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-xs"
            style={{
              animation: "fadeIn 300ms ease-out forwards",
            }}
          >
            <div
              className="gradient-top-left rounded-lg w-96 p-6 shadow-lg m-6"
              style={{
                animation: "scaleIn 300ms ease-out forwards",
              }}
            >
              <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  How To Play
                </h2>
                <button
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                  onClick={closeHowToPlayModal}
                >
                  <X />
                </button>
              </div>
              <ul className="space-y-2 text-gray-700">
                {howToPlayInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4 mr-2 mt-1"
                    >
                      <path fill="currentColor" d="M2 12l5 5L20 6" />
                    </svg>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <Notification />
        <div className="">
          <ul
            className="flex flex-row w-full text-sm font-medium text-center bg-gray-700 rounded-xl"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`flex-1 rounded-xl ${
                  activeTab === tab.id
                    ? "gradient-btm-top text-[#8f5106ea]"
                    : "text-white/50"
                }`}
              >
                <div
                  className="flex flex-col justify-center items-center p-2.5"
                  onClick={() => handleTabClick(tab.id)}
                >
                  <img
                    src={timeicon}
                    className={`w-12 ${
                      activeTab === tab.id ? "" : "filter grayscale"
                    }`}
                    alt={tab.label}
                  />
                  <h4 className="leading-4">
                    {tab.label.split(" ")[0]} {tab.label.split(" ")[1]}
                  </h4>{" "}
                  {/* M Pride */}
                  <h4 className="leading-4">
                    {tab.label.split(" ").slice(2).join(" ")}
                  </h4>{" "}
                  {/* Time */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`horizontal-alignment-${tab.id}`}
              className={`${activeTab === tab.id ? "" : "hidden"}`}
              role="tabpanel"
              aria-labelledby={`horizontal-alignment-item-${tab.id}`}
            >
              {renderGameInfoPanel(tab.id)}
            </div>
          ))}
        </div>

        <div className="w-full px-3 py-4 rounded-xl shadow bg-gray-800 relative my-2">
          {/* Countdown Modal */}
          <CountdownModal
            showCounterModal={showCounterModal}
            setShowCounterModal={setShowCounterModal}
          />
          <div className="flex w-full justify-between gap-3">
            {Object.entries(colors).map(
              ([color, { name, class: bgClass }], index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleBtncolorClick(color)}
                  className={`w-full text-white ${bgClass} dark:shadow-lg font-medium text-sm px-5 py-2.5 text-center ${
                    index === 0
                      ? "rounded-tr-xl rounded-bl-xl"
                      : index === 2
                      ? "rounded-tl-xl rounded-br-xl"
                      : "rounded-lg"
                  }`}
                >
                  {name}
                </button>
              )
            )}
          </div>

          <div className="w-full flex items-center justify-between gap-1 px-3 py-3 rounded-xl shadow bg-gray-900 mt-3">
            <div className="grid grid-cols-5 gap-3 w-full">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.src}
                    alt={`ball-${index + 1}`}
                    className="transition-all duration-200"
                    onClick={() => handleImageClick(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="my-1 flex gap-1 overflow-auto mt-4">
            <div
              className="inline-flex rounded-md shadow-sm w-full px-4"
              role="group"
            >
              {Object.entries(sizes).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  className={`w-full text-white font-medium text-sm px-5 py-2.5 text-center ${
                    value.class
                  } ${key === "Big" ? "rounded-s-full" : "rounded-e-full"}`}
                  onClick={() => handleBtnSizeClick(key)}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <TabLedger activeTab={activeTab} gameHistory={gameHistory} />
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          showModal={showModal}
          ballIndex={modalContent.index} // Pass index directly
          colors={modalContent.colors} // Pass colors array
          onClose={closeModal}
          label={tabs.find((tab) => tab.id === activeTab)?.label}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          onBet={handleBet}
        />
      )}
      <Footer />
    </div>
  );
}

export default Colorgame;
