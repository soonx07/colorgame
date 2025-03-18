import React, { useState } from 'react';
import { DepositOption } from '../../component/CommonComp/DepositOption';

const DepositBonusPopup = ({ handleDepositClick, handleActivityClick, handleCloseDepositPopup }) => {
  const [noReminders, setNoReminders] = useState(false);

  // Define the deposit options
  const depositOptions = [
    {
      depositAmount: 200000,
      bonusAmount: 10000,
      description: 'Get a massive ₹10,000 bonus on your first ₹200,000 deposit!',
      color: 'yellow',
    },
    {
      depositAmount: 100000,
      bonusAmount: 5000,
      description: 'Receive a generous ₹5,000 bonus on your first ₹100,000 deposit!',
      color: 'blue',
    },
    {
      depositAmount: 30000,
      bonusAmount: 2000,
      description: 'Unlock a ₹2,000 bonus with your first ₹30,000 deposit!',
      color: 'purple',
    },
    {
      depositAmount: 10000,
      bonusAmount: 600,
      description: 'Start with a ₹600 bonus on your first ₹10,000 deposit!',
      color: 'green',
    },
  ];

  return (
    <div className="fixed max-w-md mx-auto inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl w-4/5 max-w-md relative animate-bounce-in overflow-hidden border-2 border-yellow-500 shadow-lg shadow-yellow-500/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-amber-900 to-indigo-900 px-4 py-3 relative overflow-hidden">
          <h2 className="text-center text-base font-bold text-white mb-1 relative z-10 uppercase tracking-wider">EPIC BONUS CHEST</h2>
          <div className="text-center text-sm text-yellow-200 font-medium mb-1 relative z-10">Unlock Your First Deposit Treasure!</div>
          <div className="text-center text-xs text-gray-300 relative z-10">One-time reward per account</div>
        </div>

        <div className="px-4 py-2 text-white max-h-96 overflow-y-auto">
          {depositOptions.map((option, index) => (
            <DepositOption
              key={index}
              depositAmount={option.depositAmount}
              bonusAmount={option.bonusAmount}
              description={option.description}
              color={option.color}
              handleDepositClick={handleDepositClick}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-900 p-4 flex justify-between items-center border-t border-gray-700">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="no-reminders" 
              checked={noReminders}
              onChange={() => setNoReminders(!noReminders)}
              className="mr-2 h-4 w-4 accent-yellow-500 rounded-xl"
            />
            <label htmlFor="no-reminders" className="text-xs text-gray-300 hover:text-white">
              No reminders today
            </label>
          </div>
          <button 
            className="btn-gold-ltr text-gray-700 border-none rounded-full py-2 px-2 cursor-pointer font-bold text-[11px] shadow-md"
            onClick={handleActivityClick}
          >
            Activity Log
          </button>
        </div>
      
        {/* Close button */}
        <button 
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer text-white shadow-lg transition-all duration-200 hover:scale-110 z-20"
          onClick={handleCloseDepositPopup}
          aria-label="Close popup"
        >
          ✕
        </button>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-75 animation-delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-75 animation-delay-1500"></div>
      </div>
    </div>
  );
};

export default DepositBonusPopup;