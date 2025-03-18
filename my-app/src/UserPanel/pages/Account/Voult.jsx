import React from "react";

function Voult() {
  return (
    <div>
      <div className="px-3 pt-4 ">
        <div className="relative  rounded-xl border border-gray-500 bg-[#1e2530] bg-clip-border text-gray-200">
          <div className="p-3">
            <div className="">
              <div className="flex items-center gap-2 ">
                <svg
                  height="55"
                  viewBox="0 0 64 64"
                  width="55"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_58" data-name="Layer 58">
                    <rect
                      fill="#f39c12"
                      height="8.57"
                      rx="1.5"
                      width="9.46"
                      x="10.5"
                      y="51.71"
                    />
                    <rect
                      fill="#f39c12"
                      height="8.57"
                      rx="1.5"
                      width="9.46"
                      x="44.04"
                      y="51.71"
                    />
                    <rect
                      fill="#f1c40f"
                      height="51"
                      rx="5.64"
                      width="59"
                      x="2.5"
                      y="3.71"
                    />
                    <path
                      d="m52 11.71h-40a1.5 1.5 0 0 0 -1.5 1.5v4.08h-1.71a1.5 1.5 0 1 0 0 3h1.71v17.85h-1.71a1.5 1.5 0 1 0 0 3h1.71v4.07a1.5 1.5 0 0 0 1.5 1.5h40a1.5 1.5 0 0 0 1.5-1.5v-32a1.5 1.5 0 0 0 -1.5-1.5z"
                      fill="#f39c12"
                    />
                    <path
                      d="m32 20.57a8.65 8.65 0 1 0 8.64 8.64 8.65 8.65 0 0 0 -8.64-8.64z"
                      fill="#f1c40f"
                    />
                  </g>
                </svg>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-3 w-full">
                    <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                      Safe
                    </h6>
                    <div className="flex gap-2 items-center">
                      <span className=" text-white text-xs font-medium  px-2.5  rounded-full bg-[#FEAA57]  ">
                        ₹0.00
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className=" text-xs  text-gray-200 antialiased">
                    Daily interest rate 0.1% + VIP extra income safe, calculated
                    every 1 minute
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voult;
