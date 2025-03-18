import React, { useState, useEffect } from "react";
import NoData from "../CommonComp/NoData";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import BackButton from "../CommonComp/BackButton";
import Footer from "../Footer";

function DepositHistory() {
  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);

  useEffect(() => {
    // Fetch deposit history from localStorage when component loads
    const storedDeposits =
      JSON.parse(localStorage.getItem("depositData")) || [];
    setDepositHistory(storedDeposits);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const buttons = [
    { id: 1, name: "All" },
    { id: 2, name: "UPI x QR" },
    { id: 3, name: "UPI x APPS" },
    { id: 4, name: "UPI x PAYTM" },
    { id: 5, name: "Bank Card" },
    { id: 6, name: "USDT" },
    { id: 7, name: "TRX" },
  ];

  // Filter deposits based on selected tab
  const filteredDeposits =
    openTab === 1
      ? depositHistory
      : depositHistory.filter(
          (deposit) =>
            deposit.menuName === buttons.find((btn) => btn.id === openTab)?.name
        );

  return (
    <>
      <div className="pb-14 h-screen max-w-md mx-auto bg-gray-900">
      <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Deposit History
          </p>
        </header>

        <div className="px-2 py-2 pb-20 pt-18">
          <div className="flex overflow-x-scroll gap-2">
            {buttons.map((button) => (
              <button
                key={button.id}
                type="button"
                onClick={() => setOpenTab(button.id)}
                className={`px-5 min-w-max py-2 text-base font-medium text-center inline-flex items-center text-white rounded-lg ${
                  openTab === button.id ? "bg-orange-500" : "bg-gray-700"
                }`}
              >
                {button.name}
              </button>
            ))}
          </div>

          {/* Display Deposit History */}
          <div className="mt-4">
            {filteredDeposits.length > 0 ? (
              filteredDeposits.map((deposit, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg shadow mb-2 bg-gray-800 text-white"
                >
                  <h4 className="text-sm font-semibold">
                    Method: {deposit.menuName}
                  </h4>
                  <h4 className="text-sm">Data Name: {deposit.menuDataName}</h4>
                  <h4 className="text-sm">Amount: ₹{deposit.depositAmount}</h4>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DepositHistory;
