import "./memberSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slots from "../../assets/tab-images/slots.png";
import { useState, useEffect } from "react";
import Leaderboard from "../Home/Leaderboard";

function MemberSlider() {
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const Member = {
    centerMode: true,
    centerPadding: "0px",
    vertical: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    arrows: false,
    pauseOnHover: false,
    speed: 1500,
    autoplaySpeed: 3000,
  };

  const memberData = [
    {
      id: 1,
      name: "JackPot23",
      image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
      game: slots,
      winAmount: "$1,250",
      gameType: "Slots Pro",
    },
    {
      id: 2,
      name: "LuckyDragon",
      image: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
      game: slots,
      winAmount: "$978",
      gameType: "Mega Spin",
    },
    {
      id: 3,
      name: "CasinoQueen",
      image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      game: slots,
      winAmount: "$2,105",
      gameType: "Gold Rush",
    },
    {
      id: 4,
      name: "BigWinner42",
      image: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
      game: slots,
      winAmount: "$564",
      gameType: "Lucky Spins",
    },
    {
      id: 5,
      name: "VegasKing",
      image: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
      game: slots,
      winAmount: "$3,290",
      gameType: "Royal Flush",
    },
  ];

  return (
    <>
      <div className="p-2 bg-gradient-to-br from-purple-900 via-black to-amber-900 rounded-lg shadow-xl mx-auto mt-2 border-2 border-amber-500/30">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg p-1">
          <h3 className="text-amber-400 text-lg md:text-xl font-bold text-center mb-2 flex items-center justify-center py-2">
            <span className="inline-block w-8 h-1 bg-amber-500 mr-2 rounded"></span>
            🏆 RECENT WINNERS 🏆
            <span className="inline-block w-8 h-1 bg-amber-500 ml-2 rounded"></span>
          </h3>
          
          <Slider className="member-winner-slider" {...Member}>
            {memberData.map((member) => (
              <div 
                key={member.id} 
                className={`flex flex-row justify-between items-center px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-amber-500/40 shadow-lg mx-1  transform transition-all duration-300 ${animateItems ? 'hover:scale-105 hover:shadow-amber-500/50 hover:border-amber-500/60' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full animate-pulse opacity-50"></div>
                    <img
                      className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5 object-cover relative z-10"
                      src={member.image}
                      alt={member.name}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 z-20 animate-pulse"></div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h6 className="text-amber-300 font-bold text-sm">{member.name}</h6>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                      <p className="text-green-400 text-xs font-medium">Online</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-0.5 shadow-lg shadow-amber-500/30 border border-amber-300 flex items-center justify-center animate-bounce">
                      <img
                        className="w-6 h-6 object-contain"
                        src={member.game}
                        alt="Game"
                      />
                    </div>
                  </div>
                  
                  <div className="px-3 py-1 bg-gradient-to-r from-amber-600/30 to-amber-400/30 rounded-lg border border-amber-500/40">
                    <h4 className="text-amber-400 font-bold text-sm">{member.winAmount}</h4>
                  </div>
                  
                  <div className="px-2 py-1 bg-gray-800/80 rounded-lg border border-gray-700">
                    <h4 className="text-gray-300 text-xs font-medium">{member.gameType}</h4>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Leaderboard />
    </>
  );
}

export default MemberSlider;