import React from "react";
import { Link } from "react-router-dom";
import WithdrawWallet from "./WithdrawWallet";
import NoData from "../CommonComp/NoData";
import upload from "../../assets/plus.png";
import BackButton from "../CommonComp/BackButton";
import lottery from "../../assets/tab-images/lottery.png";

import { useState, useEffect } from "react";
import Footer from "../Footer";
import toast, { Toaster } from "react-hot-toast";

function Withdraw() {
  const [openTab, setOpenTab] = useState(1);
  const [price, setPrice] = useState("₹0.00");
  const bankdetails = true;
  const [inr, setInr] = useState("");
  const [error, setError] = useState("");
  const [convertedUSDT, setConvertedUSDT] = useState(0);
  const [bankAmount, setBankAmount] = useState("₹");

  const [walletBalance, setWalletBalance] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("walletBalance");
    const storedWithdrawals =
      JSON.parse(localStorage.getItem("withdrawals")) || [];

    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    } else {
      localStorage.setItem("walletBalance", "5000"); // Default balance
      setWalletBalance(5000);
    }

    setWithdrawalHistory(storedWithdrawals);
  }, []);

  const usdtValue = 50; // Example: user balance
  const conversionRate = 83; // Example: 1 USDT = 83 INR

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInr(value);

    if (value === "") {
      setError("Please enter an amount");
      setConvertedUSDT(0);
    } else if (parseFloat(value) >= usdtValue * conversionRate) {
      setError("Insufficient balance");
      setConvertedUSDT(0);
    } else {
      setError("");
      setConvertedUSDT((parseFloat(value) / conversionRate).toFixed(4));
    }
  };

  const handleBankWithdraw = () => {
    const amount = parseFloat(bankAmount);

    if (!amount || isNaN(amount)) {
      toast.error("Enter a valid amount");
      return;
    }
    if (amount > walletBalance) {
      toast.error("Insufficient Balance to withdraw");
      return;
    }

    // Deduct from walletBalance instantly
    const newBalance = walletBalance - amount;
    setWalletBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance);

    // Store withdrawal history instantly
    const newWithdrawal = {
      id: Date.now(),
      amount,
      type: "Bank",
      timestamp: new Date().toLocaleString(),
    };
    const updatedHistory = [newWithdrawal, ...withdrawalHistory];
    setWithdrawalHistory(updatedHistory);
    localStorage.setItem("withdrawals", JSON.stringify(updatedHistory));

    toast.success("Bank withdrawal successful!");
    setBankAmount(""); // Reset input field
  };

  const handleWithdraw = () => {
    const amount = parseFloat(inr);

    if (!amount || isNaN(amount)) {
      setError("Enter a valid amount");
      return;
    }
    if (amount > walletBalance) {
      setError("Insufficient balance");
      return;
    }

    // Deduct from walletBalance instantly
    const newBalance = walletBalance - amount;
    setWalletBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance);

    // Store withdrawal history instantly
    const newWithdrawal = {
      id: Date.now(),
      amount,
      type: "USDT",
      timestamp: new Date().toLocaleString(),
    };
    const updatedHistory = [newWithdrawal, ...withdrawalHistory];
    setWithdrawalHistory(updatedHistory);
    localStorage.setItem("withdrawals", JSON.stringify(updatedHistory));

    toast.success(`Withdrawal successful: ₹${amount}`);
    setInr(""); // Reset input field
  };

  useEffect(() => {
    // Get price from localStorage
    const storedPrice = localStorage.getItem("walletBalance");

    if (storedPrice) {
      setPrice(`₹${parseFloat(storedPrice).toFixed(2)}`);
    }
  }, []);

  const mainMenu = {
    menu: [
      {
        key: 1,
        name: "Bank Card",
      },
      {
        key: 2,
        name: "USDT",
      },
    ],
  };

  const [amount, setAmount] = useState("");

  // Find the data corresponding to the active tab
  const activeTab =
    mainMenu.menu.find((menuItem) => menuItem.key === openTab) || {};
  const activeTabData = activeTab.data || [];
  const depositAmounts = activeTab.depositAmount || [];

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto bg-gray-900"> 
      <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Withdraw
          </p>
        </header>
        <div className="p-1.5 pt-16">
          <WithdrawWallet price={price} />
        </div>
        <div className="p-1.5 mx-auto mt-3">
          <div className=" items-center justify-center maxW-xl">
            {/* Tab navigation */}
            <div className="grid grid-cols-3 ">
              {mainMenu.menu.map((menuItem) => (
                <div
                  key={menuItem.key}
                  onClick={() => setOpenTab(menuItem.key)}
                  className={`text-center px-1 py-2 text-gray-600 rounded`}
                >
                  <button
                    className={`flex-col w-full p-2 ${
                      openTab === menuItem.key
                        ? "bg-gradient-to-t from-orange-400 to-orange-500 rounded-lg text-white"
                        : "text-white border rounded-lg"
                    } flex items-center justify-center transition-opacity`}
                  >
                    <img src={lottery} className="w-20" alt="icon" />
                    <span className="text-xs leading-none font-medium">
                      {menuItem.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div>
              {mainMenu.menu.map((menuItem) => (
                <div
                  key={menuItem.key}
                  className={`${
                    openTab === menuItem.key
                      ? "block animate-fade-up animate-ease-out"
                      : "hidden"
                  }`}
                >
                  <div>
                    {!bankdetails && (
                      <div>
                        <Link to="/user/Account/AddBankAccount">
                          <div className="border rounded-lg p-3 flex flex-col gap-4">
                            <div className="flex justify-center">
                              <img src={upload} alt="" className="w-12" />
                            </div>
                            <div className="flex justify-center">
                              <h4 className="text-gray-400">
                                Add a bank account number
                              </h4>
                            </div>
                          </div>
                        </Link>
                        <div className="my-2">
                          <h4 className="text-red-500 text-xs text-center tracking-wider">
                            Need to add beneficiary information to be able to
                            withdraw money
                          </h4>
                        </div>
                      </div>
                    )}
                    {openTab === 1 && menuItem.key === 1 ? (
                      <div className="rounded-lg mb-4 border p-3">
                        <p className="text-sm font-medium text-gray-200">
                          Enter Amount to withdraw
                        </p>
                        <div className="relative mb-3">
                          <input
                            className="w-full pl-11 bg-transparent placeholder:text-white text-white text-sm rounded-full"
                            placeholder="Enter amount"
                            type="number"
                            value={bankAmount}
                            onChange={(e) => setBankAmount(e.target.value)}
                          />
                          <span className="absolute h-10 w-10 left-1 top-0 my-auto px-2 flex items-center font-extrabold text-orange-500">
                            ₹
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-[#768096]">
                          <span>
                            Withdrawable balance{" "}
                            <span className="text-[#ED8A1F]">{price}</span>
                          </span>
                          <button className="text-[#ED8A1F] hover:text-white border border-[#ED8A1F] rounded-md px-8">
                            All
                          </button>
                        </div>
                        <div className="flex justify-between text-xs text-[#768096]">
                          <span>Withdrawable amount received</span>
                          <span className="text-[#ED8A1F]">{price}</span>
                        </div>
                        <button
                          onClick={handleBankWithdraw}
                          className="text-white bg-gradient-to-r from-orange-400 to-orange-500 rounded-full w-full text-lg px-5 py-2"
                        >
                          Withdraw
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-lg mb-4 border p-3">
                        <p className="text-sm font-medium text-gray-200">
                          Enter USDT to withdraw
                        </p>
                        <div className="relative mb-3">
                          <input
                            className="w-full pl-11 bg-transparent placeholder:text-white text-white text-sm rounded-full"
                            placeholder="Enter INR amount"
                            type="number"
                            value={inr}
                            onChange={handleInputChange}
                          />
                          <span className="absolute h-10 w-10 left-1 top-0 my-auto px-2 flex items-center font-extrabold text-orange-500">
                            ₹
                          </span>
                        </div>
                        {error && (
                          <p className="text-xs text-red-500">{error}</p>
                        )}
                        {!error && inr && (
                          <p className="text-xs text-green-500">
                            Converted USDT: {convertedUSDT}
                          </p>
                        )}

                        <button
                          onClick={handleWithdraw}
                          className="text-white bg-gradient-to-r from-orange-400 to-orange-500 rounded-full w-full text-lg px-5 py-2.5"
                        >
                          Withdraw
                        </button>
                      </div>
                    )}

                    <div className=" border rounded-lg">
                      <div className="p-4 py-3.5 border border-gray-200 rounded-lg">
                        <div className="flex mb-2">
                          <div className="me-3">
                            <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Need to bet{" "}
                              <span className="text-red-500">₹0.00</span> to be
                              able to withdraw
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          <div className="me-3">
                            <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Withdraw time{" "}
                              <span className="text-red-500">00:00-23:50</span>{" "}
                              to be able to withdraw
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          <div className="me-3">
                            <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Inday Remaining Withdrawal Times{" "}
                              <span className="text-red-500">3</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          <div className="me-3">
                            <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-ms">
                              Withdrawal amount range{" "}
                              <span className="text-red-500">
                                ₹110.00-₹100,000.00
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          <div className="me-3">
                            <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Please confirm your beneficial account information
                              before withdrawing. If your information is
                              incorrect, our company will not be liable for the
                              amount of loss
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          <div className="me-3">
                            <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              If your beneficial information is incorrect,
                              please contact customer service
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex my-3">
                        <div className="flex-shrink-0">
                          <svg
                            height="25"
                            viewBox="0 0 64 64"
                            width="25"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              id="_14_wallet_download_download_wallet_money_purse_interest_business_and_finance"
                              data-name="14 wallet download, download, wallet, money, purse, interest, business and finance"
                            >
                              <path
                                d="m29.89 43.54a1 1 0 0 0 -.89-.54h-3v-6a1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1v6h-3a1 1 0 0 0 -.88.53 1 1 0 0 0 .05 1l6 9a1 1 0 0 0 .83.47 1 1 0 0 0 .83-.45l6-9a1 1 0 0 0 .06-1.01z"
                                fill="#3b2314"
                              />
                              <path
                                d="m4 12a1 1 0 0 1 -1-1v-3a5 5 0 0 1 5-5h47a1 1 0 0 1 0 2h-47a3 3 0 0 0 -3 3v3a1 1 0 0 1 -1 1z"
                                fill="#ec1c24"
                              />
                              <path
                                d="m58 8h-52a3 3 0 0 0 -3 3v36a3 3 0 0 0 3 3h1.81a16 16 0 0 0 30.38 0h19.81a3 3 0 0 0 3-3v-36a3 3 0 0 0 -3-3zm-35 50a13 13 0 1 1 13-13 13 13 0 0 1 -13 13z"
                                fill="#f6921e"
                              />
                              <path
                                d="m56 24h-11a5 5 0 0 0 0 10h11a1 1 0 0 0 1-1v-8a1 1 0 0 0 -1-1z"
                                fill="#3b2314"
                              />
                              <g fill="#ec1c24">
                                <path d="m46 31a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                                <path d="m9 16a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                                <path d="m55 46a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                                <path d="m55 16a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0 ms-2">
                          <p className="text-md font-medium text-gray-200 truncate ">
                            Withdrawal history
                          </p>
                        </div>
                      </div>
                      <NoData />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Withdraw;
