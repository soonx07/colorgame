import React, { useState, useEffect, useContext } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhoneAlt,
  FaQuestionCircle,
  FaHeadset,
  FaEnvelope,
} from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../assets/mainLogo.png"
import AuthContext from "../../Context/AuthContext";
import "../assets/UserPanelStyles/userPanelStyle.css";

function UserLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("phone"); // "phone" or "email"
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For phone number, only allow digits
    if (name === "phone") {
      // Ensure only numeric characters are allowed for phone number
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (activeTab === "phone") {
      if (!formData.phone) tempErrors.phone = "Phone number is required";
    } else {
      if (!formData.email) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        tempErrors.email = "Email is invalid";
    }

    if (!formData.password) tempErrors.password = "Password is required";

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
        // Call the userLogin function from context
        const success = userLogin({
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            loginType: activeTab,
            rememberMe: formData.rememberMe
        });
        
        if (success) {
            navigate("/user/home");
        } else {
            setErrors({
                [activeTab === "phone" ? "phone" : "email"]: `Invalid credentials`
            });
        }
    }
};

  useEffect(() => {
    if (isSubmitting) {
      // Checks if user exists and password matches
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const identifier = activeTab === "phone" ? "phone" : "email";
      const value = activeTab === "phone" ? formData.phone : formData.email;

      const user = users.find((u) => u[identifier] === value);

      if (!user) {
        setErrors({
          [identifier]: `User with this ${
            activeTab === "phone" ? "phone number" : "email"
          } does not exist`,
        });
        setIsSubmitting(false);
        return;
      }

      if (user.password !== formData.password) {
        setErrors({ password: "Incorrect password" });
        setIsSubmitting(false);
        return;
      }

      // Save to session
      if (formData.rememberMe) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            [identifier]: user[identifier],
            loginType: activeTab,
          })
        );
      } else {
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            [identifier]: user[identifier],
            loginType: activeTab,
          })
        );
      }

      // Navigate to home
      navigate("/user/home");
    }
  }, [isSubmitting, formData, navigate, activeTab]);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-gray-100 flex flex-col relative">
      {/* Header with back button and language selector */}
      <header className="px-4 py-1 flex justify-center items-center bg-gray-800 border-b border-gray-700">
        <Link to="/" className="absolute left-4  text-gray-300">
          <IoChevronBack size={24} />
        </Link>
        <img src={mainLogo} alt="Logo" className="w-[10rem] h-[4rem]"/>
        
      </header>

     

      {/* Main form area */}
      <div className="flex-1 py-4 px-6 flex flex-col">
        {/* Title with icon */}
        <div className="flex flex-row items-center justify-center gap-4 mb-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mb-2">
            <FaUser className="text-gray-900 text-xl" />
          </div>
          <h1 className="text-amber-400 text-lg font-bold">
            Log in to your account
          </h1>
        </div>

        <div className="w-full border-t border-amber-400/30 mb-3"></div>

        {/* Login message */}
        <p className="text-[13px] text-gray-400 mb-8 text-center">
          Please log in with your phone number or email.
          <br />
          If you forget your password, please contact customer service.
        </p>

        {/* Login tabs */}
        <div className="flex border-b border-gray-700 mb-7">
          <button
            className={`flex items-center gap-1 font-medium pb-2 px-4 ${
              activeTab === "phone"
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("phone")}
          >
            <FaPhoneAlt
              className={
                activeTab === "phone" ? "text-amber-500" : "text-gray-500"
              }
              size={14}
            />
            Phone No.
          </button>
          <button
            className={`flex items-center gap-1 font-medium pb-2 px-4 ${
              activeTab === "email"
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("email")}
          >
            <FaEnvelope
              className={
                activeTab === "email" ? "text-amber-500" : "text-gray-500"
              }
              size={14}
            />
            Email
          </button>
        </div>

        {/* Form */}
        <form className="" onSubmit={handleSubmit}>
          {/* Phone Number Field - shown only when phone tab is active */}
          {activeTab === "phone" && (
            <div className="mb-4">
              <div className="flex">
                <button className="bg-gray-800 text-gray-300 px-3 py-3 rounded-l-2xl border border-gray-700 flex items-center">
                  +91 <IoChevronDown className="ml-1" />
                </button>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  } // Allow only numbers
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-r-2xl focus:ring-amber-500 focus:border-amber-500 block w-full p-3"
                  placeholder="Please enter the phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          )}

          {/* Email Field - shown only when email tab is active */}
          {activeTab === "email" && (
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaEnvelope className="text-amber-500" size={14} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full ps-10 p-3"
                  placeholder="Please enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          )}

          {/* Password Field */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaLock className="text-amber-500" size={14} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full ps-10 p-3"
                placeholder="Password"
                autoComplete="on"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-xl flex items-center text-amber-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-3">
            <input
              id="remember"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-amber-500 mr-2"
            />
            <label htmlFor="remember" className="text-sm text-gray-300">
              Remember password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full btn-gold-ltr hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium rounded-full py-2 text-base mt-4"
          >
            Log in
          </button>

          {/* Register Link */}
          <Link to="/">
            <div className="text-center mt-4 border border-amber-400/30 rounded-full p-3">
              <p className="text-sm text-amber-400 font-medium">Register</p>
            </div>
          </Link>

          {/* Help Options */}
          <div className="flex justify-between mt-6 pt-4 ">
            <Link
              to="/user/reset-password"
              className="flex flex-col items-center text-gray-400 hover:text-amber-400"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mb-1">
                <FaQuestionCircle className="h-5 w-5" />
              </div>
              <span className="text-xs">Forgot password</span>
            </Link>

            <Link
              to="/user/support"
              className="flex flex-col items-center text-gray-400 hover:text-amber-400"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mb-1">
                <FaHeadset className="h-5 w-5" />
              </div>
              <span className="text-xs">Customer Service</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
