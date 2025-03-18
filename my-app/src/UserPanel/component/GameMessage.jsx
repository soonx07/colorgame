import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import winImg from "../assets/winImg.png";
import loseImg from "../assets/loseImg.png";

const GameMessage = ({ message, messageType, showMessage, hideMessage, gameData = {} }) => {
  // Only render if showMessage is true
  if (!showMessage) return null;
  
  // Auto-close timer state
  const [timer, setTimer] = useState(3);
  
  // Auto-close countdown effect
  useEffect(() => {
    if (showMessage && (messageType === "win" || messageType === "lose")) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            hideMessage();
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(countdown);
        setTimer(3);
      };
    }
  }, [showMessage, hideMessage, messageType]);
  
  // Extract game data for win/lose/insufficient messages
  const {
    periodId = "00000000000000",
    number = 0,
    color = "",
    size = "",
    winAmount = 0,
    betAmount = 0,
    balance = 0,
    tabId = "",
  } = gameData;
  
  // Translating tabId to M Pride time information
  const getTabInfo = (tabId) => {
    switch (tabId) {
      case "1":
        return "30 sec";
      case "2":
        return "1 Min";
      case "3":
        return "3 Min";
      case "4":
        return "5 Min";
      default:
        return "";
    }
  };
  
  const tabTimeInfo = getTabInfo(tabId);
  
  // Background image based on message type
  const backgroundImage = messageType === "win" 
    ? `url(${winImg})`
    : messageType === "lose" 
      ? `url(${loseImg})`
      : "";
      
  // Get motivational messages for lose scenario
  const getLoseMessage = () => {
    const messages = [
      "Don't worry, everyone has off days! Your next win is just around the corner.",
      "So close! The odds will be in your favor next time.",
      "The best players know that every game is a new opportunity!",
      "Not this time, but your luck is building up for something big!",
      "Even champions face setbacks. Keep your spirit high!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  
  // Get celebratory messages for win scenario
  const getWinMessage = () => {
    const messages = [
      "You've got the magic touch today!",
      "Your strategy is paying off brilliantly!",
      "What an amazing win! You're on fire!",
      "Skill and luck are on your side!",
      "That's how champions play the game!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div
      className={`fixed top-[12%] left-0 right-0 z-50 w-[80%]  mx-auto
      rounded-2xl min-w-[240px] max-w-[380px] animation-slide-in
      ${
        messageType === "insufficient"
          ? "bg-gradient-to-r from-purple-600 to-red-500 text-white md:w-[350px]" 
          : messageType === "win"
          ? "h-[32rem] md:h-[36rem]"
          : messageType === "lose"
          ? "h-[32rem] md:h-[36rem]"
          : "h-[15rem]"
      }
      shadow-2xl
      `}
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Close button for message */}
      <button
        onClick={hideMessage}
        className="absolute bottom-4 left-0 right-0 mx-auto w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 z-10"
      >
        <X size={20} className='text-gray-700'/>
      </button>

      {messageType === "win" && (
        <div className="relative overflow-hidden pb-4 text-center">
          {/* Top award icon  */}
          <div className="flex justify-center -mt-6 mb-2">
            <div className="relative">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300 animate-pulse">
                <div className="text-white text-2xl">🏆</div>
              </div>
              <div className="absolute -left-8 top-6 w-10 h-6 bg-orange-300 rounded-full transform -rotate-45"></div>
              <div className="absolute -right-8 top-6 w-10 h-6 bg-orange-300 rounded-full transform rotate-45"></div>
            </div>
          </div>

          <div className="text-center px-4 mt-8">
            <div className="font-extrabold text-3xl md:text-4xl text-white drop-shadow-lg">
              Congratulations!
            </div>
            <div className="text-gray-100 mt-1 text-lg font-medium">
              You're a winner!
            </div>
          </div>

          {/* Motivational message */}
          <div className="mx-6 mt-2">
            <p className="text-white text-sm md:text-base italic bg-black/50 bg-opacity-30 py-2 px-2 rounded-full">
              "{getWinMessage()}"
            </p>
          </div>

          {/* Lottery results */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="px-4 md:px-6 py-1 md:py-2 bg-red-600 rounded-full text-white font-medium text-lg md:text-xl shadow-md">
              {color || "Red"}
            </div>
            <div className="px-4 md:px-6 py-1 md:py-2 bg-red-600 rounded-full text-white font-medium text-lg md:text-xl shadow-md">
              {number || "6"}
            </div>
            <div className="px-4 md:px-6 py-1 md:py-2 bg-red-600 rounded-full text-white font-medium text-lg md:text-xl shadow-md">
              {size || "Big"}
            </div>
          </div>

          {/* Bonus amount */}
          <div className="mx-8 mt-6">
            <div className="relative">
              <div className="absolute -top-3 left-0 right-0 text-center">
                <span className="bg-red-500 text-white font-bold px-6 py-1 rounded-full shadow-md">
                  Bonus
                </span>
              </div>
              <div className="bg-white rounded-lg py-3 shadow-lg text-center pt-6 border-2 border-yellow-300">
                <div className="text-3xl font-bold text-rose-500">
                  ₹{winAmount.toFixed(2) || "9.80"}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                  Period: M Pride {tabTimeInfo} {periodId}
                </div>
              </div>
            </div>
          </div>

          {/* Encouraging next step */}
          <div className="mt-4 text-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition transform hover:scale-105">
              Play Again
            </button>
          </div>

          {/* Auto close - with visual timer */}
          <div className="flex justify-center items-center mt-4 md:mt-8">
            <div className="w-6 h-6 rounded-full bg-gray-300 bg-opacity-20 flex items-center justify-center mr-2 text-white font-bold">
              3
            </div>
            <div className="text-white text-sm md:text-base">seconds auto close</div>
          </div>
        </div>
      )}

      {messageType === "lose" && (
        <div className="relative overflow-hidden pb-4 text-center">
          {/* Top icon with wings - kinder version */}
          <div className="flex justify-center -mt-6 mb-2">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-white text-2xl">🎲</div>
              </div>
              <div className="absolute -left-8 top-6 w-10 h-6 bg-blue-300 rounded-full transform -rotate-45"></div>
              <div className="absolute -right-8 top-6 w-10 h-6 bg-blue-300 rounded-full transform rotate-45"></div>
            </div>
          </div>

          <div className="text-center px-4 mt-8">
            <div className="font-extrabold text-3xl text-gray-600">
              Not This Time
            </div>
            <div className="text-gray-500 mt-1 text-lg font-medium">
              But Don't Give Up!
            </div>
          </div>

          {/* Encouraging message */}
          <div className="mx-6 mt-2">
            <p className="text-white text-sm md:text-base italic bg-black/50 bg-opacity-30 py-2 px-2 rounded-full">
              "{getLoseMessage()}"
            </p>
          </div>

          {/* Lottery results - match the image layout with improved styling */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="px-4 md:px-6 py-1 md:py-2 bg-blue-500 rounded-full text-white font-medium text-lg md:text-xl shadow-md">
              {color || "Green"}
            </div>
            <div className="px-4 md:px-6 py-1 md:py-2 bg-blue-500 rounded-full text-white font-medium text-lg md:text-xl shadow-md">
              {number || "3"}
            </div>
            <div className="px-4 md:px-6 py-1 md:py-2 bg-blue-500 rounded-full text-white font-medium text-lg md:text-xl shadow-md">
              {size || "Small"}
            </div>
          </div>

          {/* Result - match the image layout with improved styling */}
          <div className="mx-8 mt-6">
            <div className="relative">
              <div className="bg-white rounded-lg py-3 shadow-lg text-center border border-blue-300">
                <div className="text-2xl font-bold text-blue-600">
                  Try Again
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                  Period: M Pride {tabTimeInfo} {periodId}
                </div>
              </div>
            </div>
          </div>

          {/* Auto close - with visual timer */}
          <div className="flex justify-center items-center mt-4 md:mt-8">
            <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-2 text-gray-500 font-bold">
              {timer}
            </div>
            <div className="text-gray-500 text-sm md:text-base">seconds auto close</div>
          </div>
        </div>
      )}

      {messageType === "insufficient" && (
        <div className="relative shadow-2xl overflow-hidden text-center pb-4">
          {/* Animated pulsing border */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-red-500 to-purple-600 rounded-2xl animate-pulse opacity-70"></div>
          <div className="relative m-1 bg-gradient-to-r from-purple-600 to-red-500 rounded-xl p-3">
            
            {/* Top icon - more eye-catching */}
            <div className="flex justify-center -mt-10 mb-2">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
                  <div className="text-white text-3xl">💲</div>
                </div>
                {/* Lightning bolts instead of wings */}
                <div className="absolute -left-8 top-8 text-2xl transform -rotate-15">⚡</div>
                <div className="absolute -right-8 top-8 text-2xl transform rotate-15">⚡</div>
              </div>
            </div>

            {/* Alert title - more dramatic */}
            <div className="text-center px-4 mt-2">
              <div className="font-extrabold text-3xl text-white drop-shadow-md">
                BALANCE LOW!
              </div>
              <div className="font-medium text-yellow-200 text-lg mt-1">
                Unable to place bet
              </div>
            </div>

            {/* Balance details - more visual contrast */}
            <div className="mx-4 mt-4 mb-2">
              <div className="bg-white rounded-lg py-4 shadow-lg text-center relative border-2 border-red-300">
                <div className="absolute -top-3 left-0 right-0 text-center">
                  <span className="bg-red-500 text-white font-bold px-4 py-1 rounded-full shadow-md">
                    Your Wallet
                  </span>
                </div>
                
                {/* Current balance - with visual indicator */}
                <div className="flex justify-between items-center px-3 md:px-6 mb-3">
                  <div className="text-left">
                    <div className="text-gray-700 font-semibold">Current:</div>
                  </div>
                  <div className="flex items-center bg-red-100 px-2 md:px-3 py-1 rounded-lg">
                    <div className="text-base md:text-lg mr-1 text-red-500">⚠️</div>
                    <div className="text-red-600 font-bold text-base md:text-lg">₹{balance.toFixed(2)}</div>
                  </div>
                </div>
                
                {/* Required amount - with visual indicator */}
                <div className="flex justify-between items-center px-3 md:px-6">
                  <div className="text-left">
                    <div className="text-gray-700 font-semibold">Required:</div>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 md:px-3 py-1 rounded-lg">
                    <div className="text-base md:text-lg mr-1">🎯</div>
                    <div className="text-purple-700 font-bold text-base md:text-lg">₹{betAmount.toFixed(2)}</div>
                  </div>
                </div>
                
                {/* Shortfall - visual representation */}
                <div className="mt-3 px-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-300" 
                      style={{ width: `${Math.min(100, (balance/betAmount) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    Shortfall: ₹{(betAmount - balance).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="flex justify-center mt-3 mb-2">
              <button 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105"
              >
                Add Funds Now
              </button>
            </div>

            {/* Auto close - with animation */}
            <div className="flex justify-center items-center mt-2">
              <div className="w-4 h-4 rounded-full border-2 border-yellow-300 mr-2 animate-ping"></div>
              <div className="text-yellow-200">Auto closing in 3 seconds</div>
            </div>
          </div>
        </div>
      )}

      {!messageType && (
        <div className="py-6 px-4 font-medium text-center relative overflow-hidden">
          {/* Enhanced background for regular messages */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl animate-pulse"></div>
          
          <div className="flex flex-col items-center justify-center bg-blue-400/80 rounded-xl">
            {/* Attractive icon */}
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-2 border-blue-300">
              <span className="text-white text-2xl">ℹ️</span>
            </div>
            
            {/* Message with enhanced styling */}
            <div className="whitespace-pre-line relative z-10 text-lg font-medium text-white">
              {message}
            </div>
            
            {/* Decorative bottom elements */}
            <div className="mt-4 flex space-x-2">
              <div className="h-1 w-12 bg-blue-300 rounded animate-pulse"></div>
              <div className="h-1 w-6 bg-blue-200 rounded animate-pulse delay-150"></div>
              <div className="h-1 w-12 bg-blue-300 rounded animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMessage;