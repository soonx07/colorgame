export const DepositOption = ({ depositAmount, bonusAmount, description, color, handleDepositClick }) => {
    const colors = {
      yellow: {
        bg: 'from-yellow-400 to-yellow-600',
        border: 'border-yellow-500/30',
        hoverBorder: 'hover:border-yellow-400',
        hoverBg: 'hover:from-yellow-500 hover:to-yellow-700',
      },
      blue: {
        bg: 'from-blue-400 to-blue-600',
        border: 'border-blue-500/30',
        hoverBorder: 'hover:border-blue-400',
        hoverBg: 'hover:from-blue-500 hover:to-blue-700',
      },
      purple: {
        bg: 'from-purple-400 to-purple-600',
        border: 'border-purple-500/30',
        hoverBorder: 'hover:border-purple-400',
        hoverBg: 'hover:from-purple-500 hover:to-purple-700',
      },
      green: {
        bg: 'from-green-400 to-green-600',
        border: 'border-green-500/30',
        hoverBorder: 'hover:border-green-400',
        hoverBg: 'hover:from-green-500 hover:to-green-700',
      },
    };
  
    const { bg, border, hoverBorder, hoverBg } = colors[color];
  
    return (
      <div className={`bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 mb-3 border ${border} hover:${hoverBorder} transition-all transform hover:scale-105 hover:shadow-md`}>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <span className={`bg-${color}-500 rounded-full p-1 mr-2`}>
              {/* Icon can be customized based on the color */}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-gray-900`} viewBox="0 0 20 20" fill="currentColor">
                {/* Add an icon based on your color scheme */}
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </span>
            <div className="flex flex-col">
              Deposit <span className={`text-${color}-400 font-bold text-sm`}>₹{depositAmount}</span>
            </div>
          </div>
          <div className={`text-${color}-400 font-bold flex items-center`}>
            <span className="text-sm mr-1">+</span>
            <span className="text-sm">₹{bonusAmount}</span>
          </div>
        </div>
        <div className="text-xs text-gray-300 mb-2 ml-7">
          {description}
        </div>
  
        {/* Progress bar and button on the same line */}
        <div className="flex items-center space-x-2">
          <div className="h-7 bg-gray-900 rounded-full relative flex-grow overflow-hidden">
            <div className={`h-full w-0 bg-gradient-to-r ${bg} rounded-full`}></div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-white opacity-80">0/₹{depositAmount}</div>
          </div>
          <button 
            className={`bg-gradient-to-r ${bg} text-white border-none rounded-full py-[5px] px-3 cursor-pointer font-bold text-xs shadow-md shadow-${color}-600/50 transform transition-all duration-200 hover:scale-105`}
            onClick={() => handleDepositClick(depositAmount)}
          >
            Claim Bonus
          </button>
        </div>
      </div>
    );
  };
  