import React, { useState, useEffect } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import deposit from "../../assets/wallet/rechargeHistory.png";
import withdraw from "../../assets/wallet/widthdrawBlue.png";
import depositHistory from "../../assets/wallet/rechargeHistory.png";
import withdrawHistory from "../../assets/wallet/withdrawHistory.png";
import BackButton from "../../component/CommonComp/BackButton";
import Footer from "../../component/Footer";

function Wallet() {
  const [price, setPrice] = useState("₹0.00");
  const games = [
    { id: 1, name: "Lottery", amount: 0.0 },
    { id: 2, name: "TB_Chess", amount: 0.0 },
    { id: 3, name: "Wickets9", amount: 0.0 },
    { id: 4, name: "CQ9", amount: 0.0 },
    { id: 5, name: "MG", amount: 0.0 },
    { id: 6, name: "JDB", amount: 0.0 },
    { id: 7, name: "DG", amount: 0.0 },
    { id: 8, name: "CMD", amount: 0.0 },
    { id: 9, name: "SaBa", amount: 0.0 },
    { id: 10, name: "IM", amount: 0.0 },
    { id: 11, name: "EVO_Video", amount: 0.0 },
    { id: 12, name: "JILI", amount: 0.0 },
    { id: 13, name: "Card365", amount: 0.0 },
    { id: 14, name: "V8Card", amount: 0.0 },
    { id: 15, name: "AG_Video", amount: 0.0 },
    { id: 16, name: "PG", amount: 0.0 },
    { id: 17, name: "WM_Video", amount: 0.0 },
    { id: 18, name: "TB", amount: 0.0 },
  ];

  const links = [
    { to: "/user/deposit", img: deposit, label: "Deposit" },
    { to: "/user/withdraw", img: withdraw, label: "Withdraw" },
    {
      to: "/user/account/depositHistory",
      img: depositHistory,
      label: "Deposit History",
    },
    {
      to: "/user/account/withdrawHistory",
      img: withdrawHistory,
      label: "Withdrawal History",
    },
  ];

  useEffect(() => {
    // Get price from localStorage
    const storedPrice = localStorage.getItem("walletBalance");

    if (storedPrice) {
      setPrice(`₹${parseFloat(storedPrice).toFixed(2)}`);
    }
  }, []);

  const value = 0.7;
  return (
    <>
      <div className="max-w-md mx-auto bg-gray-900">
        <div className="">
          <div className="relative top-[3rem] h-[200px] w-[100%]  bg-gradient-to-r from-[#FF9A02] to-[#E67302]">
          <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Wallet
          </p>
        </header>
            <div className="">
              <div className="flex flex-col px-2 py-6 text-center  overflow-hidden">
                <div className="flex justify-center">
                  <svg
                    id="Layer_1"
                    enableBackground="new 0 0 52 52"
                    height="40"
                    viewBox="0 0 52 52"
                    width="40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g>
                        <path
                          d="m47.47091 17.77014v24.43006c0 2.19995-1.78003 3.98999-3.97998 3.98999h-37.51001c-1.80005 0-3.32001-1.20001-3.81-2.84003-.11005-.37-.17004-.75-.17004-1.14996v-32.67005h24.83002v4.26001h16.66003c.56 0 1.08997.12 1.56995.32001 1.42004.60998 2.41003 2.02001 2.41003 3.65997z"
                          fill="#ef5a76"
                        />
                      </g>
                      <g>
                        <path
                          d="m26.83089 9.53015v1.34003c-12.64001 2.08002-22.63 15.98999-24.83002 28.58002v-29.92005z"
                          fill="#f06982"
                        />
                      </g>
                      <g>
                        <path
                          d="m47.47091 17.77014v24.43006c0 2.19995-1.78003 3.98999-3.97998 3.98999h-37.51001c-1.80005 0-3.32001-1.20001-3.81-2.84003h15.81c14.35999 0 26.10999-15.14002 27.07996-29.23999 1.42004.60998 2.41003 2.02001 2.41003 3.65997z"
                          fill="#ef566f"
                        />
                      </g>
                      <g>
                        <path
                          d="m47.4749 9.79727v7.97556c0-2.20336-1.77921-3.98257-3.98257-3.98257h-37.50882c-1.10686 0-2.09994-.4448-2.81371-1.16892-.78619-.78618-1.24134-1.88269-1.15857-3.09297.13448-2.12066 2.01717-3.71367 4.13776-3.71367h37.34334c2.20336 0 3.98257 1.77927 3.98257 3.98257z"
                          fill="#f4c45f"
                        />
                      </g>
                      <g>
                        <path
                          d="m47.47091 9.80017v7.96997c0-2.19995-1.78003-3.97998-3.97998-3.97998h-37.51001c-1.10004 0-2.10004-.44-2.81-1.16998-.55005-.54999-.92999-1.23999-1.09003-2.01001h36.52002c3.01001 0 5.60999-1.75 6.82996-4.28998 1.22003.67999 2.04004 1.97998 2.04004 3.47998z"
                          fill="#e6ac35"
                        />
                      </g>
                      <g>
                        <path
                          d="m49.99866 26.32396v7.32825c0 1.01916-.82619 1.84536-1.84536 1.84536h-11.93725c-1.29151 0-2.33849-1.04698-2.33849-2.33849v-6.34206c0-1.29147 1.04694-2.33842 2.33842-2.33842h11.93732c1.01917-.00001 1.84536.82619 1.84536 1.84536z"
                          fill="#3e5176"
                        />
                      </g>
                      <g opacity=".1">
                        <path d="m50.000087 26.32572v7.32983c0 1.01607-.83343 1.83813-1.84956 1.83813h-11.93089c-1.30149 0-2.34049-1.03899-2.34049-2.32913v-.22829h11.71395c1.01614 0 1.84956-.82207 1.84956-1.83821v-6.6219h.70786c1.01615.00001 1.84957.8335 1.84957 1.84957z" />
                      </g>
                      <g>
                        <path
                          d="m41.61777 29.98093c0 1.31302-1.05622 2.36925-2.35496 2.36925-1.31303 0-2.36916-1.05622-2.36916-2.36925 0-1.29874 1.05614-2.35488 2.36916-2.35488 1.29874 0 2.35496 1.05614 2.35496 2.35488z"
                          fill="#d8e9f7"
                        />
                      </g>
                      <g fill="#293c66">
                        <path d="m6.81738 10.80225h35.84082c.55273 0 1-.44775 1-1s-.44727-1-1-1h-35.84082c-.55273 0-1 .44775-1 1s.44727 1 1 1z" />
                        <path d="m48.47461 23.51099c0-5.02098 0-9.15794 0-13.71362 0-2.74756-2.23535-4.98291-4.98242-4.98291h-37.34277c-2.71484 0-4.9707 2.04248-5.13672 4.64648-.00006.00092 0 .00183-.00006.00275-.00184.02233-.01166.04168-.01166.06463v32.6748c0 2.74756 2.23535 4.98242 4.98242 4.98242h37.50879c2.74707 0 4.98242-2.23486 4.98242-4.98242v-5.73804c1.41656-.16193 2.52441-1.35388 2.52441-2.81274v-7.32861c0-1.45886-1.10785-2.65082-2.52441-2.81274zm-42.32519-16.69654h37.34277c1.64453 0 2.98242 1.33789 2.98242 2.98291v3.98633c-.76646-.57516-1.90802-.99365-2.98242-.99365-13.48368 0-24.57466 0-37.50879 0-1.72305 0-3.09263-1.45596-2.97461-3.19824.09766-1.53125 1.50586-2.77735 3.14063-2.77735zm37.34277 38.3711h-37.50879c-1.64453 0-2.98242-1.33789-2.98242-2.98242v-28.42859c.85309.64819 1.88245 1.0155 2.98242 1.0155h37.50879c1.64453 0 2.98242 1.33789 2.98242 2.98291v5.70557h-10.25879c-1.84082 0-3.33789 1.49756-3.33789 3.33838v6.34229c0 1.84082 1.49707 3.33838 3.33789 3.33838h10.25879v5.70557c0 1.64452-1.33789 2.98241-2.98242 2.98241zm5.50683-11.53321c0 .46582-.37891.84521-.8457.84521h-11.9375c-.7373 0-1.33789-.60059-1.33789-1.33838v-6.34229c0-.73779.60059-1.33838 1.33789-1.33838h11.9375c.4668 0 .8457.37939.8457.84521z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="text-white text-xl font-medium">{price}</span>
                <span className="text-white text-sm">Total balance</span>
              </div>
              <div className="flex text-center justify-evenly text-white">
                <div className="flex flex-col">
                  <div>
                    <h4 className="font-medium">0</h4>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium">Total amount</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <h4 className="font-medium">0</h4>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium">
                      Total deposit amount
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-12 pt-10">
          <div className="p-1.5 py-6 m-3 rounded-lg">
            <div className="flex justify-between gap-5">
              <div className="flex w-full flex-col text-center justify-center items-center">
                <CircularProgressbar
                  className="w-20 font-bold"
                  styles={buildStyles({
                    pathColor: `rgb(249 145 2)`,
                    textColor: "#fff",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                    textSize: "16px",
                  })}
                  value={value}
                  maxValue={10000} // Updated max value
                  text={`${((value / 10000) * 100).toFixed(2)}%`} // Updated percentage calculation
                />
                <h4 className="text-white">{price}</h4>
                <h4 className="text-white text-sm">Main wallet</h4>
              </div>
              <div className="flex w-full flex-col text-center justify-center items-center">
                <CircularProgressbar
                  className="w-20 font-bold"
                  styles={buildStyles({
                    pathColor: `rgb(249 145 2)`,
                    textColor: "#fff",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                    textSize: "16px",
                  })}
                  value={value}
                  maxValue={10000} // Updated max value
                  text={`${((value / 10000) * 100).toFixed(2)}%`} // Updated percentage calculation
                />
                <h4 className="text-white">{price}</h4>
                <h4 className="text-white text-sm">Main wallet</h4>
              </div>
            </div>
            <div className="mt-3">
              <button
                type="button"
                className="w-full text-[#a55f13]s  border bg-[#ED8A1F] focus:outline-none  focus:ring-4 focus:ring-[#a55f13] font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 "
              >
                <div className="flex gap-3 justify-center items-center ">
                  <span className="font-semibold text-md text-white">
                    Main wallet transfer
                  </span>
                </div>
              </button>
            </div>
            <div className="flex flex-col mx-auto w-full">
              <div className="grid grid-cols-4 w-full min-w-0">
                {links.map(({ to, img, label }) => (
                  <div
                    key={to}
                    className="flex flex-col p-2 text-center overflow-hidden"
                  >
                    <Link to={to}>
                      <div className="flex justify-center">
                        <img src={img} alt={label} />
                      </div>
                      <span className="text-sm leading-none text-white">
                        {label}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" m-3 ">
            <div className=" mx-auto  w-full">
              <div className="grid grid-cols-3 gap-4">
                {games.map((items) => (
                  <div
                    key={items.id}
                    className="p-6 border shadow rounded-lg flex flex-col justify-center items-center gap-2"
                  >
                    <h4 className="text-sm text-gray-500 font-bold">
                      {items.amount.toFixed(2)}
                    </h4>
                    <h4 className="text-sm text-gray-400">{items.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wallet;
