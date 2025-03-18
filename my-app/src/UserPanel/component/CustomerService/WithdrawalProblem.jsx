import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const WithdrawalProblem = () => {
  const [problemType, setProblemType] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const renderProblemSelection = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Select your issue:</h2>
      
      {[
        "Withdrawal is taking too long",
        "Withdrawal was rejected",
        "Withdrawal amount is incorrect",
        "Bank account details issue",
        "Other withdrawal problem"
      ].map((problem) => (
        <button
          key={problem}
          onClick={() => setProblemType(problem)}
          className={`w-full p-4 text-left rounded-lg border ${
            problemType === problem
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50"
          } transition-colors`}
        >
          <div className="flex items-center justify-between">
            <span>{problem}</span>
            <div className={`h-5 w-5 rounded-full border ${
              problemType === problem
                ? "border-blue-500 bg-blue-500"
                : "border-gray-300"
            }`}>
              {problemType === problem && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
  
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">Problem: {problemType}</h2>
        <button 
          type="button" 
          onClick={() => setProblemType(null)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Change issue type
        </button>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="transaction" className="block text-sm font-medium text-gray-700">
          Transaction ID (if available)
        </label>
        <input
          type="text"
          id="transaction"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. TX-12345678"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Describe your problem
        </label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Please provide details about your withdrawal issue..."
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Attach screenshots (optional)
        </label>
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
          >
            Upload Files
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: JPEG, PNG, PDF (max 5MB)
          </p>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!description || isSubmitting}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          !description || isSubmitting
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-colors`}
      >
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
  
  const renderSuccess = () => (
    <div className="py-8 text-center space-y-6">
      <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Report Submitted</h2>
        <p className="text-gray-600">
          Your withdrawal issue has been reported. Our support team will review it and get back to you within 24 hours.
        </p>
      </div>
      
      <div className="pt-4">
        <p className="text-sm text-gray-500 mb-3">Support ticket #WD-{Math.floor(Math.random() * 10000)}</p>
        <Link
          to="/user/dashboard"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
  
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
          Withdrawal Problem
        </p>
      </header>

      <main className="flex-1 pt-16 pb-6 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-5">
          {isSubmitted ? (
            renderSuccess()
          ) : problemType ? (
            renderForm()
          ) : (
            renderProblemSelection()
          )}
        </div>
        
        {!isSubmitted && !problemType && (
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium">Help & Resources</h3>
            <p className="text-blue-700 text-sm mt-1">
              Check our <a href="#" className="underline">withdrawal FAQ</a> for common issues and solutions before submitting a report.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WithdrawalProblem;