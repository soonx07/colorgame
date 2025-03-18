import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.css"; // Import the transition styles

const Modal = ({ show, onClose }) => {
  return (
    <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-end  max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3
                className="text-md font-semibold text-gray-400 "
                onClick={onClose}
              >
                Cancel
              </h3>
              <button
                type="button"
                className="font-medium text-orange-500 "
                onClick={onClose}
              >
                <span className="text-md">Confirm</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
