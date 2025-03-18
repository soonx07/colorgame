import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Notification() {
  const messages = [
    "Please fill in the correct bank card information.",
    "Ensure your card is not expired. Ensure your card is not expired.",
    "Contact support if you continue to experience issues."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Add refs for CSSTransition components
  const nodeRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out effect
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setFade(true); // Start fade in effect
      }, 500); // Wait for the fade-out transition duration
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [messages.length]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-full  flex items-center justify-between gap-1 px-2 py-3 rounded-xl bg-gray-700/10 mb-1">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#c4933f"
            className="w-6 h-6"
          >
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
            <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
          </svg>
        </div>
        <span className={`text-slate-50 text-xs leading-none w-100 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {messages[currentMessageIndex]}
        </span>
        <div className="flex items-center">
          <button
            type="button"
            className="px-3 py-1 rounded-md text-xs font-medium text-center inline-flex items-center text-dark btn-gold-ltr"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_235_37)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.4481 16.0478C20.874 14.8905 21.0547 13.6797 20.9857 12.4515L20.9287 11.4448C20.9182 11.2994 20.7615 11.2118 20.6303 11.2798L19.723 11.7474C19.1553 12.0426 18.4527 12.2279 17.6444 12.2967C17.5904 12.3003 17.5544 12.28 17.5327 12.2627C17.5102 12.2453 17.4832 12.212 17.4809 12.1599C17.4764 12.1128 17.4952 12.0665 17.5297 12.0347C18.6754 10.9773 19.561 9.39667 20.1594 7.33113C20.6588 5.61661 20.6835 3.93176 20.2404 2.32001L19.9157 1.14539C19.8737 0.991232 19.6705 0.948532 19.5647 1.07157L18.7452 2.00518C18.1843 2.64207 17.5957 3.11684 16.9988 3.40922C16.2677 3.76675 15.4871 4.00124 14.675 4.1069C14.1051 4.17928 13.5353 4.19013 12.9751 4.13585C11.6217 4.00269 10.23 4.18145 8.95373 4.64826C7.6655 5.12158 6.4815 5.8967 5.5247 6.89183C4.67963 7.77261 4.03176 8.78656 3.5991 9.91197C3.18294 10.9968 2.98048 12.1374 3.00148 13.299C3.02473 14.4614 3.26542 15.5882 3.72208 16.647C4.19523 17.7442 4.87684 18.7198 5.75115 19.5499C6.62472 20.38 7.63551 21.0126 8.75727 21.4331C9.84229 21.8391 10.9851 22.0302 12.1548 21.9961C13.3231 21.9657 14.4606 21.7132 15.5298 21.2485C16.6396 20.7665 17.6287 20.0775 18.4752 19.1967C19.348 18.2877 20.0132 17.2289 20.4481 16.0478Z"
                  fill="#292929"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_235_37">
                  <rect width="24" height="24" rx="10" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            Detail
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CSSTransition
          nodeRef={nodeRef}
          in={isModalOpen}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div ref={nodeRef} className="fixed max-w-md mx-auto inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-xs">
            <CSSTransition
              nodeRef={backdropRef}
              in={isModalOpen}
              timeout={300}
              classNames="backdrop"
              unmountOnExit
            >
              <div ref={backdropRef} className="gradient-top-left rounded-lg w-96 p-6 shadow-lg m-6">
                <div className='flex flex-row justify-between items-center mb-4'>
                  <h2 className="text-xl font-semibold text-gray-800">Message Details</h2>
                  <button
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                    onClick={closeModal}
                  >
                    <X />
                  </button>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {messages.map((message, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-4 h-4 mr-2 mt-1"
                      >
                        <path
                          fill="currentColor"
                          d="M2 12l5 5L20 6"
                        />
                      </svg>
                      <span className='text-sm'>{message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}

export default Notification;