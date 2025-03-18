import React, { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiPaperclip, FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';


const GameProblems = () => {
  const [issueText, setIssueText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = () => {
    // Reset messages
    setError('');
    setSuccess(false);
    
    // Validate form
    if (!issueText.trim()) {
      setError('Please explain your issue in detail before submitting');
      return;
    }
    
    // If validation passes, show success message
    setSuccess(true);
    
    // reset form after successful submission
    setTimeout(() => {
      setIssueText('');
      setImagePreview(null);
      setSuccess(false);
    }, 3000);
  };
  
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50">
      
      <header className="px-4 py-2 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50">
        <Link to="/user/support" className="absolute left-5 text-gray-300 hover:text-white transition-colors">
          <IoChevronBack size={24} />
        </Link>
        <p className='text-xl text-white font-medium tracking-wide'>Game Problems</p>
      </header>
      
      <main className="flex-1 pt-12 pb-4 px-4">
        {success && (
          <div className="mt-4 p-4 text-sm bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
            <FiCheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Your game issue has been successfully submitted. We'll review it shortly.
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
              Explain the issue happen to you inside the game clear and detail<span className="text-red-500">*</span>
            </h2>
            
            <div className="mt-2 mb-6">
              <textarea
                className={`w-full h-32 p-4 bg-gray-50 border ${error && !issueText.trim() ? 'border-red-300 ring-1 ring-red-300 ' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition`}
                placeholder="Please enter content"
                value={issueText}
                onChange={(e) => {
                  setIssueText(e.target.value);
                  if (e.target.value.trim()) setError('');
                }}
              ></textarea>
              <div className="flex justify-between mt-1">
                {error && !issueText.trim() && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
                <div className="ml-auto text-sm text-gray-500">
                  {issueText.length}/500
                </div>
              </div>
            </div>
            
            <h2 className="text-sm md:text-base font-medium text-gray-800 mb-3">
              Attach photo / screenshot issue clearly
            </h2>
            
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => setImagePreview(null)}
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
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
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

export default GameProblems;