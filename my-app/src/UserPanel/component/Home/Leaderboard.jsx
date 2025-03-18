import React from 'react';
import slots from "../../assets/tab-images/slots.png";
import LeaderboardPodium from './LeaderboardPodium';

function Leaderboard() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl shadow-2xl p-4 mx-auto relative">
      {/* Title Header */}
      <div className="flex items-center mb-4 bg-gray-800/30 p-2 rounded-lg border-l-4 border-amber-500">
        <div className="flex-shrink-0 bg-amber-500 p-1 rounded-full">
          <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
          </svg>
        </div>
        <div className="flex-1 ms-4">
          <p className="text-base font-bold text-amber-400">Leaderboard Champions</p>
        </div>
      </div>

      {/* Winners Podium */}
     <LeaderboardPodium />

      {/* Other Players List - Styled Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700/30 mb-2">
        <p className="text-amber-400 text-sm font-bold mb-2 px-2">Top Challengers</p>

        {/* List of Other Players */}
        <div className="space-y-2">
          {[4, 5, 6, 7, 8].map((position) => (
            <div 
              key={position}
              className="flex items-center justify-between p-2 bg-gray-800/90 rounded-lg border border-gray-700 transform transition-all duration-300 hover:scale-101 hover:bg-gray-800/70 hover:border-amber-600/30"
            >
              {/* Position & Player Avatar */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 text-amber-400 font-bold text-sm">
                  {position}
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    className="w-10 h-10 rounded-full border border-gray-700 shadow-md"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Player Avatar"
                  />
                  <div>
                    <h6 className="text-gray-200 font-medium text-sm">Player{position}</h6>
                  </div>
                </div>
              </div>

              {/* Game Type */}
              <div className="flex-shrink-0">
                <div className="p-1 rounded-lg shadow-md bg-gradient-to-t from-amber-600/40 to-amber-400/40 backdrop-blur-sm border border-amber-500/30">
                  <img
                    className="w-8 h-8"
                    src={slots}
                    alt="Game Type"
                  />
                </div>
              </div>

              {/* Winnings */}
              <div className="flex flex-col items-end">
                <div className="text-amber-400 text-xs font-bold">
                  ₹{(18456302 - position * 1500000).toLocaleString()}
                </div>
                <div className="text-gray-400 text-xs">
                  {position + 5} wins
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 rounded-full text-sm font-bold shadow-lg shadow-amber-500/30 hover:from-amber-600 hover:to-amber-400 transform transition-all duration-300 hover:scale-105">
          View All Players
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;