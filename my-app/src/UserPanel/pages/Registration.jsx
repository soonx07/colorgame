import React, { useState, useEffect, useContext } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaGift,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../assets/mainLogo.png"
import AuthContext from "../../Context/AuthContext";
import "../assets/UserPanelStyles/userPanelStyle.css";

function Registration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("phone"); // "phone" or "email"
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inviteCodeStatus, setInviteCodeStatus] = useState(null); // null, 'verified', or 'invalid'
  const [isVerifying, setIsVerifying] = useState(false);
  const { userLogin } = useContext(AuthContext);

  // list of valid invite codes
  const validInviteCodes = ["ABC123", "XYZ789", "mpride", "INVITE2024"];

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
    } else if (name === "referralCode") {
      // Handle invite code change with verification
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Reset status when typing
      if (value === "") {
        setInviteCodeStatus(null);
      } else {
        // Simulate verification delay
        setIsVerifying(true);
        setInviteCodeStatus(null);
        
        // Verify code after a short delay
        clearTimeout(window.verifyTimer);
        window.verifyTimer = setTimeout(() => {
          const isValid = validInviteCodes.includes(value);
          setInviteCodeStatus(isValid ? 'verified' : 'invalid');
          setIsVerifying(false);
        }, 600);
      }
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
      else if (!/^\d{10}$/.test(formData.phone))
        tempErrors.phone = "Phone number must be 10 digits";
    } else {
      if (!formData.email) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        tempErrors.email = "Email is invalid";
    }

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    if (!formData.agreedToTerms)
      tempErrors.agreedToTerms = "You must agree to the terms";

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsSubmitting(Object.keys(validationErrors).length === 0);
  };

  useEffect(() => {
    if (isSubmitting) {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const identifier = activeTab === "phone" ? "phone" : "email";
        const value = activeTab === "phone" ? formData.phone : formData.email;

        const userExists = existingUsers.some(
            (user) => user[identifier] === value
        );

        if (userExists) {
            setErrors({
                [identifier]: `User with this ${identifier} already exists`,
            });
            setIsSubmitting(false);
            return;
        }

        // Save new user to localStorage
        const newUser = {
            phone: activeTab === "phone" ? formData.phone : "",
            email: activeTab === "email" ? formData.email : "",
            password: formData.password,
            referralCode: formData.referralCode,
            registrationType: activeTab, // Store which method was used for registration
        };

        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Log the user in automatically after registration
        userLogin({
            [identifier]: value,
            password: formData.password,
            loginType: activeTab,
            rememberMe: true
        });

        // Navigate to welcome page
        navigate("/user/welcome-letter");
    }
  }, [isSubmitting, formData, navigate, activeTab, userLogin]);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-gray-100 flex flex-col">
      {/* Header  */}
      <header className="px-4 py-1 flex justify-center items-center bg-gray-800 border-b border-gray-700">
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
            Register your account
          </h1>
        </div>

        <div className="w-full border-t border-amber-400/30 mb-6"></div>

        {/* Registration tabs */}
        <div className="flex border-b items-center border-gray-700 mb-6">
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Phone Number Field - shown only when phone tab is active */}
          {activeTab === "phone" && (
            <div className="mb-4">
              <label className="flex items-center text-gray-300 mb-2">
                <FaPhoneAlt className="text-amber-400 mr-2" />
                Phone number
              </label>
              <div className="flex">
                <button className="bg-gray-800 text-gray-300 px-3 py-3 rounded-l-2xl border border-gray-700 flex items-center">
                  +91 <IoChevronDown className="ml-1" />
                </button>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
              <label className="flex items-center text-gray-300 mb-2">
                <FaEnvelope className="text-amber-400 mr-2" />
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full p-3"
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
            <label className="flex items-center text-gray-300 mb-2">
              <FaLock className="text-amber-400 mr-2" />
              Set password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full p-3"
                placeholder="Set password"
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

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="flex items-center text-gray-300 mb-2">
              <FaLock className="text-amber-400 mr-2" />
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full p-3"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 text-xl flex items-center text-amber-500"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Invite Code Field - Enhanced with verification */}
          <div className="mb-4">
            <label className="flex items-center text-gray-300 mb-2">
              <FaGift className="text-amber-400 mr-2" />
              Invite code
            </label>
            <div className="relative">
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className={`bg-gray-800 border ${
                  inviteCodeStatus === 'verified' 
                    ? 'border-green-500' 
                    : inviteCodeStatus === 'invalid' 
                      ? 'border-red-500' 
                      : 'border-gray-700'
                } text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full p-3 pr-12`}
                placeholder="Invite code"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                {isVerifying && (
                  <div className="w-5 h-5 border-t-2 border-amber-500 border-solid rounded-full animate-spin"></div>
                )}
                {inviteCodeStatus === 'verified' && (
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 text-lg mr-1" />
                    <span className="text-green-500 text-xs font-medium">Verified</span>
                  </div>
                )}
                {inviteCodeStatus === 'invalid' && (
                  <div className="flex items-center">
                    <FaTimesCircle className="text-red-500 text-lg mr-1" />
                    <span className="text-red-500 text-xs font-medium">Invalid</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center mb-6">
            <input
              id="terms"
              name="agreedToTerms"
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-amber-500 mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I have read and agree{" "}
              <a href="#" className="text-amber-500">
                [Privacy Agreement]
              </a>
            </label>
          </div>
          {errors.agreedToTerms && (
            <p className="mt-1 text-xs text-red-500">{errors.agreedToTerms}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full btn-gold-ltr hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium rounded-full py-2 text-base"
          >
            Register
          </button>

          {/* Login Link */}
          <Link to="/user/login">
            <div className="text-center mt-4 border border-amber-400/30 rounded-full p-3">
              <p className="text-sm text-gray-400">
                I have an account{" "}
                <span className="text-amber-400 font-medium">Login</span>
              </p>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Registration;
