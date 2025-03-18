import { useState, useEffect } from "react";

function Modal({
  showModal,
  onClose,
  onBet,
  label,
  ballIndex,
  colors,
  walletBalance,
  setWalletBalance,
}) {
  const [balanceActiveButton, setBalanceActiveButton] = useState(1);
  const [quantityActiveButton, setQuantityActiveButton] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [balance, setBalance] = useState(1);

  const [betAmount, setBetAmount] = useState(1);
  const quantityMultipliers = [1, 2, 10, 20, 50, 100];
  const balanceMultipliers = [1, 10, 100, 1000];

  const balanceButtonClick = (index) => {
    setBalanceActiveButton(index);
    setBalance(balanceMultipliers[index - 1]); // Set balance based on button selection
  };

  const quantityButtonClick = (index) => {
    setQuantityActiveButton(index);
    setQuantity(quantityMultipliers[index - 1]); // Set quantity based on button selection
  };

  // Function to handle decrementing the count
  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(1, prevQuantity - 1);
      updateActiveQuantityButton(newQuantity);
      return newQuantity;
    });
  };

  // Function to handle incrementing the count
  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateActiveQuantityButton(newQuantity);
      return newQuantity;
    });
  };

  // Function to update active quantity button
  const updateActiveQuantityButton = (newQuantity) => {
    const index = quantityMultipliers.findIndex(
      (value) => value === newQuantity
    );
    setQuantityActiveButton(index !== -1 ? index + 1 : null);
  };

  // Calculate total amount
  const totalAmount = (quantity * balance).toFixed(2);

  // Color mapping for exact hex values
  const colorMap = {
    "#e8373e": {
      name: "RED",
      gradient: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
      solidColor: "#e8373e",
    },
    "#5cce90": {
      name: "GREEN",
      gradient: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
      solidColor: "#5cce90",
    },
    "#b35af6": {
      name: "VIOLET",
      gradient: "bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600",
      solidColor: "#b35af6",
    },
    Big: {
      name: "BIG",
      gradient: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
      solidColor: "#ffc107",
    },
    Small: {
      name: "SMALL",
      gradient: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
      solidColor: "#007bff",
    },
  };

  // Determining primary color based on selection
  const getPrimaryColor = () => {
    if (colors?.length === 1) {
      // Check if it is a color in the colorMap and return the gradient
      if (colorMap[colors[0]]) {
        return colorMap[colors[0]].gradient; // This returns the gradient class
      }
      // If it's a named color (Big, Small, etc.)
      if (colors[0] === "Big")
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600";
      if (colors[0] === "Small")
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600";
      if (colors[0] === "RED" || colors[0] === "Red")
        return "bg-gradient-to-r from-red-400 via-red-500 to-red-600";
      if (colors[0] === "GREEN" || colors[0] === "Green")
        return "bg-gradient-to-r from-green-400 via-green-500 to-green-600";
      if (colors[0] === "VIOLET" || colors[0] === "Violet")
        return "bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600";
    }

    // Mixed color logic for specific ball selections (e.g., ball index 0 or 5)
    if (ballIndex === 0) {
      return "bg-gradient-to-r from-red-400 via-red-500 to-violet-500"; // Red + Violet Diagonal Gradient Mix
    }
    if (ballIndex === 5) {
      return "bg-gradient-to-r from-green-400 via-green-500 to-violet-500"; // Green + Violet Diagonal Gradient Mix
    }

    return "bg-gradient-to-r from-green-400 via-green-500 to-green-600"; // Default gradient if no match
  };

  const primaryColor = getPrimaryColor();

  // Function to get color name for display
  const getColorName = (color) => {
    if (colorMap[color]) {
      return colorMap[color].name;
    }
    return color; // Return the original if not mapped
  };

  const handleBet = () => {
    // calling the onBet prop with the total amount
    if (onBet) {
      onBet(parseFloat(totalAmount));
    } else {
      console.error("onBet function is not defined!");
    }

    onClose();
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center w-full max-w-md mx-auto items-center fixed bottom-0 z-50 outline-none focus:outline-none max-w-[800px]">
            <div className="relative">
              <div
                className={`rounded-t-3xl flex flex-col gap-2 items-center justify-center py-2 ${primaryColor}`}
              >
                <h1 className="font-bold text-white text-xl">{label}</h1>
                <button
                  type="button"
                  className="text-gray-800 font-medium rounded-lg text-sm px-5 py-2 bg-white me-2 mb-2"
                >
                  {ballIndex !== undefined &&
                  ballIndex !== null &&
                  ballIndex !== -1
                    ? `Selected Ball: ${ballIndex}`
                    : colors && colors.length > 0
                    ? colors.includes("Big")
                      ? "Selected: Big"
                      : colors.includes("Small")
                      ? "Selected: Small"
                      : `Selected Color: ${colors
                          .map((color) => getColorName(color))
                          .join(", ")}`
                    : "No selection"}
                </button>
              </div>

              <div className="bg-gray-900 border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none pt-2 pb-0 rounded-b-lg">
                <div className="relative p-3 flex-auto flex flex-col gap-4">
                  {/* Wallet Balance Display */}
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-white text-lg">
                      Wallet Balance:
                    </h5>
                    <span className="text-white font-medium">
                      ₹{walletBalance.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-white text-lg">Balance:</h5>
                    <div className="flex space-x-2">
                      {balanceMultipliers.map((value, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                            balanceActiveButton === index + 1
                              ? "bg-white text-gray-900"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                          onClick={() => balanceButtonClick(index + 1)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-lg">Quantity:</h5>
                    <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-1 px-5 border border-gray-700">
                      <button
                        onClick={handleDecrement}
                        className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-16 bg-transparent text-center text-white font-medium focus:outline-none rounded-2xl"
                        value={quantity}
                      />
                      <button
                        onClick={handleIncrement}
                        className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {["X1", "X5", "X10", "X20", "X50", "X100"].map(
                      (label, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            quantityActiveButton === index + 1
                              ? `${primaryColor} text-white` // Apply the gradient class when active
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                          onClick={() => quantityButtonClick(index + 1)}
                        >
                          {label}
                        </button>
                      )
                    )}
                  </div>

                  <div className="flex items-center mt-2">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        true
                          ? "border-green-500 bg-green-500"
                          : "border-gray-500"
                      }`}
                      style={{
                        borderColor: primaryColor,
                        backgroundColor: true ? primaryColor : "",
                      }}
                    >
                      {true && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <label className="text-white ml-2">
                      I agree{" "}
                      <span className="text-red-500">(Pre-sale rules)</span>
                    </label>
                  </div>
                </div>

                {/* Footer with action buttons */}
                <div className="flex mt-4">
                  <button
                    className="w-1/3 py-4 bg-gray-800 text-gray-400 font-medium"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className={`w-2/3 py-4 text-gray-900 font-bold  ${primaryColor}`}
                    onClick={handleBet}
                  >
                    Total amount ₹{totalAmount}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
