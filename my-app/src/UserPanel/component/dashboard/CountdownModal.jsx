// import { useEffect } from "react";

// const CountdownModal = ({ showCounterModal, setShowCounterModal, seconds }) => {
//   if (!showCounterModal) return null;

//   useEffect(() => {
//     console.log("showCounterModal in Child:", showCounterModal); // Debugging
//   }, [showCounterModal]);

//   return (
//     <div className="z-10 fixed inset-0 flex items-center gap-4 justify-center bg-black/80 bg-opacity-30 backdrop-blur-sm">
//       <div className="bg-gray-800 text-yellow-400 text-9xl font-extrabold px-7 py-5 rounded-lg shadow-lg">
//         {seconds < 10 ? "0" : Math.floor(seconds / 10)}
//       </div>
//       <div className="bg-gray-800 text-yellow-400 text-9xl font-extrabold px-7 py-5 rounded-lg shadow-lg">
//         {seconds % 10}
//       </div>
//     </div>
//   );
// };

// export default CountdownModal;



import React from "react";

const CountdownModal = ({ showCounterModal, seconds }) => {
  if (!showCounterModal) return null;

  // Ensure seconds doesn't go below 1
  const displaySeconds = seconds > 0 ? seconds : 1;
  
  // Apply a different style for the final second
  const isFinalSecond = displaySeconds === 1;
  const numberStyle = isFinalSecond 
    ? "bg-red-800 text-white text-9xl font-extrabold px-7 py-5 rounded-lg shadow-lg animate-pulse" 
    : "bg-gray-800 text-yellow-400 text-9xl font-extrabold px-7 py-5 rounded-lg shadow-lg";

  return (
    <div className="z-10 max-w-md mx-auto  fixed inset-0 flex items-center gap-4 justify-center bg-black/70">
      <div className={numberStyle}>
        {Math.floor(displaySeconds / 10)}
      </div>
      <div className={numberStyle}>
        {displaySeconds % 10}
      </div>
    </div>
  );
};

export default CountdownModal;