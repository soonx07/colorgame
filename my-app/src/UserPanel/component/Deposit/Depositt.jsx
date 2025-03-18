import React from "react";
import { useState, useEffect } from "react";
import lottery from "../../assets/tab-images/lottery.png";
import RechargeIns from "./RechargeIns";
import DepositWallet from "./DepositWallet";
import BackButton from "../CommonComp/BackButton";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import toast, { Toaster } from "react-hot-toast";

function Deposit() {
  const [openTab, setOpenTab] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const [price, setPrice] = useState("0.00");

  useEffect(() => {
    // Retrieve wallet balance from local storage (default to 5000 if not set)
    const storedPrice = localStorage.getItem("walletBalance") || "5000";
    setPrice(`${parseFloat(storedPrice).toFixed(2)}`);
  }, []);

  const mainMenu = {
    menu: [
      {
        key: 1,
        name: "UPI x QR",
        data: [
          { name: "MahaPayINR", balance: "500 - 50000" },
          { name: "GaayPayINR QR", balance: "300 - 50000" },
          { name: "HPAY x QR", balance: "100 - 50000" },
          { name: "EPayINR", balance: "500 - 50000" },
          { name: "TBPay x QR", balance: "500 - 50000" },
          { name: "McgPayINR", balance: "500 - 50000" },
          { name: "NBPayINR", balance: "500 - 50000" },
          { name: "GreenPayINR", balance: "100 - 50000" },
          { name: "GLOBALPAY X QR", balance: "500 - 100000" },
          { name: "KKPay QR", balance: "500 - 50000" },
          { name: "InotcPayINR", balance: "500 - 50000" },
          { name: "CpuPayINR", balance: "500 - 50000" },
        ],
        depositAmount: [
          "500",
          "1000",
          "3000",
          "5000",
          "10000",
          "20000",
          "50000",
        ],
      },
      {
        key: 2,
        name: "UPI x APPs",
        data: [
          { name: "PayZApp", balance: "200 - 30000" },
          { name: "PhonePe", balance: "500 - 50000" },
          { name: "Google Pay", balance: "100 - 40000" },
          { name: "Amazon Pay", balance: "300 - 20000" },
          { name: "Mobikwik", balance: "500 - 50000" },
          { name: "Freecharge", balance: "100 - 10000" },
          { name: "BHIM", balance: "500 - 50000" },
          { name: "TrueCaller Pay", balance: "100 - 25000" },
          { name: "WhatsApp Pay", balance: "500 - 15000" },
          { name: "Airtel Money", balance: "200 - 50000" },
        ],
        depositAmount: ["300", "500", "1000", "2k", "5000", "10000", "50000"],
      },
      {
        key: 3,
        name: "UPI x PAYTM",
        data: [
          { name: "Paytm Wallet", balance: "100 - 50000" },
          { name: "Paytm UPI", balance: "300 - 20000" },
          { name: "Paytm Bank", balance: "500 - 1L" },
          { name: "Paytm QR", balance: "100 - 75000" },
          { name: "Paytm Business", balance: "500 - 5L" },
        ],
        depositAmount: ["100", "500", "1000", "5000", "10000", "50000"],
      },
      {
        key: 4,
        name: "Bank Card",
        data: [
          { name: "HDFC Credit Card", balance: "1000 - 5L" },
          { name: "ICICI Debit Card", balance: "500 - 1L" },
          { name: "SBI Credit Card", balance: "1000 - 5L" },
          { name: "Axis Debit Card", balance: "500 - 1L" },
          { name: "Kotak Credit Card", balance: "1000 - 5L" },
          { name: "RBL Debit Card", balance: "500 - 1L" },
        ],
        depositAmount: ["500", "1000", "5000", "10000", "50000", "100000"],
      },
      {
        key: 5,
        name: "USDT",
        data: [
          { name: "Binance USDT", balance: "50 - 10000" },
          { name: "Coinbase USDT", balance: "100 - 50000" },
          { name: "Kraken USDT", balance: "200 - 20000" },
          { name: "Gemini USDT", balance: "100 - 30000" },
          { name: "KuCoin USDT", balance: "50 - 25000" },
          { name: "Huobi USDT", balance: "100 - 10000" },
        ],
        depositAmount: ["10", "50", "100", "500", "1000", "5000"],
      },
      {
        key: 6,
        name: "TRX",
        data: [
          { name: "Binance TRX", balance: "50 - 10000" },
          { name: "Coinbase TRX", balance: "100 - 50000" },
          { name: "Kraken TRX", balance: "200 - 20000" },
          { name: "Gemini TRX", balance: "100 - 30000" },
          { name: "KuCoin TRX", balance: "50 - 25000" },
          { name: "Huobi TRX", balance: "100 - 10000" },
        ],
        depositAmount: ["50", "100", "200", "500", "1000", "5000"],
      },
    ],
  };

  // Find active tab data
  const activeTab = mainMenu.menu.find((menuItem) => menuItem.key === openTab);
  const activeTabData = activeTab?.data || [];
  const depositAmounts = activeTab?.depositAmount || [];

  const handleDeposit = () => {
    if (!selectedMenu || !selectedItem || !selectedAmount) {
      toast.error("Please select a payment method and amount.");
      return;
    }

    const newDeposit = {
      id: Date.now(),
      menuName: selectedMenu, // Menu Name
      menuDataName: selectedItem, // Menu Data Name
      depositAmount: selectedAmount, // Deposit Amount
    };

    const existingDeposits =
      JSON.parse(localStorage.getItem("depositData")) || [];

    const updatedDeposits = [...existingDeposits, newDeposit];

    localStorage.setItem("depositData", JSON.stringify(updatedDeposits));

    toast.success("Deposit successfully!");

    // Convert string to number
    const currentBalance =
      parseFloat(localStorage.getItem("walletBalance")) || 5000;

    // Update balance after deposit
    const newBalance = currentBalance + parseFloat(depositAmounts);

    // Store updated balance in local storage
    localStorage.setItem("walletBalance", newBalance.toFixed(2));

    // Update price state
    setPrice(`${newBalance.toFixed(2)}`);
    setSelectedAmount("");
    setSelectedMenu("");
    setSelectedItem("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="pb-14 max-w-md mx-auto bg-gray-900">
      <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Deposit
          </p>
        </header>
        <div className="p-1.5 pt-16">
          <DepositWallet price={price} />
          <div className=" mx-auto mt-3">
            <div className=" items-center justify-center maxW-xl">
              {/* Tab navigation */}
              <div className="grid grid-cols-3 ">
                {mainMenu.menu.map((menuItem) => (
                  <div
                    key={menuItem.key}
                    onClick={() => {
                      setOpenTab(menuItem.key);
                      setSelectedMenu(menuItem.name); // Store selected menu name
                      setSelectedItem(null); // Reset selected data
                      setSelectedAmount(null); // Reset selected amount
                    }}
                    className={`text-center px-1 py-2 text-gray-600 rounded`}
                  >
                    <button
                      className={`flex-col w-full p-2 ${
                        openTab === menuItem.key
                          ? "bg-gradient-to-t from-orange-400 to-orange-500 rounded-lg text-white"
                          : "text-dark border rounded-lg"
                      } flex items-center justify-center transition-opacity`}
                    >
                      <img src={lottery} className="w-20" alt="icon" />
                      <span className="text-xs leading-none font-medium text-white">
                        {menuItem.name}
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="w-full p-1 mt-6 ">
                <div className={`"block animate-fade-up animate-ease-out"`}>
                  <div>
                    <div className="flex items-center mb-2">
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
                        <p className="text-md font-normal text-gray-200 truncate ">
                          Select Channel
                        </p>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg mb-4">
                      {/* Tab content */}
                      <div className="grid grid-cols-2 gap-6">
                        {activeTabData.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedItem(item.name)} // Store selected data name
                            className={`p-3 border border-gray-200 rounded-lg shadow cursor-pointer ${
                              selectedItem === item.name
                                ? "bg-gradient-to-t from-orange-400 to-orange-500 text-white"
                                : "text-white border"
                            }`}
                          >
                            <h4 className="text-sm">{item.name}</h4>
                            <h4 className="text-sm">Balance: {item.balance}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
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
                        <p className="text-sm font-medium text-gray-200 truncate ">
                          Deposit Amount
                        </p>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg mb-4">
                      <div className="grid grid-cols-3 gap-3">
                        {depositAmounts.map((amount, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedAmount(amount)}
                            className={`gap-1 text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded border cursor-pointer ${
                              selectedAmount === amount
                                ? "bg-orange-500 text-white border-orange-500"
                                : "text-orange-400 border-gray-300"
                            }`}
                          >
                            <span
                              className={
                                selectedAmount === amount
                                  ? "text-white"
                                  : "text-gray-400"
                              }
                            >
                              ₹
                            </span>
                            <span className="font-normal">{amount}</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full  relative mt-4">
                        <div className="relative">
                          <input
                            className="w-full pl-11  bg-transparent  placeholder:text-white text-white text-sm rounded-full"
                            placeholder="Please enter the amount"
                            value={selectedAmount || ""} // Ensure it's always a string
                            onChange={(e) => setSelectedAmount(e.target.value)} // Allow manual input
                          />
                          <div className="absolute h-10 w-10 left-1 top-0 my-auto px-2 flex items-center font-extrabold">
                            <span className="text-lg text-orange-500"> ₹</span>
                          </div>
                          <div className="absolute right-1 top-2 my-auto px-2 flex items-center ">
                            <svg
                              viewBox="0 0 32 32"
                              fill="none"
                              aria-hidden="true"
                              className="size-6"
                              onClick={() => setSelectedAmount("")}
                            >
                              <path
                                d="m13 13 6 6m0-6-6 6m15-3c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Z"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={handleDeposit}
                          type="button"
                          className="text-white bg-gradient-to-r from-orange-400 to-orange-500 font-medium rounded-full w-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
                        >
                          Deposit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <RechargeIns />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Deposit;
