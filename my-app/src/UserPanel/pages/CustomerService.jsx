import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import mainLogo from "../assets/mainLogo.png";
import supportBannerImg from "../assets/supportBannerImg.jpg";
import { PiBankFill } from "react-icons/pi";
import { MdDomainVerification } from 'react-icons/md';
import "../assets/UserPanelStyles/userPanelStyle.css";

// Reusable components
const SectionHeader = ({ title, subtitle }) => (
  <div className="flex items-center justify-between mb-5">
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    {subtitle && (
      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
        {subtitle}
      </span>
    )}
  </div>
);

const IconBadge = ({ icon, color, className = "", hover = true }) => {
  const gradientColors = {
    blue: "from-blue-600 to-blue-700",
    darkBlue: "from-blue-700 to-blue-800",
    amber: "from-amber-500 to-amber-600",
    green: "from-green-600 to-green-700",
    indigo: "from-indigo-600 to-indigo-700", 
    purple: "from-purple-600 to-purple-700",
    red: "from-red-600 to-red-700"
  };

  return (
    <div className={`bg-gradient-to-br ${gradientColors[color]} w-8 h-8 rounded-xl flex items-center justify-center mr-5 shadow-md ${hover ? 'group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105' : ''} ${className}`}>
      <span className="text-white text-xl">{icon}</span>
    </div>
  );
};

const ServiceOption = ({ icon, iconColor, title, description, hoverColor = "blue", link = "#" }) => {
  const hoverBgColor = `hover:bg-${hoverColor}-50`;
  const textColor = `text-${iconColor}-500`;
  
  return (
    <div className="border-b border-gray-100">
      <Link to={link} className={`flex items-center p-2 ${hoverBgColor} transition-colors cursor-pointer group`}>
        <IconBadge icon={icon} color={iconColor} />
        <div className="flex-grow">
          <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
        <div className={`${textColor} transform transition-transform duration-300 group-hover:translate-x-1`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </Link>
    </div>
  );
};

const ServiceCard = ({ children }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4 transition-all duration-300 hover:shadow-xl border border-gray-100">
    {children}
  </div>
);

const FooterButton = ({ icon, text, primary = true }) => {
  const bgColor = primary 
    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
    : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black";
    
  return (
    <button className={`${bgColor} text-white text-sm md:text-xs font-medium flex-grow py-3 px-6 md:px-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center`}>
      {icon}
      {text}
    </button>
  );
};

const CustomerService = () => {
  // Support options configuration
  const selfServiceOptions = [
    {
      icon: "⚠️",
      iconColor: "blue",
      title: "Game Problems",
      description: "Report issues with gameplay or technical difficulties",
      link: "/user/support/game-problem"
    },
    {
      icon: <span className="text-xs text-white font-medium">Bonus</span>,
      iconColor: "amber",
      title: "M Pride 1 Min Win Streak Bonus",
      description: "Claim your special promotion rewards",
      link: "/user/support/mpride-bonus"
    },
    {
      icon: <span className="text-xs text-white font-medium">Bonus</span>,
      iconColor: "amber",
      title: "Aviator Lucky Bonus",
      description: "Check eligibility and claim your rewards",
      link: "/user/support/aviator-bonus"
    },
    {
      icon: "✈️",
      iconColor: "darkBlue",
      title: "[Majestic Pride] Official Channel",
      description: "Connect with our official support team",
      link: "/majestic-pride-channel"
    },
    {
      icon: "©️",
      iconColor: "darkBlue",
      title: "Verify Majestic Pride Link",
      description: "Ensure you're using official websites and apps",
      link: "/verify-link"
    }
  ];

  const paymentOptions = [
    {
      icon: "💰",
      iconColor: "green",
      title: "Deposit Not Received",
      description: "Track and resolve missing deposits",
      link: "/user/support/recharge-history"
    },
    {
      icon: <span className="text-xs text-white font-bold">IFSC</span>,
      iconColor: "darkBlue",
      title: "IFSC Modification",
      description: "Update your bank details for transactions",
      link: "/user/support/ifsc-modify"
    },
    {
      icon: "🏦",
      iconColor: "indigo",
      title: "Manage Withdrawal Bank Accounts",
      description: "Delete withdraw bank account & Rebind",
      link: "/user/support/delete-withdraw-account"
    },
    {
      icon: "🏦",
      iconColor: "purple",
      title: "Withdrawal Problems",
      description: "Resolve issues with your withdrawal requests",
      link: "/user/support/withdrawal-problems"
    },
    {
      icon: "🔑",
      iconColor: "red",
      title: "Change Login Password",
      description: "Update your account credentials securely",
      link: "/user/support/change-password"
    },
    {
      icon: <PiBankFill className='text-white'/>,
      iconColor: "blue",
      title: "Change Bank Name",
      link: "/user/support/bank-modify"
    },
    {
      icon: <MdDomainVerification className='text-amber-200'/>,
      iconColor: "red",
      title: "USDT Verification (Indian Members)",
      link: "/user/support/usdt-verify-indian"
    },
    {
      icon: <MdDomainVerification className='text-white'/>,
      iconColor: "red",
      title: "USDT Verification (Non Indian Members)",
      link: "/user/support/usdt-verify-non-indian"
    },
    {
        icon: <MdDomainVerification className='text-white'/>,
        iconColor: "red",
        title: "Delete old USDT Address and Rebind",
        link: "/user/support/delete-old-usdt-address"
      },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50">
      {/* Enhanced subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-gray-50" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.02) 1px, transparent 1px), radial-gradient(circle, rgba(0, 0, 0, 0.02) 1px, transparent 1px)',
        backgroundSize: '20px 20px, 40px 40px',
        backgroundPosition: '0 0, 20px 20px',
        zIndex: -1
      }}></div>
      
      {/* Modern header with logo and brand */}
      <header className="px-4 py-2 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50">
        <Link to="/user/login" className="absolute left-5 text-gray-300 hover:text-white transition-colors">
          <IoChevronBack size={24} />
        </Link>
        <p className='text-xl text-white font-medium tracking-wide'>Self Service Center</p>
      </header>
      
      {/* Enhanced welcome banner with animation */}
      <div className="pt-11">
        <img src={supportBannerImg} alt="Support Banner" />
      </div>
      
      {/* Main content area */}
      <div className="max-w-4xl mx-auto w-full px-3 py-4 flex-grow">
        {/* Self Service Options */}
        <SectionHeader title="Self Service Options" subtitle="Select an option" />
        
        <ServiceCard>
          {selfServiceOptions.map((option, index) => (
            <ServiceOption 
              key={index}
              icon={option.icon}
              iconColor={option.iconColor}
              title={option.title}
              description={option.description}
              link={option.link}
              hoverColor={option.hoverColor}
            />
          ))}
        </ServiceCard>
        
        {/* Payment and account section */}
        <div className="mb-5 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <span className="bg-blue-100 text-blue-700 p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            Payments & Account Security
          </h3>
        </div>
        
        <ServiceCard>
          {paymentOptions.map((option, index) => (
            <ServiceOption 
              key={index}
              icon={option.icon}
              iconColor={option.iconColor}
              title={option.title}
              description={option.description}
              link={option.link}
            />
          ))}
        </ServiceCard>
      </div>
      
      {/* Enhanced footer with tips and action buttons */}
      <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-2 mb-6 shadow-sm">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Customer Support Tips
            </h4>
            <ul className="text-xs text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                <span>Select the relevant query category that best matches your issue for fastest resolution.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                <span>After submitting your request, track its progress in the "Question in Progress" section.</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <FooterButton 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 md:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              } 
              text="Check Request Progress" 
            />
            <FooterButton 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 md:mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              } 
              text="Contact Live Support" 
              primary={false} 
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerService;
