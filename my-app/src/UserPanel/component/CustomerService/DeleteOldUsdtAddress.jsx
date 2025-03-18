import React, { useState } from "react";
import { FiPaperclip, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const DeleteOldUsdtAccount = () => {
  const [images, setImages] = useState({
    identityCard: null,
    depositReceiptProof: null,
    selfieHoldingUsdtAddress: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (type, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages({
          ...images,
          [type]: e.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeImage = (type) => {
    setImages({
      ...images,
      [type]: null,
    });
  };

  const handleSubmit = () => {
    // Reset messages
    setError("");
    setSuccess(false);

    // Basic validation
    if (!images.identityCard) {
      setError("Please upload selfie holding identity card");
      return;
    }

    if (!images.depositReceiptProof) {
      setError("Please upload deposit receipt proof");
      return;
    }

    if (!images.selfieHoldingUsdtAddress) {
      setError("Please upload selfie holding USDT address proof");
      return;
    }

    // If validation passes, show success message
    setSuccess(true);

    // Reset form after successful submission
    setTimeout(() => {
      setImages({
        identityCard: null,
        depositReceiptProof: null,
        selfieHoldingUsdtAddress: null,
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
        <p className="text-lg md:text-lg text-white font-medium tracking-wide">
          Delete Old USDT Address
        </p>
      </header>

      <main className="flex-1 pt-12 pb-4 px-4">
        {success && (
          <div className="mt-4 p-4 text-sm bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
            <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Your request has been successfully submitted. We'll review it
            shortly.
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
            {/* Photo uploads - First section */}
            {renderImageUpload(
              "identityCard",
              "Photo Selfie holding Identity Card",
              true
            )}
            {renderImageUpload(
              "depositReceiptProof",
              "Photo of Deposit Receipt Proof",
              true
            )}
            {renderImageUpload(
              "selfieHoldingUsdtAddress",
              "Photo Selfie holding USDT address",
              true
            )}
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

export default DeleteOldUsdtAccount;
