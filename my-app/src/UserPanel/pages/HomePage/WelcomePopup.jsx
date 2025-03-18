import React from "react";

const WelcomePopup = ({ handleLoginConfirm }) => {
  return (
    <div className="fixed max-w-md mx-auto inset-0 bg-black/80  flex items-center justify-center z-50">
      <div className=" bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl w-4/5 max-w-md relative animate-bounce-in overflow-hidden border-2 border-amber-500 shadow-lg shadow-amber-500/50">
        {/* Header with cosmic effect */}
        <div className="bg-gradient-to-r from-indigo-900 via-amber-900 to-indigo-900 px-4 py-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzdGFycyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3N0YXJzKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <h2 className="text-center text-xl font-bold text-white mb-1 relative z-10 uppercase tracking-wider">
            WELCOME HERO
          </h2>
        </div>

        <div className="p-4 text-center text-white">
          {/* Logo/Brand Section */}
          <div className="relative mb-4">
            <div className="absolute -left-6 -right-6 top-0 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            <div className="relative inline-block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-transparent bg-clip-text font-extrabold text-xl px-2 py-2 whitespace-nowrap">
              ⭐ MAJESTIC PRIDE ⭐
            </div>
            <div className="absolute -left-6 -right-6 bottom-1 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

          {/* Official Links Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg px-4 mb-6 border border-amber-500/30 transform transition-all duration-200">
            <div className="flex items-center my-2 text-left">
              <div className="bg-amber-600 rounded-full p-1 mr-3 shadow-md shadow-amber-600/50">
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-amber-300 text-[15px] font-medium">
                Official Website
              </span>
            </div>

            <div className="flex items-center my-2 text-left">
              <div className="bg-amber-600 rounded-full p-1 mr-3 shadow-md shadow-amber-600/50">
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-amber-300 text-[15px] font-medium">
                Official Telegram
              </span>
            </div>

            <div className="flex items-center my-2 text-left">
              <div className="bg-amber-600 rounded-full p-1 mr-3 shadow-md shadow-amber-600/50">
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-amber-300 text-[15px] font-medium">
                Official Customer Service
              </span>
            </div>

            <div className="flex items-center my-2 text-left">
              <div className="bg-amber-600 rounded-full p-1 mr-3 shadow-md shadow-amber-600/50">
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-amber-300 text-[15px] font-medium">
                Special Gold Event
              </span>
            </div>
          </div>

          {/* Features Section */}
          <div className="flex flex-row mb-6">
            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-1 rounded-lg flex-1 mx-1 border border-yellow-500/30">
              <svg
                className="w-6 h-6 mx-auto mb-1 text-yellow-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                  fill="currentColor"
                />
              </svg>
              <div className="text-xs text-center text-gray-300">
                5+ Years Experience
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-1 rounded-lg flex-1 mx-1 border border-yellow-500/30">
              <svg
                className="w-6 h-6 mx-auto mb-1 text-yellow-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                  fill="currentColor"
                />
              </svg>
              <div className="text-xs text-center text-gray-300">
                Professional Games
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-1 rounded-lg flex-1 mx-1 border border-yellow-500/30">
              <svg
                className="w-6 h-6 mx-auto mb-1 text-yellow-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z"
                  fill="currentColor"
                />
              </svg>
              <div className="text-xs text-center text-gray-300">
                VIP Support
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            className="btn-gold-ltr text-gray-700 border-none rounded-full py-2 px-4 font-bold mt-2 w-4/5 cursor-pointer shadow-lg shadow-amber-600/30 transform transition-all duration-200 hover:scale-105 uppercase tracking-wider"
            onClick={handleLoginConfirm}
          >
            Continue
          </button>

          {/* Particles */}
          <div className="absolute bottom-4 left-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="absolute top-16 right-6">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer text-white shadow-lg transition-all duration-200 hover:scale-110 z-20"
          onClick={handleLoginConfirm}
          aria-label="Close popup"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
