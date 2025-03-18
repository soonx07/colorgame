import { useState, useEffect, useRef } from "react";
import CountdownModal from "./CountdownModal";
import countdownSound from "../../assets/countSound.mp3";
import finalSecondSound from "../../assets/final.mp3"; 

function CountdownTimer({
  initialMinutes,
  initialSeconds,
  tabId,
  activeTab,
  onDateNumberChange,
  setShowModal,
  onCountdownComplete
}) {
  const [time, setTime] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [dateNumber, setDateNumber] = useState(getStoredNumber(tabId));
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  // Use useRef for audio elements and tracking sound play state
  const countAudioRef = useRef(null);
  const finalAudioRef = useRef(null);
  
  // Keep track of which seconds we have already played sounds for
  const playedSecondsRef = useRef(new Set());

  // Preload audio elements eagerly on component mount
  useEffect(() => {
    // Create new audio elements each time to prevent any lingering state issues
    countAudioRef.current = new Audio();
    finalAudioRef.current = new Audio();

    // Set up load event handlers
    let countLoaded = false;
    let finalLoaded = false;

    const checkAllLoaded = () => {
      if (countLoaded && finalLoaded) {
        setSoundsLoaded(true);
        console.log("All audio files successfully loaded");
      }
    };

    countAudioRef.current.addEventListener('canplaythrough', () => {
      console.log("Count sound loaded successfully");
      countLoaded = true;
      checkAllLoaded();
    });

    finalAudioRef.current.addEventListener('canplaythrough', () => {
      console.log("Final sound loaded successfully");
      finalLoaded = true;
      checkAllLoaded();
    });

    // Set up error handlers
    countAudioRef.current.addEventListener('error', (e) => {
      console.error("Error loading count sound:", e);
    });

    finalAudioRef.current.addEventListener('error', (e) => {
      console.error("Error loading final sound:", e);
    });

    // Set attributes before setting source to ensure proper loading
    countAudioRef.current.preload = "auto";
    finalAudioRef.current.preload = "auto";
    
    // Set sources - using try/catch to handle any potential issues
    try {
      countAudioRef.current.src = countdownSound;
      finalAudioRef.current.src = finalSecondSound;
      
      // Start loading explicitly
      countAudioRef.current.load();
      finalAudioRef.current.load();
    } catch (error) {
      console.error("Error setting audio sources:", error);
    }

    // Clear the played seconds set when component mounts
    playedSecondsRef.current = new Set();

    // Clean up audio on component unmount
    return () => {
      if (countAudioRef.current) {
        countAudioRef.current.pause();
        countAudioRef.current.src = "";
      }
      if (finalAudioRef.current) {
        finalAudioRef.current.pause();
        finalAudioRef.current.src = "";
      }
    };
  }, []);

  function getFormattedDate() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

  function getStoredNumber(tabId) {
    const stored = localStorage.getItem(`dateNumber_${tabId}`);
    if (stored) {
      return stored;
    } else {
      return getFormattedDate();
    }
  }

  // Load saved timer state
  useEffect(() => {
    const savedTime = JSON.parse(localStorage.getItem(`timer_${tabId}`));
    if (savedTime) {
      setTime(savedTime);
    } else {
      setTime({
        minutes: initialMinutes,
        seconds: initialSeconds,
      });
    }
    
    setIsTimerActive(true);
    
    const interactionState = localStorage.getItem(`hasInteracted_${tabId}`);
    if (interactionState === "true") {
      setHasInteracted(true);
    }

    // Reset played seconds when tab changes
    playedSecondsRef.current = new Set();
  }, [tabId, initialMinutes, initialSeconds]);

  // Play sound function with proper error handling
  const playSound = async (audioRef, secondNumber) => {
    if (!audioRef.current) {
      console.error("Audio ref is null");
      return;
    }

    // Check if we've already played a sound for this second
    if (playedSecondsRef.current.has(secondNumber)) {
      console.log(`Already played sound for second ${secondNumber}, skipping`);
      return;
    }

    // Mark this second as played
    playedSecondsRef.current.add(secondNumber);

    try {
      // Make sure all other sounds are stopped
      if (countAudioRef.current) {
        countAudioRef.current.pause();
        countAudioRef.current.currentTime = 0;
      }
      
      if (finalAudioRef.current) {
        finalAudioRef.current.pause();
        finalAudioRef.current.currentTime = 0;
      }
      
      // Reset the specific audio to ensure it's ready to play
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      console.log(`Attempting to play sound for second ${secondNumber}, readyState: ${audioRef.current.readyState}`);
      
      // Using the play() promise API
      await audioRef.current.play();
      console.log(`Sound played successfully for second ${secondNumber}`);
    } catch (error) {
      console.error(`Error playing sound for second ${secondNumber}:`, error);
      
      // If there's an error playing, try one more time after a short delay
      if (audioRef.current) {
        setTimeout(() => {
          try {
            audioRef.current.play().catch(e => 
              console.error(`Second attempt to play sound for second ${secondNumber} failed:`, e)
            );
          } catch (e) {
            console.error(`Second attempt error:`, e);
          }
        }, 100);
      }
    }
  };

  // Handle sound playing with a completely revised approach
  useEffect(() => {
    // Only proceed if this tab is active, sounds are loaded, and we're in the last 5 seconds
    if (activeTab === tabId && soundsLoaded && time.minutes === 0 && time.seconds <= 5 && time.seconds > 0) {
      // Show counter modal when countdown reaches last 5 seconds
      if (!modalShown) {
        setShowCounterModal(true);
        setModalShown(true);
        setShowModal(false); // Close parent modal
      }
      
      // Play the appropriate sound EXACTLY ONCE for each second
      // We use the Set to track which seconds we've already played sounds for
      const currentSecond = time.seconds;
      
      if (!playedSecondsRef.current.has(currentSecond)) {
        if (currentSecond === 1) {
          // For second 1, play ONLY the final sound
          playSound(finalAudioRef, currentSecond);
        } else if (currentSecond >= 2 && currentSecond <= 5) {
          // For seconds 2-5, play ONLY the countdown sound
          playSound(countAudioRef, currentSecond);
        }
      }
    }
  }, [time, activeTab, tabId, modalShown, setShowModal, soundsLoaded]);

  // Main countdown timer effect - continuous running
  useEffect(() => {
    let timer;
    
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds > 0) {
            const newTime = { ...prevTime, seconds: prevTime.seconds - 1 };
            localStorage.setItem(`timer_${tabId}`, JSON.stringify(newTime));
            return newTime;
          } else if (prevTime.minutes > 0) {
            const newTime = { minutes: prevTime.minutes - 1, seconds: 59 };
            localStorage.setItem(`timer_${tabId}`, JSON.stringify(newTime));
            return newTime;
          } else {
            setIsTimeUp(true);
            setShowCounterModal(false);
            return { minutes: 0, seconds: 0 };
          }
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [tabId, isTimerActive]);

  // Handle timer completion
  useEffect(() => {
    if (isTimeUp) {
      // Stop any playing sounds
      if (countAudioRef.current) {
        countAudioRef.current.pause();
        countAudioRef.current.currentTime = 0;
      }
      
      if (finalAudioRef.current) {
        finalAudioRef.current.pause();
        finalAudioRef.current.currentTime = 0;
      }
      
      // Reset the played seconds
      playedSecondsRef.current = new Set();
      
      // Generate new timestamp and reset
      const newNumber = getFormattedDate();
      setDateNumber(newNumber);
  
      if (typeof onDateNumberChange === "function") {
        onDateNumberChange(newNumber, tabId);
      }
  
      localStorage.setItem(`dateNumber_${tabId}`, newNumber);
  
      if (typeof onCountdownComplete === "function") {
        onCountdownComplete(tabId, newNumber);
      }
  
      // Reset timer state
      setTime({ minutes: initialMinutes, seconds: initialSeconds });
      localStorage.setItem(`timer_${tabId}`, JSON.stringify({ 
        minutes: initialMinutes, 
        seconds: initialSeconds 
      }));
      
      setIsTimeUp(false);
      setModalShown(false);
    }
  }, [isTimeUp, initialMinutes, initialSeconds, tabId, onDateNumberChange, onCountdownComplete]);

  // Handle user interaction
  const handleUserInteraction = () => {
    localStorage.setItem(`hasInteracted_${tabId}`, "true");
    setHasInteracted(true);
  };

  return (
    <div className="">
      <span>
        <span className="bg-[#1e2530] text-white shadow-lg shadow-amber-400 p-1 mx-0.5 ">
          {time.minutes < 10 ? "0" : Math.floor(time.minutes / 10)}
        </span>
        <span className="bg-[#1e2530] text-white shadow-lg shadow-amber-400 p-1 mx-0.5 ">
          {time.minutes % 10}
        </span>
      </span>
      <span className="bg-[#1e2530] text-white shadow-lg shadow-amber-400 p-1 mx-0.25">:</span>
      <span>
        <span className="bg-[#1e2530] text-white shadow-lg shadow-amber-400 p-1 mx-0.5 ">
          {time.seconds < 10 ? "0" : Math.floor(time.seconds / 10)}
        </span>
        <span className="bg-[#1e2530] text-white shadow-lg shadow-amber-400 p-1 mx-0.5 ">
          {time.seconds % 10}
        </span>
      </span>

      {/* Countdown Modal */}
      {showCounterModal && !hasInteracted && (
        <div
          className="z-10 max-w-md mx-auto fixed inset-0 flex items-center gap-4 justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleUserInteraction}
        >
          <div className="bg-red-800 text-white text-9xl font-extrabold px-7 py-5 rounded-lg shadow-lg animate-pulse">
            {Math.floor(time.seconds / 10)}
          </div>
          <div className="bg-red-800 text-white text-9xl font-extrabold px-7 py-5 rounded-lg shadow-lg animate-pulse">
            {time.seconds % 10}
          </div>
        </div>
      )}
      <CountdownModal
        showCounterModal={showCounterModal}
        setShowCounterModal={setShowCounterModal}
        seconds={time.seconds}
      />
    </div>
  );
}

export default CountdownTimer;