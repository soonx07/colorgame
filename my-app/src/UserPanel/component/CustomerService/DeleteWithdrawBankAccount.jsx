import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  FiPaperclip,
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const DeleteWithdrawBankAccount = () => {
  const [formData, setFormData] = useState({
    bankAccountNumber: "",
    bankAccountName: "",
    ifscCode: "",
    issueText: ""
  });
  
  const [images, setImages] = useState({
    depositReceipt: null,
    bankPassbook: null,
    identitySelfie: null,
    issueScreenshot: null
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (type, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages({
          ...images,
          [type]: e.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeImage = (type) => {
    setImages({
      ...images,
      [type]: null
    });
  };

  const handleSubmit = () => {
    // Reset messages
    setError("");
    setSuccess(false);

    // Validate form
    if (!formData.bankAccountNumber.trim()) {
      setError("Please enter your Bank Account Number");
      return;
    }
    
    if (!formData.bankAccountName.trim()) {
      setError("Please enter your Bank Account Name");
      return;
    }
    
    if (!formData.ifscCode.trim()) {
      setError("Please enter your IFSC Code");
      return;
    }
    
    if (!formData.issueText.trim()) {
      setError("Please explain your issue in detail before submitting");
      return;
    }
    
    if (!images.depositReceipt) {
      setError("Please upload your latest deposit receipt");
      return;
    }
    
    if (!images.bankPassbook) {
      setError("Please upload a photo of your bank passbook");
      return;
    }
    
    if (!images.identitySelfie) {
      setError("Please upload a photo of yourself holding your identity card");
      return;
    }

    // If validation passes, show success message
    setSuccess(true);

    // reset form after successful submission
    setTimeout(() => {
      setFormData({
        bankAccountNumber: "",
        bankAccountName: "",
        ifscCode: "",
        issueText: ""
      });
      setImages({
        depositReceipt: null,
        bankPassbook: null,
        identitySelfie: null,
        issueScreenshot: null
      });
      setSuccess(false);
    }, 3000);
  };

  const renderImageUpload = (type, label, required = false) => {
    return (
      <div className="mt-4">
        <h2 className="text-sm md:text-base font-medium text-gray-800 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </h2>
        <div className="mt-2">
          {images[type] ? (
            <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={images[type]}
                alt={label}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => removeImage(type)}
              >
                ×
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-32 h-32 bg-gray-50 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <FiPaperclip className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">photo</span>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleImageChange(type, e)}
                accept="image/*"
              />
            </label>
          )}
        </div>
      </div>
    );
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
        <p className="text-base text-white font-medium tracking-wide">
          Delete Withdraw Bank Account
        </p>
      </header>

      <main className="flex-1 pt-14 pb-4 px-4">
        {success && (
          <div className="mt-4 p-4 text-sm bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
            <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Your request has been successfully submitted. We'll review it shortly.
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 text-sm bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
            <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
            {error}
          </div>
        )}

        <div className="mt-4 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-6">
            {/* Bank Account Number */}
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium text-gray-800 mb-1">
                Bank Account Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankAccountNumber"
                className={`w-full p-3 bg-gray-50 border ${
                  error && !formData.bankAccountNumber.trim()
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="Please enter Bank Card Number"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
              />
              {error && !formData.bankAccountNumber.trim() && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Bank Account Name */}
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium text-gray-800 mb-1">
                Bank Account Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankAccountName"
                className={`w-full p-3 bg-gray-50 border ${
                  error && !formData.bankAccountName.trim()
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="Please enter Bank Card Name"
                value={formData.bankAccountName}
                onChange={handleInputChange}
              />
              {error && !formData.bankAccountName.trim() && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* IFSC Code */}
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium text-gray-800 mb-1">
                IFSC Code<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ifscCode"
                className={`w-full p-3 bg-gray-50 border ${
                  error && !formData.ifscCode.trim()
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="Please enter IFSC"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
              {error && !formData.ifscCode.trim() && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Latest Deposit Receipt */}
            {renderImageUpload("depositReceipt", "Latest Deposit Receipt for proof", true)}

            {/* Photo of Bank Passbook */}
            {renderImageUpload("bankPassbook", "Photo of Bank Passbook", true)}

            {/* Photo Selfie Holding Identity Card */}
            {renderImageUpload("identitySelfie", "Photo Selfie Holding Identity Card", true)}

            {/* Issue Description */}
            <div className="mt-6">
              <h2 className="text-sm md:text-base font-medium text-gray-800 mb-1">
                Explain the issue in detail
                <span className="text-red-500">*</span>
              </h2>

              <div className="mt-2">
                <textarea
                  name="issueText"
                  className={`w-full h-32 p-4 bg-gray-50 border ${
                    error && !formData.issueText.trim()
                      ? "border-red-300 ring-1 ring-red-300 "
                      : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition`}
                  placeholder="Please explain your issue with this bank account"
                  value={formData.issueText}
                  onChange={handleInputChange}
                ></textarea>
                <div className="flex justify-between mt-1">
                  {error && !formData.issueText.trim() && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                  <div className="ml-auto text-sm text-gray-500">
                    {formData.issueText.length}/500
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Screenshot (Optional) */}
            {renderImageUpload("issueScreenshot", "Attach screenshot (optional)")}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3  btn-gold-ltr  text-center text-gray-900 font-semibold text-lg transition duration-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
};

export default DeleteWithdrawBankAccount;