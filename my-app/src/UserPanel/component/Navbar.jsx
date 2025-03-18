import { Music, PauseCircle } from "lucide-react";
import mainLogo from "../assets/mainLogo.png";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import bgMusicPath from "../assets/bgMusic.mp3";

function Navbar({ link }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause(); // Pause the audio
    } else {
      audioRef.current.play(); // Play the audio
    }
    setIsMusicPlaying((prev) => !prev); // Toggle play state
  };

  return (
    <header className="px-4 py-1 w-full flex justify-between items-center bg-gray-800 border-b border-gray-700">
      {/* Back button */}
      <Link to={link} className="text-gray-300">
        <IoChevronBack size={24} />
      </Link>

      {/* Logo */}
      <img src={mainLogo} alt="Logo" className="w-[10rem] h-[4rem]" />

      {/* Background Music Play/Pause Icon */}
      <button
        onClick={toggleMusic}
        className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl"
      >
        {isMusicPlaying ? (
          <PauseCircle className="w-5 h-5 text-slate-900" />
        ) : (
          <Music className="w-5 h-5 text-slate-900" />
        )}
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} src={bgMusicPath} loop />
    </header>
  );
}

export default Navbar;
