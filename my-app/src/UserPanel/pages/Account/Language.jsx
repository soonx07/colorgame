import React from "react";
import BackButton from "../../component/CommonComp/BackButton";
import en from "../../assets/mainLogo.png";
import ind from "../../assets/mainLogo.png";

function Language() {
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
              Language
            </span>
          </div>
        </div>
      </nav>
      <div class="m-4 flex flex-col gap-3">
        <label class="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent  has-[:checked]:bg-white  hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
          <div class="inline-flex items-center justify-center gap-2 relative z-10">
            <img src={en} className="w-8" alt="" />
            <p class="font-semibold  w-full whitespace-nowrap  ">English</p>
          </div>
          <input
            class="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
            value="google"
            name="payment"
            type="radio"
            checked
          />
        </label>
        <label class="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent shadow-sm  has-[:checked]:bg-white  hover:bg-slate-200 transition-all cursor-pointer relative   [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
          <div class="inline-flex items-center justify-center gap-2 relative z-10">
            <img src={ind} className="w-8" alt="" />
            <p class="font-semibold  w-full whitespace-nowrap  ">India</p>
          </div>
          <input
            class="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
            value="google"
            name="payment"
            type="radio"
          />
        </label>
      </div>
    </>
  );
}

export default Language;
