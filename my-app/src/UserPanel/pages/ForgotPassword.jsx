import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaQuestionCircle,
  FaHeadset,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../assets/mainLogo.png"
import "../assets/UserPanelStyles/userPanelStyle.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("phone"); // "phone" or "email"
  const [step, setStep] = useState(1); // 1: enter phone/email, 2: verify code, 3: reset password
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState("");

  // Toast notification state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success, error, info
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

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
        [name]: value,
      });
    }
  };

  // For countdown timer after requesting verification code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Generate a random 6-digit verification code
  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    // Auto hide toast after 5 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const validateStep1 = () => {
    let tempErrors = {};

    if (activeTab === "phone") {
      if (!formData.phone) tempErrors.phone = "Phone number is required";
    } else {
      if (!formData.email) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        tempErrors.email = "Email is invalid";
    }

    return tempErrors;
  };

  const validateStep2 = () => {
    let tempErrors = {};

    if (!formData.verificationCode) {
      tempErrors.verificationCode = "Verification code is required";
    } else if (formData.verificationCode.length !== 6) {
      tempErrors.verificationCode = "Verification code must be 6 digits";
    } else if (formData.verificationCode !== generatedCode) {
      tempErrors.verificationCode = "Invalid verification code";
    }

    return tempErrors;
  };

  const validateStep3 = () => {
    let tempErrors = {};

    if (!formData.newPassword) {
      tempErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      tempErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    return tempErrors;
  };

  const handleRequestCode = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Check if user exists
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
        return;
      }

      // Generate verification code
      const code = generateVerificationCode();
      console.log("Generated verification code:", code);

      // Show toast with verification code
      showToast(`Verification code: ${code}`, "info");

      setCountdown(60); // 60 seconds countdown for resend
      setStep(2);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      showToast("Code verified successfully", "success");
      setStep(3);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const validationErrors = validateStep3();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      showToast("Resetting your password...", "info");
      setIsSubmitting(true);
    }
  };

  const handleResendCode = () => {
    // Generate a new code
    const code = generateVerificationCode();
    console.log("Resent verification code:", code);

    // Show toast with new verification code
    showToast(`New verification code: ${code}`, "info");

    setCountdown(60);
  };

  useEffect(() => {
    if (isSubmitting) {
      // In a real app, this would be an API call to update the password
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const identifier = activeTab === "phone" ? "phone" : "email";
      const value = activeTab === "phone" ? formData.phone : formData.email;

      const updatedUsers = users.map((user) => {
        if (user[identifier] === value) {
          return { ...user, password: formData.newPassword };
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Short delay to show the toast message before redirecting
      setTimeout(() => {
        // Redirect to login with success message
        navigate("/user/login", {
          state: {
            message:
              "Password reset successful. Please log in with your new password.",
          },
        });
      }, 1500);
    }
  }, [isSubmitting, formData, navigate, activeTab]);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-gray-100 flex flex-col relative">
      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 left-4 z-50 p-3 rounded-lg shadow-lg flex items-center justify-between ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-amber-500"
          }`}
        >
          <div className="flex-1 text-white text-sm">{toast.message}</div>
          <button
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="text-white ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header with back button and title */}
      <header className="px-4 py-2 flex justify-center items-center bg-gray-800 border-b border-gray-700">
        <Link to="/user/login" className="absolute left-4 text-gray-300">
          <IoChevronBack size={24} />
        </Link>
       <img src={mainLogo} alt="Logo" className="w-[10rem] h-[4rem]"/>
       
      </header>

      {/* Main form area */}
      <div className="flex-1 py-4 px-6 flex flex-col">
        {/* Title */}
        <h1 className="text-amber-400 text-lg font-bold text-center mb-2">
          Forgot Password
        </h1>

        <div className="w-full border-t border-amber-400/30 mb-3"></div>

        {/* Step indicator */}
        <div className="flex justify-between mb-6 px-2">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-amber-500 text-gray-900"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              1
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 1 ? "text-amber-400" : "text-gray-500"
              }`}
            >
              Verify
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div
              className={`h-0.5 mb-4 w-full ${
                step >= 2 ? "bg-amber-500" : "bg-gray-700"
              }`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-amber-500 text-gray-900"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              2
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 2 ? "text-amber-400" : "text-gray-500"
              }`}
            >
              Code
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <div
              className={`h-0.5 mb-4 w-full ${
                step >= 3 ? "bg-amber-500" : "bg-gray-700"
              }`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3
                  ? "bg-amber-500 text-gray-900"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              3
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 3 ? "text-amber-400" : "text-gray-500"
              }`}
            >
              Reset
            </span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-[13px] text-gray-400 mb-6 text-center">
          {step === 1 &&
            "Please enter your phone number or email to verify your account."}
          {step === 2 &&
            "Enter the 6-digit verification code sent to your account."}
          {step === 3 && "Create a new password for your account."}
        </p>

        {/* Step 1: Enter Phone/Email */}
        {step === 1 && (
          <>
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

            <form onSubmit={handleRequestCode}>
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-gold-ltr hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium rounded-full py-2 text-base mt-4"
              >
                Get Verification Code
              </button>
            </form>
          </>
        )}

        {/* Step 2: Enter Verification Code */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="mt-4">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-center text-lg tracking-wider rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full p-3"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>
              {errors.verificationCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.verificationCode}
                </p>
              )}
            </div>

            <div className="mb-6 text-center">
              <p className="text-sm text-gray-400 mb-1">
                Didn't receive the code?
              </p>
              {countdown > 0 ? (
                <p className="text-amber-400">Resend code in {countdown}s</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-amber-400 font-medium"
                >
                  Resend Verification Code
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-gold-ltr hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium rounded-full py-2 text-base"
            >
              Verify Code
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full border border-amber-400/30 text-amber-400 font-medium rounded-full py-2 text-base mt-4"
            >
              Back
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-4">
            {/* New Password Field */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLock className="text-amber-500" size={14} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full ps-10 p-3"
                  placeholder="New Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-xl flex items-center text-amber-500"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaLock className="text-amber-500" size={14} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-amber-500 focus:border-amber-500 block w-full ps-10 p-3"
                  placeholder="Confirm Password"
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

            <button
              type="submit"
              className="w-full btn-gold-ltr hover:from-amber-500 hover:to-amber-600 text-gray-900 font-medium rounded-full py-2 text-base"
            >
              Reset Password
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full border border-amber-400/30 text-amber-400 font-medium rounded-full py-2 text-base mt-4"
            >
              Back
            </button>
          </form>
        )}

       
      </div>
    </div>
  );
}

export default ForgotPassword;
