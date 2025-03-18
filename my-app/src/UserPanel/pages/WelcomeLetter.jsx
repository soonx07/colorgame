import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaGift,
  FaTrophy,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { RiSwordFill } from "react-icons/ri";
import { GiSparkles, GiTreasureMap, GiRibbonMedal } from "react-icons/gi";
import mainLogo from "../assets/mainLogo.png";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../assets/UserPanelStyles/userPanelStyle.css";

function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //getting registered user details from localstorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length > 0) {
      setUserData(users[users.length - 1]);
    }
    setLoading(false);
  }, []);

  // Motion values for swipe functionality
  const x = useMotionValue(0);
  const width = useTransform(x, [0, 240], [300, 60]);
  const opacity = useTransform(x, [0, 240], [1, 0]);
  const rotate = useTransform(x, [0, 240], [-90, 0]);
  const dashOffset = useTransform(x, [0, 240], [192, 202]);
  const offsetX = useTransform(x, [0, 240], [0, -3]);
  const offsetY = useTransform(x, [0, 240], [0, 3]);

  // Animate particles
  const [particles, setParticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const particleCount = 30;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 10,
      });
    }

    setParticles(newParticles);
  }, []);

  // Handle drag end and redirect to dashboard
  const handleDragEnd = (event, info) => {
    const finalX = info.offset.x;
    console.log("Final position:", finalX);

    if (finalX >= 240) {
      console.log("Navigating to dashboard");
      navigate("/user/home");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
      

      {/* Main Content */}
      <div className="flex-1 relative z-10 py-4 px-6 flex flex-col">
        {/* Welcome title with animation */}
        <motion.div
          className="flex flex-col items-center mb-6 mt-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={mainLogo} alt="Logo" className="w-[9rem] h-[5rem]" />

          <h1 className="text-amber-400 text-2xl font-bold mb-1">
            Welcome, Warrior!
          </h1>
          <p className="text-gray-400 text-sm text-center max-w-xs">
            Your journey to financial conquest begins now. Prepare for glory!
          </p>
        </motion.div>

        {/* Animated divider */}
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0 mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* User info card */}
        <motion.div
          className="bg-gray-800/80 rounded-2xl p-5 border border-amber-500/20 shadow-lg shadow-amber-500/10 mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-start mb-4">
            <div className="bg-gradient-to-br from-amber-500 to-yellow-300 p-3 rounded-lg">
              <FaUser className="text-gray-900 text-xl" />
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-amber-400 font-bold text-xl mb-1">
                Account Details
              </h2>
              <div className="h-0.5 w-16 bg-amber-500/50 rounded-full mb-2" />
              <p className="text-gray-400 text-xs">
                Keep your details safe, mighty warrior!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {userData?.phone && (
              <div className="flex items-center border-b border-gray-700 pb-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <FaPhoneAlt className="text-amber-400 text-sm" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-400 text-xs">Phone Number</p>
                  <p className="text-gray-100 font-medium">{userData.phone}</p>
                </div>
              </div>
            )}

            {userData?.email && (
              <div className="flex items-center border-b border-gray-700 pb-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-amber-400 text-sm" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-400 text-xs">Email Address</p>
                  <p className="text-gray-100 font-medium">{userData.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center border-b border-gray-700 pb-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <FaLock className="text-amber-400 text-sm" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-gray-400 text-xs">Password</p>
                <div className="flex items-center">
                  <p className="text-gray-100 font-medium">
                    {userData?.password}
                  </p>
                
                </div>
              </div>
            </div>

            {userData?.referralCode && (
              <div className="flex items-center border-b border-gray-700 pb-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <FaGift className="text-amber-400 text-sm" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-400 text-xs">Invite Code</p>
                  <p className="text-gray-100 font-medium">
                    {userData.referralCode}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <FaTrophy className="text-amber-400 text-sm" />
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-xs">Account Type</p>
                <p className="text-gray-100 font-medium">
                  Registered via{" "}
                  {userData?.registrationType === "phone" ? "Phone" : "Email"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits section */}
        <motion.div
          className="bg-gray-800/60 rounded-2xl p-5 border border-amber-500/20 mb-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleOpen}
          >
            <h3 className="text-amber-400 font-bold flex items-center">
              <GiTreasureMap className="mr-2" /> Your Colorful Quest Awaits
            </h3>
            {isOpen ? (
              <FiChevronUp className="text-amber-400" />
            ) : (
              <FiChevronDown className="text-amber-400" />
            )}
          </div>

          {isOpen && (
            <motion.ul
              className="space-y-2 mt-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <li className="flex items-center text-gray-400 text-sm">
                <GiSparkles className="text-amber-400 mr-2 flex-shrink-0" />
                Unlock vibrant color combinations
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <GiSparkles className="text-amber-400 mr-2 flex-shrink-0" />
                Earn rewards with every color level you complete
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <GiSparkles className="text-amber-400 mr-2 flex-shrink-0" />
                Collect exclusive color palettes for your profile
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <GiSparkles className="text-amber-400 mr-2 flex-shrink-0" />
                Compete with friends for the most colorful collections
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <GiSparkles className="text-amber-400 mr-2 flex-shrink-0" />
                Invite players to join and expand your color empire
              </li>
            </motion.ul>
          )}
        </motion.div>

        {/* Swipe Button */}
        <motion.div
          className="flex justify-center mt-auto mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="relative w-full max-w-sm h-14 bg-gray-800/90 rounded-full border border-amber-500/30 shadow-lg shadow-amber-500/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                style={{ opacity }}
                className="text-gray-300 font-medium z-10"
              >
                Swipe to Begin Adventure
              </motion.div>
            </div>

            <motion.div
              className="absolute left-0 top-0 bottom-0 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full cursor-grab active:cursor-grabbing z-20"
              drag="x"
              dragConstraints={{ left: 0, right: 240 }}
              style={{ x }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.1 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                style={{ rotate: 360 }}
                className="text-gray-900"
              >
                <motion.path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>

            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500/20 to-amber-400/10"
              style={{ width: "400px" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WelcomePage;
