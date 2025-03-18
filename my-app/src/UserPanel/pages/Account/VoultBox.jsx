import React from "react";
import BackButton from "../../component/CommonComp/BackButton";
import Footer from "../../component/Footer";

function VoultBox() {
  return (
    <>
      <div className="h-screen max-w-md mx-auto bg-gray-900">
      
        <header className="px-4 py-3 max-w-md mx-auto flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 ">
          <div className="absolute left-2 text-gray-300 hover:text-white transition-colors">

          <BackButton />
          </div>
          <p className="text-xl text-white font-medium tracking-wide">
            Safe
          </p>
        </header>
        <div className="px-1.5 pt-16">
          <div className="my-3">
            <div className="flex justify-center">
              <span className="bg-white text-red-500 text-xs font-normal  px-7 py-0.5 rounded-full ">
                Interest rate 0.10%
              </span>
            </div>
          </div>
          <div className="w-full bg-gradient-to-r from-orange-400 to-orange-500   rounded-xl shadow ">
            <div className="p-3">
              <div className="flex justify-between flex-col h-20">
                <div className="flex justify-between items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#fff"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg>
                  <span className="border border-white stroke-transparent text-white text-xs font-normal inline-flex gap-1 items-center px-4 py-0.5 rounded-lg ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Financial security
                  </span>
                </div>
                <div className=" items-center">
                  <h5 className="text-2xl font-bold tracking-tight text-white">
                    ₹0.00
                  </h5>
                </div>
                <div className=" items-center">
                  <h5 className="text-xs tracking-tight text-white">
                    24-hour estimated revenue{" "}
                    <span className="font-semibold">₹0.00</span>
                  </h5>
                </div>
              </div>
              <div className="flex gap-2 justify-end leading-none">
                <span className="leading-1 text-white">****</span>
                <span className="leading-1 text-white">****</span>
              </div>
            </div>
          </div>
          <div className="w-full p-1 mt-6 ">
            <div>
              <div className="p-3 pb-0 border rounded-lg mb-4">
                <div className="grid grid-cols-2 divide-x text-center">
                  <div className="flex flex-col justify-between items-center gap-2">
                    <div>
                      <h5 className="text-red-400 text-md">₹0.00</h5>
                    </div>
                    <div>
                      <h5 className="text-gray-500 text-sm">
                        Generated revenue
                      </h5>

                      <span className="border border-gray-400 bg-white text-gray-800 text-xs font-normal py-[1px] px-2 rounded-full ">
                        My Interest rate 0.1%
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-[#ED8A1F]  border border-[#ED8A1F] font-medium rounded-md text-sm w-fit px-4 text-center  "
                    >
                      Transfer Out
                    </button>
                  </div>
                  <div className="flex flex-col justify-between items-center">
                    <div>
                      <h5 className="text-white text-md">₹0.00</h5>
                    </div>
                    <div>
                      <h5 className="text-gray-500 text-sm">
                        Accumulated revenue
                      </h5>
                    </div>
                    <button
                      type="button"
                      className="text-white bg-[#ED8A1F]  font-medium rounded-md text-sm  py-1.5   w-fit px-3"
                    >
                      Transfer In
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <svg
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                  >
                    <path
                      d="M15 27.5C18.4517 27.5 21.5768 26.1009 23.8388 23.8388C26.1009 21.5768 27.5 18.4517 27.5 15C27.5 11.5482 26.1009 8.42325 23.8388 6.16116C21.5768 3.89911 18.4517 2.5 15 2.5C11.5482 2.5 8.42325 3.89911 6.16116 6.16116C3.89911 8.42325 2.5 11.5482 2.5 15C2.5 18.4517 3.89911 21.5768 6.16116 23.8388C8.42325 26.1009 11.5482 27.5 15 27.5Z"
                      stroke="#FE6868"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 23.125C15.8629 23.125 16.5625 22.4254 16.5625 21.5625C16.5625 20.6996 15.8629 20 15 20C14.1371 20 13.4375 20.6996 13.4375 21.5625C13.4375 22.4254 14.1371 23.125 15 23.125Z"
                      fill="#FF7172"
                    ></path>
                    <path
                      d="M15 7.5V17.5"
                      stroke="#FE6868"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>

                  <h5 className="text-[11px] text-red-400 font-medium">
                    Funds are safe and secure, and can be transferred at any
                    time
                  </h5>
                </div>
                <div className="flex mt-3 justify-center items-center gap-1">
                  <span className="text-sm text-gray-500">
                    Learn about safes
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-3 stroke-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex my-3">
                <div className="flex-shrink-0">
                  <svg
                    id="Layer_1"
                    enable-background="new 0 0 512 512"
                    viewBox="0 0 512 512"
                    version="1.1"
                    className="size-6 stroke-gray-500"
                  >
                    <g transform="matrix(1,0,0,1,0,0)">
                      <g>
                        <g>
                          <g>
                            <path
                              d="m411.3 438h-210.7c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h210.7c22.6 0 41.3-17.1 43.7-39.1h-240c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h245.2c2.7 0 4.9 2.2 4.9 4.9-.1 29.7-24.2 53.8-53.8 53.8z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m119.4 316.3c-2.7 0-4.9-2.2-4.9-4.9v-202.6h-59.8c-4.2 0-7.7-3.4-7.7-7.7v-21.5c0-10.3 4-20 11.3-27.3s17-11.3 27.3-11.3c21.3 0 38.6 17.3 38.6 38.6v231.7c.1 2.8-2.1 5-4.8 5zm-62.6-217.3h57.7v-19.4c0-15.9-13-28.9-28.9-28.9-7.7 0-15 3-20.4 8.5-5.5 5.5-8.5 12.7-8.5 20.4v19.4z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m412.9 389.2c-2.7 0-4.9-2.2-4.9-4.9v-281.4c0-28.7-23.4-52.1-52.1-52.1h-270.3c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h270.3c34.1 0 61.9 27.8 61.9 61.9v281.4c0 2.7-2.2 4.9-4.9 4.9z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <g>
                              <path
                                d="m367.3 153.3h-202.3c-4.5 0-8.2-3.7-8.2-8.2v-18.4c0-4.5 3.7-8.2 8.2-8.2h202.3c4.5 0 8.2 3.7 8.2 8.2v18.4c0 4.5-3.7 8.2-8.2 8.2zm-200.7-9.8h199.1v-15.3h-199.1z"
                                fill="#ed8a1fff"
                                data-original-color="#415eb3ff"
                                stroke="none"
                              />
                            </g>
                            <g>
                              <path
                                d="m370.6 189.4h-208.9c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h208.9c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9z"
                                fill="#ed8a1fff"
                                data-original-color="#415eb3ff"
                                stroke="none"
                              />
                            </g>
                            <g>
                              <path
                                d="m370.6 230.2h-208.9c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h208.9c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9z"
                                fill="#ed8a1fff"
                                data-original-color="#415eb3ff"
                                stroke="none"
                              />
                            </g>
                            <g>
                              <path
                                d="m370.6 270.9h-208.9c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h208.9c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9z"
                                fill="#ed8a1fff"
                                data-original-color="#415eb3ff"
                                stroke="none"
                              />
                            </g>
                            <g>
                              <path
                                d="m327.5 311.7h-122.7c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h122.7c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9z"
                                fill="#ed8a1fff"
                                data-original-color="#415eb3ff"
                                stroke="none"
                              />
                            </g>
                          </g>
                        </g>
                        <g>
                          <path
                            d="m136.7 471c-13.1 0-25.6-2.9-37.2-8.7-2.4-1.2-3.4-4.1-2.2-6.6 1.2-2.4 4.1-3.4 6.6-2.2 10.2 5.1 21.3 7.7 32.8 7.7 23.7 0 46.1-11.6 59.9-30.9 8.9-12.5 13.5-27.2 13.5-42.5 0-1.1 0-2.2-.1-3.3-1.7-39.4-34-70.2-73.4-70.2-5.5 0-10.9.6-16.2 1.8-33.7 7.6-57.2 37.1-57.2 71.6 0 19.6 7.6 38.1 21.5 51.9 1.9 1.9 1.9 5 0 6.9s-5 1.9-6.9 0c-15.7-15.7-24.4-36.6-24.4-58.8 0-19 6.6-37.6 18.5-52.3 11.8-14.5 28.2-24.8 46.3-28.9 6-1.4 12.2-2 18.4-2 44.7 0 81.2 34.9 83.1 79.5.1 1.2.1 2.5.1 3.7 0 17.4-5.3 34.1-15.4 48.2-15.4 22-40.8 35.1-67.7 35.1z"
                            fill="#ed8a1fff"
                            data-original-color="#415eb3ff"
                            stroke="none"
                          />
                        </g>
                        <g>
                          <g>
                            <path
                              d="m136.7 442.8c-30.3 0-55-24.7-55-55s24.7-55 55-55 55 24.7 55 55-24.7 55-55 55zm0-100.2c-24.9 0-45.2 20.3-45.2 45.2s20.3 45.2 45.2 45.2 45.2-20.3 45.2-45.2c0-25-20.2-45.2-45.2-45.2z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m136.7 353.4c-2.7 0-4.9-2.2-4.9-4.9v-10.9c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9v10.9c0 2.7-2.2 4.9-4.9 4.9z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m97.5 392.7h-10.9c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h10.9c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m136.7 442.8c-2.7 0-4.9-2.2-4.9-4.9v-10.9c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9v10.9c0 2.7-2.2 4.9-4.9 4.9z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m186.8 392.7h-10.8c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9h10.9c2.7 0 4.9 2.2 4.9 4.9-.1 2.7-2.3 4.9-5 4.9z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                          <g>
                            <path
                              d="m158.2 392.7h-21.5c-2.7 0-4.9-2.2-4.9-4.9v-19.6c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9v14.7h16.6c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9z"
                              fill="#ed8a1fff"
                              data-original-color="#415eb3ff"
                              stroke="none"
                            />
                          </g>
                        </g>
                        <g>
                          <path
                            d="m81.3 448.1c-.3 0-.7 0-1-.1l-20.9-4.3c-2.6-.5-4.3-3.1-3.8-5.8.5-2.6 3.1-4.3 5.8-3.8l15.6 3.2 1.5-13.8c.3-2.7 2.7-4.6 5.4-4.3s4.6 2.7 4.3 5.4l-2 19.2c-.1 1.4-.9 2.6-2 3.4-.8.5-1.8.9-2.9.9z"
                            fill="#ed8a1fff"
                            data-original-color="#415eb3ff"
                            stroke="none"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="flex-1 min-w-0 ms-2">
                  <p className="text-sm font-medium text-gray-200 truncate ">
                    History records
                  </p>
                </div>
              </div>
              <div className="my-6">
                <button
                  type="button"
                  className="text-[#ED8A1F] border border-[#ED8A1F] font-medium rounded-full w-full text-sm px-5 py-2.5 text-center  "
                >
                  All history
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VoultBox;
