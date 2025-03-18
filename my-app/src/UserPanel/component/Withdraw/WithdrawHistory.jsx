import React, { useState, useEffect } from "react";
import NoData from "../CommonComp/NoData";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import BackButton from "../CommonComp/BackButton";
import Footer from "../Footer";

function WithdrawHistory() {
  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    // Retrieve stored withdrawals from localStorage
    const storedWithdrawals = JSON.parse(localStorage.getItem("withdrawals")) || [];
    setWithdrawals(storedWithdrawals);
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

  // Filter withdrawals based on selected tab
  const filteredWithdrawals = openTab === 1 
    ? withdrawals 
    : withdrawals.filter((item) => item.type === buttons.find((b) => b.id === openTab)?.name);

  return (
    <>
      <div className="pb-14 max-w-md mx-auto bg-gray-900 h-screen">
      <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Withdraw History
          </p>
        </header>
        <div className="px-2 py-2 pt-18">
          <div className="flex overflow-x-scroll gap-2">
            {buttons.map((button) => (
              <button
                key={button.id}
                type="button"
                onClick={() => setOpenTab(button.id)}
                className={`px-5 min-w-max py-2 text-base font-medium text-center inline-flex items-center text-white rounded-lg ${
                  openTab === button.id ? "bg-gray-900" : "bg-gray-700"
                }`}
              >
                {button.name}
              </button>
            ))}
          </div>

          <div className="my-3">
            <button
              type="button"
              onClick={toggleModal}
              className="text-white justify-between w-full bg-gray-700 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {filteredWithdrawals.length > 0 ? (
            <div className="mt-4">
              {filteredWithdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="bg-gray-800 p-4 rounded-lg my-2 text-white">
                  <p><strong>ID:</strong> {withdrawal.id}</p>
                  <p><strong>Amount:</strong> ₹{withdrawal.amount}</p>
                  <p><strong>Type:</strong> {withdrawal.type}</p>
                  <p><strong>Date:</strong> {withdrawal.timestamp}</p>
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )}

          <Modal show={showModal} onClose={toggleModal} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WithdrawHistory;
