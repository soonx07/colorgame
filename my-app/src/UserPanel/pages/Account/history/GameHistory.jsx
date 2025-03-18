import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import BackButton from "../../../component/CommonComp/BackButton";
import lottery from "../../../assets/tab-images/lottery.png"
import Casino from "../../../assets/tab-images/casino.png";
import fishing from "../../../assets/tab-images/fishing.png"
import rummy from "../../../assets/tab-images/popular.png"
import original from "../../../assets/tab-images/minigames.png"
import slot from "../../../assets/tab-images/slots.png"
import NoData from "../../../component/CommonComp/NoData";


function GameHistory() {
  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const buttons = [
    { id: 1, name: "Lottery" , image: lottery },
    { id: 2, name: "Casino" , image: Casino },
    { id: 3, name: "Fishing", image: fishing },
    { id: 4, name: "Rummy" , image: rummy },
    { id: 5, name: "Original", image: original },
    { id: 6, name: "Slots", image: slot }
  ];
  return (
    <>
      <nav className="bg-white border-gray-200 ">
        <div className=" grid grid-cols-3 items-center justify-between mx-auto p-2">
          <BackButton />
          <div className="flex  items-center ">
            <a
              href="#"
              className="block text-lg whitespace-nowrap ms-4  md:p-0 text-dark "
              aria-current="page"
            >
              Bet History
            </a>
          </div>
          <div className="flex  items-center "></div>
        </div>
      </nav>
      <div className="px-2 py-2">
        <div className="flex overflow-x-scroll gap-2">
          {buttons.map((button) => (
            <button
              key={button.id}
              type="button"
              onClick={() => setOpenTab(button.id)}
              className="px-5 min-w-max  py-2 text-base font-medium text-center   items-center text-dark bg-white rounded-lg "
            >
              <div className="flex justify-center">
                <img src={button.image} className="w-8" alt="" />
              </div>
              <h5 className="leading-none">{button.name}</h5>
            </button>
          ))}
        </div>
        {buttons.map((button) => (
          <div
            key={button.id}
            className={`${
              openTab === button.id
                ? "block animate-fade-up animate-ease-out"
                : "hidden"
            }`}
          >
            <div className="flex gap-2 my-3">
              <button
                type="button"
                onClick={toggleModal}
                className="text-dark justify-between w-full bg-white  font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="text-dark justify-between w-full bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Choose a date
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
            <NoData />
          </div>
        ))}
        <Modal show={showModal} onClose={toggleModal} />
      </div>
    </>
  );
}

export default GameHistory;
