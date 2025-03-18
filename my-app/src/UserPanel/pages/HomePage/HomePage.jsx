import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import banner1 from "../../assets/Banners/banner1.jpg";
import banner2 from "../../assets/Banners/banner2.png";
import banner3 from "../../assets/Banners/banner3.jpg";
import mainLogo from "../../assets/mainLogo.png";
import Tabs from "../../component/Home/Tabs";
import MemberSlider from "../../component/Home/MemberSlider";
import "../../assets/UserPanelStyles/userPanelStyle.css";
import Footer from "../../component/Footer";
import WelcomePopup from "./WelcomePopup";
import DepositBonusPopup from "./DepositBonusPopup";
import { MdNotificationsActive } from "react-icons/md";
import Notification from "../../component/dashboard/Notification";

function HomePage() {
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const [noReminders, setNoReminders] = useState(false);

  // Updated slider settings
  const banners = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  const handleLoginConfirm = () => {
    setShowLoginPopup(false);
    setShowDepositPopup(true);
  };

  const handleDepositClick = (amount) => {
    console.log(`Deposit ${amount} clicked`);
  };

  const handleActivityClick = () => {
    setShowDepositPopup(false);
  };

  const handleCloseDepositPopup = () => {
    setShowDepositPopup(false);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Global styles needed for animations - kept minimal */}
      <style>
        {`

 #root {
            overflow: hidden;
            background-color: #1e2530;
            padding-right: 0 !important;
            max-width: 450px;
            width: 100%;
            margin: 0 auto;
          }
          
          .gradient-top-left {
            background: rgb(196,147,63);
            background: linear-gradient(156deg, rgba(196,147,63,1) 19%, rgba(250,229,159,1) 45%);
          }
          
          .btn-gold-ltr {
            background: rgb(196,147,63);
            background: linear-gradient(270deg, rgba(196,147,63,1) 19%, rgba(250,229,159,1) 45%);
          }
          
          .gradient-top-btm {
            background: rgb(196,147,63);
            background: linear-gradient(0deg, rgba(196,147,63,1) 22%, rgba(250,229,159,1) 72%);
          }

          .gradient-btm-top {
            background: rgb(196,147,63);
            background: linear-gradient(0deg, rgba(250,229,159,1) 22%, rgba(196,147,63,1) 72%);
          }
          
          .theme1 {
            color: rgb(196,147,63);
          }

          .transition-opacity {
            transition: opacity 0.5s ease-in-out;
          }
          
          .opacity-0 {
            opacity: 0;
          }
          
          .opacity-100 {
            opacity: 1;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }


          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(250, 229, 159, 0.5); }
            50% { box-shadow: 0 0 20px rgba(196, 147, 63, 0.8); }
            100% { box-shadow: 0 0 5px rgba(250, 229, 159, 0.5); }
          }
          
          .banner-glow:hover {
            animation: glow 2s infinite;
          }
          
          @keyframes slideIn {
            from { transform: translateX(10%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          .slick-active {
            animation: slideIn 0.5s forwards;
          }
          
          .slick-slide {
            padding: 10px;
            transform: scale(0.95);
            transition: transform 0.4s ease-in-out;
          }
          
          .slick-active {
            transform: scale(1);
            z-index: 2;
          }
          
          /* Custom arrow and dot styling */
          .slick-prev, .slick-next {
            z-index: 10 !important;
            background-color: rgba(196, 147, 63, 0.7) !important;
            width: 32px !important;
            height: 32px !important;
            border-radius: 50% !important;
            transition: all 0.3s ease !important;
          }
          
          .slick-prev:hover, .slick-next:hover {
            background-color: rgba(250, 229, 159, 0.9) !important;
           
          }
          
          .slick-prev {
            left: 1px !important;
          }
          
          .slick-next {
            right: 1px !important;
          }
          
          
        `}
      </style>

      {/* Header with Tailwind */}
      <header className="fixed max-w-md mx-auto top-0 left-0 right-0 z-50 py-1 px-6 flex justify-between items-center bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b-4 border-amber-500 shadow-xl transform transition-all duration-300 ">
        <img
          src={mainLogo}
          alt="Logo"
          className="w-48 h-16 transform transition-transform duration-500 "
        />
        <div className="relative">
          <MdNotificationsActive className="text-white text-3xl cursor-pointer ml-6 hover:text-amber-400 hover:scale-125 transform transition-all duration-300" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
        </div>
      </header>

      {/* Main content with Tailwind */}
      <div className="pt-22">
        {/* Banner Slider with Tailwind */}
        <div className="mx-4 mb-5">
          <Slider
            className="rounded-xl overflow-hidden shadow-2xl shadow-md shadow-amber-500"
            {...banners}
          >
            {/* Banner 1 */}
            <div className="relative">
              <div className=" relative">
                <img
                  src={banner1}
                  alt="Banner 1"
                  className="rounded-lg border-3 border-amber-600 shadow-lg w-full h-auto max-h-68 object-cover transition-transform duration-300 transform hover:scale-102 banner-glow"
                />
              </div>
            </div>

            {/* Banner 2 */}
            <div className="relative">
              <div className=" relative">
                <img
                  src={banner2}
                  alt="Banner 2"
                  className="rounded-lg border-3 border-amber-600 shadow-lg w-full h-auto max-h-68 object-cover transition-transform duration-300 transform hover:scale-102 banner-glow"
                />
              </div>
            </div>

            {/* Banner 3 */}
            <div className="relative">
              <div className=" relative">
                <img
                  src={banner3}
                  alt="Banner 3"
                  className="rounded-lg border-3 border-amber-600 shadow-lg w-full h-auto max-h-68 object-cover transition-transform duration-300 transform hover:scale-102 banner-glow"
                />
              </div>
            </div>
          </Slider>
        </div>
        <div className="px-3">
          <Notification />
        </div>

        <Tabs />
        <MemberSlider />
        <Footer />
      </div>

      {/* Login Welcome Popup */}
      {showLoginPopup && (
        <WelcomePopup handleLoginConfirm={handleLoginConfirm} />
      )}

      {/* First Deposit Bonus Popup */}
      {showDepositPopup && (
        <DepositBonusPopup
          handleDepositClick={handleDepositClick}
          handleActivityClick={handleActivityClick}
          handleCloseDepositPopup={handleCloseDepositPopup}
        />
      )}
    </div>
  );
}

export default HomePage;
