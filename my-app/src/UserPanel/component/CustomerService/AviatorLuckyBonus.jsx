import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const AviatorLuckyBonus = () => {
  const [mprideId, setMprideId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    // Reset messages
    setError("");
    setSuccess(false);

    // Validate form
    if (!mprideId.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    // If validation passes, show success message
    setSuccess(true);

    // reset form after successful submission
    setTimeout(() => {
      setMprideId("");
      setSuccess(false);
    }, 3000);
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
        <p className="text-lg text-white font-medium tracking-wide">
          Aviator Lucky Bonus
        </p>
      </header>

      <main className="flex-1 pt-10 pb-4 px-4">
        {success && (
          <div className="mt-4 p-3 text-sm bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
            <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Your bank name modification request has been successfully submitted.
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 text-sm bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
            <FiAlertCircle className="w-5 h-5 mr-2 text-red-600" />
            {error}
          </div>
        )}

        <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-6 space-y-6">
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                Majestic Pride ID<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 bg-gray-50 border ${
                  error && !mprideId.trim()
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="Please enter user ID"
                value={mprideId}
                onChange={(e) => {
                  setMprideId(e.target.value);
                  if (e.target.value.trim()) setError("");
                }}
              />
              {error && !mprideId.trim() && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 btn-gold-ltr  text-center text-gray-900 font-semibold text-lg transition duration-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
};

export default AviatorLuckyBonus;
