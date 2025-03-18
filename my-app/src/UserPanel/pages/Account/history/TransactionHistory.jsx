import React from "react";
import { useState } from "react";
import NoData from "../../../component/CommonComp/NoData";
import BackButton from "../../../component/CommonComp/BackButton";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function TransactionHistory() {
  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const buttons = [
    { id: 1, name: "All" },
    { id: 2, name: "UPI x QR" },
    { id: 3, name: "UPI x APPS" },
    { id: 4, name: "UPI x PAYTM" },
    { id: 5, name: "Bank Card" },
    { id: 6, name: "USDT" },
    { id: 7, name: "TRX" }
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
              Transaction History 
            </a>
          </div>
          <div className="flex  items-center "> </div>
        </div>
      </nav>
      <div className="px-2 py-2">
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
        <Modal show={showModal} onClose={toggleModal} />
      </div>
    </>
  );
}

export default TransactionHistory;
