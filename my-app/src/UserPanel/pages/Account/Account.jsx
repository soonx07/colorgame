import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import BankInfo from "./BankInfo";
import Voult from "./Voult";
import History from "./History";
import SettingOption from "./SettingOption";
import ServiceCenter from "./ServiceCenter";
import Logout from "./Logout";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";

function Account() {
  const [price, setPrice] = useState("₹0.00");

  useEffect(() => {
    // Get price from localStorage
    const storedPrice = localStorage.getItem("walletBalance");

    if (storedPrice) {
      setPrice(`₹${parseFloat(storedPrice).toFixed(2)}`);
    }
  }, []);

  return (
    <div className="bg-gray-900 max-w-md mx-auto min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="h-[220px] top-0 rounded-b-[15%] bg-gradient-to-r from-[#FF9A02] to-[#E67302]">
          <UserInfo />
          <BankInfo price={price} />
        </div>
        <div className="mt-4">
          <Link to="/user/account/VoultBox">
            <Voult />
          </Link>
          <History />
          <SettingOption />
          <ServiceCenter />
          <Logout />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
