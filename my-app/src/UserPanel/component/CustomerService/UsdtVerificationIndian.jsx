import React, { useState } from "react";
import { FiPaperclip, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const UsdtVerificationIndian = () => {
  const [formData, setFormData] = useState({
    cryptoExchangePlatform: "",
    walletAddressType: "",
   
  });
  
  const [images, setImages] = useState({
    adharCard: null,
    passbook: null,
    depositReceiptProof1: null,
    depositReceiptProof2: null,
    usdtAddressMpride: null,
    newUsdtAddress: null,
    mPrideGameId: null
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

    // Basic validation
    if (!formData.cryptoExchangePlatform.trim()) {
      setError("Please enter crypto exchange platform name");
      return;
    }
    
    if (!formData.walletAddressType.trim()) {
      setError("Please enter wallet address type");
      return;
    }
    
    // More validations could be added for other fields
    
    // If validation passes, show success message
    setSuccess(true);

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        cryptoExchangePlatform: "",
        walletAddressType: "",
        
      });
      setImages({
        adharCard: null,
        passbook: null,
        depositReceiptProof1: null,
        depositReceiptProof2: null,
        usdtAddressMpride: null,
        newUsdtAddress: null,
        mPrideGameId: null
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
        <p className="text-base md:text-lg text-white font-medium tracking-wide">
          USDT Verification (Indian Members)
        </p>
      </header>

      <main className="flex-1 pt-12 pb-4 px-4">
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
            {/* Crypto Exchange Platform */}
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium text-gray-800 mb-1">
                Name of crypto exchange platform<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cryptoExchangePlatform"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Please enter content"
                value={formData.cryptoExchangePlatform}
                onChange={handleInputChange}
              />
            </div>

            {/* Wallet Address Type */}
            <div className="mb-4">
              <label className="block text-sm md:text-base font-medium text-gray-800 mb-1">
                Text type of wallet address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="walletAddressType"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Please enter content"
                value={formData.walletAddressType}
                onChange={handleInputChange}
              />
            </div>

            {/* Photo uploads - First section */}
            {renderImageUpload("newUsdtAddress", "Photo of your new USDT address", true)}
            {renderImageUpload("mPrideGameId", "Screenshot of Majestic Pride ID", true)}
            {renderImageUpload("adharCard", "Photo of Adhar Card", true)}
            {renderImageUpload("passbook", "Photo of Passbook", true)}
            {renderImageUpload("depositReceiptProof1", "Photo of Deposit Receipt Proof 1", true)}
            {renderImageUpload("depositReceiptProof2", "Photo of Deposit Receipt Proof 2", true)}
            {renderImageUpload("usdtAddressMpride", "Photo of your own USDT address bind at M Pride", true)}
            
            
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 btn-gold-ltr text-center text-gray-900 font-semibold text-lg transition duration-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
};

export default UsdtVerificationIndian;