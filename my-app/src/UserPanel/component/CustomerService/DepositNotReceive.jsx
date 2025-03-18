import React, { useState } from "react";
import { IoChevronBack, IoCopyOutline, IoCheckmarkDone } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiInfo } from "react-icons/fi";

const DepositNotReceive = () => {
  const [copied, setCopied] = useState(false);
  
  // Sample transaction data (would come from API in a real app)
  const transactions = [
    {
      id: 1,
      type: "Recharge",
      status: "Completed",
      amount: 500,
      paymentMethod: "FAST-QRpay",
      time: "2025-02-27 14:57:31",
      orderNumber: "RC20250227145731817518451"
    }
  ];
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50">
      <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50">
        <Link
          to="/user/support"
          className="absolute left-2 text-gray-300 hover:text-white transition-colors"
        >
          <IoChevronBack size={24} />
        </Link>
        <p className="text-lg text-white font-medium tracking-wide">
          Recharge History
        </p>
      </header>

      <main className="flex-1 pt-16 pb-4 px-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="mt-4 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-500 text-white rounded-md flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">₹</span>
                </div>
                <span className="font-medium text-gray-800">{transaction.type}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                transaction.status === "Completed" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {transaction.status}
              </span>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 text-sm md:text-base">Amount</span>
                <span className="text-base md:text-lg font-medium text-amber-500">{transaction.amount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-800 text-sm md:text-base">Type</span>
                <span className="text-gray-700 text-[15px] md:text-lg">{transaction.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-800 text-sm md:text-base">Time</span>
                <span className="text-gray-700 text-[15px] md:text-lg">{transaction.time}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-800 text-sm md:text-base">Order Number</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 text-sm truncate max-w-32">
                    {transaction.orderNumber}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(transaction.orderNumber)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {copied ? <IoCheckmarkDone size={18} /> : <IoCopyOutline size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {transactions.length > 0 && (
          <div className="mt-6 text-center p-4 text-gray-500 flex items-center justify-center">
            <span className="border-b border-gray-200 flex-grow"></span>
            <span className="px-4">No more data</span>
            <span className="border-b border-gray-200 flex-grow"></span>
          </div>
        )}
        
        {transactions.length === 0 && (
          <div className="mt-12 text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FiInfo size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Transactions Found</h3>
            <p className="text-gray-500">Your recharge history will appear here</p>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-start">
            <FiAlertCircle className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="">
              <p className="text-[14px] font-medium text-blue-800 mb-1">Having issues with your recharge?</p>
              <p className="text-[13px] text-blue-700/70">If your payment was successful but not reflected in your account, please contact customer support with your order number.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepositNotReceive;