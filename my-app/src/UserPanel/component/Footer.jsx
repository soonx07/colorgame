import { Link, useLocation } from "react-router-dom";
import { FaHome, FaWallet, FaUser, FaRegCompass, FaListUl } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";

function Footer() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const tabs = [
    { path: "/user/home", icon: <FaHome />, label: "Home" },
    { path: "/user/activity", icon: <FaListUl />, label: "Activity" },
    { path: "/user/promotion-link", icon: <FaRegCompass />, label: "Promotions" },
    { path: "/user/wallet", icon: <FaWallet />, label: "Wallet" },
    { path: "/user/account", icon: <FaUser />, label: "Account" },
  ];

  const TabLink = ({ path, icon, label }) => (
    <Link
      to={path}
      className={`w-full justify-center flex flex-col items-center text-center  transition-all duration-300 ${
        isActive(path) 
          ? "text-amber-400 translate-y-[-8px]" 
          : "text-gray-400 hover:text-amber-300"
      }`}
    >
      <div className={`relative ${isActive(path) ? "" : ""}`}>
        <div className={`
          flex items-center justify-center
          ${isActive(path) 
            ? "bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30 text-slate-900 p-1 md:p-3 rounded-2xl border-2 border-amber-300" 
            : "bg-slate-800  md:p-3 rounded-xl hover:bg-slate-700 transition-all duration-300"}
        `}>
          <div className={`text-xl ${isActive(path) ? "animate-pulse" : ""}`}>
            {icon}
          </div>
        </div>
        {isActive(path) && (
          <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-8 h-1 bg-amber-400 rounded-full mb-1"></span>
        )}
      </div>
      <span className={`tab block text-xs mt-3 font-bold ${isActive(path) ? "text-amber-400" : ""}`}>
        {label}
      </span>
    </Link>
  );

  return (
    <div className="w-full mt-20">
      <section
        id="bottom-navigation"
        className="block fixed max-w-md mx-auto inset-x-0 bottom-0 z-10 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg "
      >
        <div className="max-w-md mx-auto">
          {/* Decorative top border with glow effect */}
          <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-md shadow-amber-500/50"></div>
          
          {/* Decorative pattern */}
          <div className="h-2 bg-slate-800 opacity-50 flex">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-4 h-1 mx-1 bg-amber-500 opacity-30 rounded-full"></div>
            ))}
          </div>
          
          <div id="tabs" className="flex justify-between px-2 py-1">
            {tabs.map((tab) => (
              <TabLink
                key={tab.path}
                path={tab.path}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;