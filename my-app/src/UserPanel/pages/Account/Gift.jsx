import React from "react";
import BackButton from "../../component/CommonComp/BackButton";
import gift from "../../assets/mainLogo.png";
import NoData from "../../component/CommonComp/NoData";

function Gift() {
  return (
    <>
      <nav className="bg-white text-dark ">
        <div className=" grid grid-cols-3 items-center justify-between mx-auto p-2">
          <BackButton />
          <div className="flex justify-center items-center ">
            <span
              className="block text-lg whitespace-nowrap  md:p-0 text-dark "
              aria-current="page"
            >
              Gift
            </span>
          </div>
        </div>
      </nav>
      <div>
        <img src={gift} className="h-44 w-full" />
      </div>
      <div className="m-3 pb-12">
        <div className="bg-white w-full p-2 rounded-lg my-2">
          <div className="p-2">
            <h5 className="text-sm text-gray-500">Hi</h5>
            <h5 className="text-sm text-gray-500">We have a gift for you</h5>
          </div>
          <div class="p-2">
            <label class="block text-sm font-normal leading-6 text-gray-900">
              Please enter your gift code below
            </label>
            <div class="mt-2">
              <input
                type="text"
                name=""
                placeholder="Enter Gift Code"
                id=""
                autocomplete="given-name"
                class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm bg-[#F7F8FF] placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-6">
            <button
              type="button"
              class="w-full text-[#a55f13] bg-gradient-to-r from-[#FF9A02] to-[#E67302]  border bg-[#ED8A1F] focus:outline-none  focus:ring-4 focus:ring-[#a55f13] font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 "
            >
              <div class="flex gap-3 justify-center items-center ">
                <span class="font-normal text-lg text-white">Recieve</span>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white w-full p-1 px-2 rounded-lg my-2">
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
              <p className="text-sm font-medium text-gray-900 truncate ">
                History
              </p>
            </div>
          </div>
          <NoData />
        </div>
      </div>
    </>
  );
}

export default Gift;
