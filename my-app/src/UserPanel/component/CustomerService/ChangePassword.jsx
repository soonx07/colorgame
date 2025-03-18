import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  // Detect if input is email or phone
  useEffect(() => {
    if (contact) {
      // Simple email regex check
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
        setContactType("email");
      } else {
        setContactType("phone");
      }
    } else {
      setContactType("");
    }
  }, [contact]);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleSendOTP = () => {
    if (!contact) {
      setError("Please enter a valid email or phone number");
      return;
    }
    
    setError("");
    const code = generateVerificationCode();
    setVerificationCode(code);
    setOtpSent(true);
    
    // Show toast with verification code
    showToast(`Your verification code is: ${code}`, "info");
  };

  const handleVerifyOTP = () => {
    if (otp === verificationCode) {
      setOtpVerified(true);
      setError("");
      showToast("Verification successful!", "success");
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleSubmit = () => {
    // Reset messages
    setError("");
    
    // Validate form
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (!otpVerified) {
      setError("Please verify your contact first");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setPasswordChanged(true);
      showToast("Password changed successfully!", "success");
      
      // Reset form after successful submission
      setTimeout(() => {
        setPassword("");
        setContact("");
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setPasswordChanged(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50">
      <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50">
        <Link
          to="/user/support"
          className="absolute left-2 text-gray-300 hover:text-white transition-colors"
        >
          <IoChevronBack size={24} />
        </Link>
        <p className="text-xl text-white font-medium tracking-wide">
          Change Password
        </p>
      </header>

      <main className="flex-1 pt-14 pb-4 px-4">
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-16 left-0 right-0 z-50 mx-auto w-11/12 max-w-md mt-4 p-4 rounded-lg shadow-lg flex items-center 
            ${toast.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : 
              toast.type === "error" ? "bg-red-50 border border-red-200 text-red-800" : 
              "bg-blue-50 border border-blue-200 text-blue-800"}`}>
            {toast.type === "success" ? (
              <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
            ) : toast.type === "error" ? (
              <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
            ) : (
              <FiAlertCircle className="w-5 h-5 mr-2 text-blue-600" />
            )}
            {toast.message}
          </div>
        )}

        {passwordChanged && (
          <div className="mt-4 p-4 text-sm bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
            <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Your password has been successfully changed.
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 text-sm bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
            <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
            {error}
          </div>
        )}
        
        <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-6">
            <h2 className="text-sm md:text-base font-medium text-gray-800 mb-1">
              New Password<span className="text-red-500">*</span>
            </h2>
            
            <div className="mt-2 mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 text-[14px] bg-gray-50 border ${
                  error && (!password || password.length < 6) 
                    ? 'border-red-300 ring-1 ring-red-300' 
                    : 'border-gray-200'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="Please enter a new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length >= 6) setError('');
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
              <div className="flex justify-between mt-1">
                {error && (!password || password.length < 6) ? (
                  <span className="text-sm text-red-500">Password must be at least 6 characters</span>
                ) : (
                  <span className="text-sm text-gray-500">Minimum 6 characters</span>
                )}
                <div className="ml-auto text-sm text-gray-500">
                  {password.length}/20
                </div>
              </div>
            </div>
            
            <h2 className="text-sm md:text-base font-medium text-gray-800 mb-1">
              Register phone number/email to receive OTP<span className="text-red-500">*</span>
            </h2>
            
            <div className="mt-2 mb-6">
              <div className="flex mb-2">
                <input
                  type="text"
                  className={`w-full px-4 py-3 text-[14px] bg-gray-50 border ${
                    error && !contact 
                      ? 'border-red-300 ring-1 ring-red-300' 
                      : 'border-gray-200'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  placeholder="Enter email or phone number"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (e.target.value) setError('');
                  }}
                  disabled={otpVerified}
                />
              </div>
              <div className="flex flex-row items-center justify-between mt-1">

              <div className="flex justify-between ">
                {error && !contact ? (
                  <span className="text-[13px] md:text-sm text-red-500">This field is required</span>
                ) : contactType ? (
                  <span className="text-[12px] md:text-sm text-gray-500">Code sent to your {contactType}</span>
                ) : (
                  <span className="text-[13px] md:text-sm text-gray-500">Enter email or phone number</span>
                )}
              </div>
              
              {!otpVerified && (
                <button
                  type="button"
                  className="text-xs md:text-sm py-1 px-3 md:px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleSendOTP}
                  disabled={!contact || otpSent}
                >
                  {otpSent ? "Code Sent" : "Send Code"}
                </button>
              )}
              </div>
            </div>
            
            {otpSent && !otpVerified && (
              <div className="mb-6">
                <h2 className="text-sm md:text-base font-medium text-gray-800 mb-1">
                  Enter Verification Code<span className="text-red-500">*</span>
                </h2>
                <div className="flex mb-2">
                  <input
                    type="text"
                    className={`w-full text-sm px-4 py-3 bg-gray-50 border ${
                      error && !otp 
                        ? 'border-red-300 ring-1 ring-red-300' 
                        : 'border-gray-200'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="Enter 6-digit verification code"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      if (e.target.value) setError('');
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={handleSendOTP}
                  >
                    Resend Code
                  </button>
                  
                  <button
                    type="button"
                    className="py-1 px-4 text-xs md:text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={handleVerifyOTP}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
            
            {otpVerified && (
              <div className="mb-6 p-3 text-sm bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
                <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Verification successful! You can now change your password.
              </div>
            )}
          </div>
          
          <button 
            onClick={handleSubmit}
            className={`w-full py-4 text-center font-semibold text-lg transition duration-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none ${
              !password || password.length < 6 || !otpVerified
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "btn-gold-ltr text-gray-900"
            }`}
            disabled={!password || password.length < 6 || !otpVerified || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;