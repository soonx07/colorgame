import React from 'react'

function Logout() {
  return (
    <div>
         <div className="px-3 py-12 ">
            <button
              type="button"
              className="w-full text-[#a55f13]s  border border-[#ED8A1F] focus:outline-none  focus:ring-4 focus:ring-[#a55f13] font-medium rounded-full text-sm px-5 py-1 me-2 mb-2 "
            >
              <div className="flex gap-3 justify-center items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke=""
                  className="size-6 stroke-[#ED8A1F]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
                <span className="font-normal text-md text-[#ED8A1F]">
                  Log Out
                </span>
              </div>
            </button>

           
          </div>
    </div>
  )
}

export default Logout