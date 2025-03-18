import React from 'react';
import stage from "../../assets/winner/stage.png";
import crown1 from "../../assets/winner/crown1.png";
import crown2 from "../../assets/winner/crown2.png";
import crown3 from "../../assets/winner/crown3.png";
import avatar1 from "../../assets/winner/1.png";
import avatar2 from "../../assets/winner/2.png";
import avatar3 from "../../assets/winner/3.png";
import place1 from "../../assets/winner/place1.png";
import place2 from "../../assets/winner/place2.png";
import place3 from "../../assets/winner/place3.png";

function LeaderboardPodium() {
  return (
    <div className="relative mx-auto mb-8 max-w-full mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent rounded-xl"></div>
      
      {/* Stage image container */}
      <div className="relative">
        <img src={stage} alt="stage" className="w-full object-contain" />
        
        {/* Winners container - positioned relative to stage */}
        <div className="absolute bottom-0 inset-x-0 flex justify-between px-2  pb-4 sm:pb-6 md:pb-8 ">
          {/* Silver - 2nd Place */}
          <div className="flex flex-col items-center justify-end w-1/3">
            <div className="relative flex flex-col items-center">
              {/* Crown */}
              <div className="absolute -top-5 md:top-[-26px] -left-2 sm:-top-8 md:-top-10 z-10">
                <img src={crown2} alt="Silver Crown" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-pulse" />
              </div>
              
              {/* Avatar with glow */}
              <div className="relative mt-2 sm:mt-3 md:mt-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 blur-sm -z-10"></div>
                <img
                  src={avatar1}
                  alt="2nd Place Avatar"
                  className="w-12 h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300 shadow-lg shadow-gray-500/50"
                />
              </div>
              
              {/* Place indicator */}
              <div className="mt-1">
                <img src={place2} alt="2nd Place" className="w-12 h-4 sm:w-8 md:w-10 mx-auto" />
              </div>
            </div>
            
            {/* Name and prize */}
            <div className="text-center mt-1">
              <p className="text-xs sm:text-sm font-bold text-gray-300">Silver King</p>
              <span className="px-2 py-1 mt-1 inline-block bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs rounded-full shadow-inner shadow-white/30 truncate max-w-full">₹23.8M</span>
            </div>
          </div>

          {/* Gold - 1st Place */}
          <div className="flex flex-col items-center justify-end w-1/3">
            <div className="relative flex flex-col items-center">
              {/* Crown */}
              <div className="absolute -top-6 md:top-[-20px] -left-2 sm:-top-10 md:-top-12 z-10">
                <img src={crown1} alt="Gold Crown" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 animate-bounce" />
              </div>
              
              {/* Avatar with glow */}
              <div className="relative mt-2 sm:mt-3 md:mt-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 blur-sm -z-10"></div>
                <img
                  src={avatar2}
                  alt="1st Place Avatar"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-400 shadow-lg shadow-amber-500/50"
                />
              </div>
              
              {/* Place indicator */}
              <div className="mt-1">
                <img src={place1} alt="1st Place" className="w-12 h-4 sm:w-10 md:w-12 mx-auto" />
              </div>
            </div>
            
            {/* Name and prize */}
            <div className="text-center mt-1">
              <p className="text-xs sm:text-sm font-bold text-amber-300">Champion</p>
              <span className="px-2 py-1 mt-1 inline-block bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 text-xs font-bold rounded-full shadow-inner shadow-white/30 truncate max-w-full">₹32.7M</span>
            </div>
          </div>

          {/* Bronze - 3rd Place */}
          <div className="flex flex-col items-center justify-end w-1/3">
            <div className="relative flex flex-col items-center">
              {/* Crown */}
              <div className="absolute -top-5 md:top-[-28px] -left-1 sm:-top-8 md:-top-10 z-10">
                <img src={crown3} alt="Bronze Crown" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-pulse" />
              </div>
              
              {/* Avatar with glow */}
              <div className="relative mt-2 sm:mt-3 md:mt-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 blur-sm -z-10"></div>
                <img
                  src={avatar3}
                  alt="3rd Place Avatar"
                  className="w-12 h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-amber-700 shadow-lg shadow-amber-900/50"
                />
              </div>
              
              {/* Place indicator */}
              <div className="mt-1">
                <img src={place3} alt="3rd Place" className="w-12 h-4 sm:w-8 md:w-10 mx-auto" />
              </div>
            </div>
            
            {/* Name and prize */}
            <div className="text-center mt-1">
              <p className="text-xs sm:text-sm font-bold text-amber-700">Bronze Star</p>
              <span className="px-2 py-1 mt-1 inline-block bg-gradient-to-r from-amber-700 to-amber-900 text-amber-300 text-xs rounded-full shadow-inner shadow-white/10 truncate max-w-full">₹18.4M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPodium;