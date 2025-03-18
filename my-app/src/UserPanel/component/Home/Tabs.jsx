import lottery from "../../assets/tab-images/lottery.png";
import casino from "../../assets/tab-images/casino.png";
import slots from "../../assets/tab-images/slots.png";
import minigames from "../../assets/tab-images/minigames.png";
import fishing from "../../assets/tab-images/fishing.png";
import pvc from "../../assets/tab-images/pvc.png";
import sports from "../../assets/tab-images/sports.png";
import popular from "../../assets/tab-images/popular.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/UserPanelStyles/userPanelStyle.css"

function Tabs() {
  const [openTab, setOpenTab] = useState(1);
  const navigate = useNavigate();

  const cards = [
    { id: 1, duration: "30s", title: "M Pride 30 s" },
    { id: 2, duration: "1Min", title: "M Pride 1 Min" },
    { id: 3, duration: "3Min", title: "M Pride 3 Min" },
    { id: 4, duration: "5Min", title: "M Pride 5 Min" },
  ];

  const handleCardClick = (tabId) => {
    localStorage.setItem("activeColorGameTab", tabId.toString());
    navigate("/user/game");
  };

  return (
    <div className="p-3 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl shadow-2xl mx-auto mt-3">
      <div className="flex flex-col items-center justify-center">
        {/* Game Categories */}
        <div className="w-full p-2 bg-gray-800/50 backdrop-blur-sm rounded-xl mb-3 shadow-lg border border-gray-700/30">
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 1, name: "Lottery", icon: lottery },
              { id: 2, name: "Slots", icon: slots },
              { id: 3, name: "Sports", icon: sports },
              { id: 4, name: "Casino", icon: casino },
              { id: 5, name: "PVC", icon: pvc },
              { id: 6, name: "Fishing", icon: fishing },
              { id: 7, name: "Mini Games", icon: minigames },
              { id: 8, name: "Popular", icon: popular },
            ].map((tab) => (
              <div
                key={tab.id}
                onClick={() => setOpenTab(tab.id)}
                className="flex flex-col items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full p-2 mb-2 ${
                    openTab === tab.id
                      ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30"
                      : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-md shadow-black/40"
                  } border-2 ${
                    openTab === tab.id ? "border-amber-300" : "border-gray-600"
                  }`}
                >
                  <img
                    src={tab.icon}
                    alt={tab.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span
                  className={`text-[11px] font-bold ${
                    openTab === tab.id ? "text-amber-300" : "text-gray-300"
                  }`}
                >
                  {tab.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full relative">
          {/* Lottery Tab */}
          <div
            id="lottery1"
            className={
              openTab === 1
                ? "block animate-fade-up animate-ease-out"
                : "hidden"
            }
          >
            <div className="flex items-center mb-4 bg-gray-800/30 p-2 rounded-lg border-l-4 border-amber-500">
              <div className="flex-shrink-0 bg-amber-500 p-1 rounded-full">
                <img className="w-8 h-8" src={lottery} alt="Lottery" />
              </div>
              <div className="flex-1 ms-4">
                <p className="text-base font-bold text-amber-400">
                  Lottery Games
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700 shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-amber-600/10"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="relative">
                    <div className="relative overflow-hidden">
                      <img
                        src={lottery}
                        alt="Bingo Card"
                        className="w-full h-[6rem] px-2 py-1 md:px-4 py-1 transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    </div>

                    <div className="p-1 md:p-2">
                      <p className="text-amber-400 text-[13px] font-medium text-center">
                        {card.title}
                      </p>

                      <div className="mt-1 flex justify-center">
                        <button className="px-4 py-1 btn-gold-ltr  rounded-full text-xs font-bold shadow-md shadow-amber-500/30 hover:from-amber-600 hover:to-amber-400 transition-all">
                          Play Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Tabs */}
          {[2, 3, 4, 5, 6, 7, 8].map((tabId) => {
            const tabInfo = [
              null,
              null, // Skip index 0 and 1 (Lottery is handled separately)
              { name: "Slots", icon: slots },
              { name: "Sports", icon: sports },
              { name: "Casino", icon: casino },
              { name: "PVC", icon: pvc },
              { name: "Fishing", icon: fishing },
              { name: "Mini Games", icon: minigames },
              { name: "Popular", icon: popular },
            ][tabId];

            return (
              <div
                key={tabId}
                className={
                  openTab === tabId
                    ? "block animate-fade-up animate-ease-out"
                    : "hidden"
                }
              >
                <div className="flex items-center mb-4 bg-gray-800/30 p-2 rounded-lg border-l-4 border-amber-500">
                  <div className="flex-shrink-0 bg-amber-500 p-1 rounded-full">
                    <img
                      className="w-8 h-8"
                      src={tabInfo.icon}
                      alt={tabInfo.name}
                    />
                  </div>
                  <div className="flex-1 ms-4">
                    <p className="text-base font-bold text-amber-400">
                      {tabInfo.name} Games
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="bg-gray-800/90 rounded-xl overflow-hidden border border-gray-700 shadow-lg transform transition duration-300 hover:scale-105"
                    >
                      <div className="relative overflow-hidden p-2">
                        <img
                          src={tabInfo.icon}
                          alt={tabInfo.name}
                          className="w-full h-auto transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <div className="flex justify-center">
                            <button className="px-2 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 rounded-full text-xs font-bold shadow-md shadow-amber-500/30 hover:from-amber-600 hover:to-amber-400 transition-all">
                              Play 
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tabs;
