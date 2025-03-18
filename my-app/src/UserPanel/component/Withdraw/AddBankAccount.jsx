import React from "react";
import BackButton from "../BackButton";
import Footer from "../Footer";

function AddBankAccount() {
  return (
    <>
      <nav className=" border-gray-200 ">
        <div className=" flex gap-9 items-center  mx-auto p-2">
          <BackButton />
          <div className="flex  items-center ">
            <a
              href="#"
              className="block text-lg whitespace-nowrap ms-4  md:p-0 text-white "
              aria-current="page"
            >
              Add a bank account number
            </a>
          </div>
        </div>
      </nav>
      <div className="m-3">
        <div className=" p-1 px-4 rounded-full bg-white ">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke=""
              className="size-6 stroke-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>

            <h5 className="text-xs text-red-400 font-semibold">
              To ensure the safety of your funds, please bind your bank account
            </h5>
          </div>
        </div>
        <form>
          <div className="">
            <div className="border-b border-gray-200/10 pb-12 text-white">
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 ">
                    Choose a bank
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autocomplete="country-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Please select a bank</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 ">
                    Full recipient's name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name=""
                      placeholder="Enter Full recipient's name"
                      id=""
                      autocomplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 ">
                    Bank account number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name=""
                      placeholder="Enter Bank account number"
                      id=""
                      autocomplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 ">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name=""
                      placeholder="Enter Phone number"
                      id=""
                      autocomplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 ">
                    Mail
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name=""
                      placeholder="Enter email"
                      id=""
                      autocomplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 ">
                    IFSC code
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name=""
                      placeholder="Enter IFSC code"
                      id=""
                      autocomplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4 mt-4">
                  <button
                    type="button"
                    className="text-white bg-[#ED8A20] font-medium rounded-full w-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddBankAccount;
