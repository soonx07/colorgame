import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import mainLogo from "../UserPanel/assets/mainLogo.png";

import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  MdKeyboardArrowDown,
  MdOutlineCardGiftcard,
  MdOutlineDashboard,
} from "react-icons/md";
import {
  RiContactsBook3Line,
  RiContactsBookLine,
  RiLuggageDepositLine,
} from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import {
  BiArrowToRight,
  BiMoneyWithdraw,
  BiSolidArrowToLeft,
} from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { CgLivePhoto } from "react-icons/cg";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const getStoredSidebarExpanded = () => {
    try {
      return localStorage.getItem("sidebar-expanded") === "true";
    } catch (err) {
      console.warn("Failed to read sidebar state:", err);
      return false;
    }
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(
    getStoredSidebarExpanded()
  );

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-expanded", sidebarExpanded);
    } catch (err) {
      console.warn("Failed to save sidebar state:", err);
    }

    const body = document.querySelector("body");
    if (sidebarExpanded) {
      body.classList.add("sidebar-expanded");
    } else {
      body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed text-right inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] w-64 lg:w-20 lg:sidebar-expanded:w-64  shrink-0 border-r-2 border-[#FCC414] bg-white dark:bg-gray-900 p-2 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-xs"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-1">
          {/* Sidebar header */}
          <div className="flex justify-between w-full pr-3 sm:px-2">
            {/* Close button */}

            {/* Logo */}
            <NavLink end to="/admin/dashboard" className="block">
              <img
                src={mainLogo}
                alt="Main Logo"
                className=" w-[6.8rem] h-[2.7rem]"
              />
            </NavLink>

            <button
              ref={trigger}
              className="lg:hidden text-gray-500 hover:text-gray-400 cursor-pointer text-right"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <BiSolidArrowToLeft className="w-6 h-6 fill-current" />
            </button>
          </div>

          {/* Expand / collapse button */}
          <div className=" hidden lg:inline-flex ">
            <div className="w-12 pl-4 pr-3 py-2">
              <button
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
              >
                <span className="sr-only">Expand / collapse sidebar</span>
                <BiArrowToRight
                  className={`w-6 h-6 shrink-0 fill-current text-gray-400 dark:text-gray-500 dark:hover:text-gray-300 ${
                    sidebarExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-6 mt-4 overflow-y-auto no-scrollbar">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3"></h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/dashboard" ||
                  pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/admin/dashboard"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <NavLink end to="/admin/dashboard">
                          <div className="flex items-center justify-between" title="Dashboard">
                            <div className="flex items-center">
                              <MdOutlineDashboard className="w-5 h-5" />
                              <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Dashboard
                              </span>
                            </div>
                          </div>
                        </NavLink>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/live-game" ||
                  pathname.includes("live-game")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/admin/live-game"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname === "/admin/live-game" ||
                          pathname.includes("live-game")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <NavLink end to="/admin/live-game">
                          <div className="flex items-center justify-between" title="Live Game">
                            <div className="flex items-center">
                              <CgLivePhoto className="w-5 h-5"/>
                              <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Live Game
                              </span>
                            </div>
                          </div>
                        </NavLink>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Members */}
              <SidebarLinkGroup
                activecondition={pathname.includes("ecommerce")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/admin/members"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("ecommerce")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="Members">
                          <div className="flex items-center">
                            <RiContactsBookLine className="w-5 h-5"/>
                            <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                              Members
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc  ${
                            !open && "hidden"
                          }`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/members-list"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Members List
                              </span>
                            </NavLink>
                          </li>
                          <li className="hidden mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/edited-info"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs  lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Edited logs
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Community */}
              <SidebarLinkGroup
                activecondition={pathname.includes("community")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("community")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="Sub Admin">
                          <div className="flex items-center">
                            <RiContactsBook3Line className="w-5 h-5"/>
                            <span className="text-xs  ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                              Sub Admin
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="#"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs  lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Create Sub Admin
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="#"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs  lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Sub Admin List
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Finance */}
              <SidebarLinkGroup activecondition={pathname.includes("finance")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("finance")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="KYC">
                          <div className="flex items-center">
                            <IoPersonOutline className="w-5 h-5"/>
                            <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                              KYC
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/kyc-history"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                KYC History
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Deposit */}
              <SidebarLinkGroup activecondition={pathname.includes("job")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("job")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="Deposit">
                          <div className="flex items-center">
                            <RiLuggageDepositLine className="w-5 h-5"/>
                            <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                              Deposit
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/add-qr"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Add QR Code
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/deposit-history"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Deposit History
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Withdrawals */}
              <SidebarLinkGroup activecondition={pathname.includes("job")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("job")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="Withdrawals">
                          <div className="flex items-center">
                            <BiMoneyWithdraw className="w-5 h-5"/>
                            <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                              Withdrawals
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/withdraw-history"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Withdrawal History
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Reports */}
              <SidebarLinkGroup activecondition={pathname.includes("reports")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("reports")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="Reports">
                          <div className="flex items-center">
                            <TbReport className="w-5 h-5"/>
                            <span className="text-xs  ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                              Reports
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/deposit-bonus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                First Deposit Bonus
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/invitation-bonus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Invitation Bonus
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/level-bonus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                              (isActive
                                ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Level Bonus Report
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/team-winning-bonus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                              (isActive
                                ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                                Team Winning Bonus 
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Bonanza */}
              <SidebarLinkGroup activecondition={pathname.includes("bonanza")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("settings")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between" title="Bonanza">
                          <div className="flex items-center">
                            <MdOutlineCardGiftcard className="w-5 h-5"/>
                            <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                              Bonanza
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/royalty-bonus"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                              (isActive
                                ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                               Royalty Bonus
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/admin/special-reward"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                              (isActive
                                ? "text-gray-20 bg-gradient-to-r from-violet-500/20 to-violet-500/10 dark:from-violet-800/30 dark:to-violet-400/20  dark:text-gray-200 rounded-md px-2"
                                : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                 Special Reward
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Utility */}
              <div className="hidden">

              <SidebarLinkGroup activecondition={pathname.includes("utility")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 truncate transition duration-150 ${
                          pathname.includes("utility")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className={`shrink-0 fill-current ${
                                pathname.includes("utility")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14.75 2.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM14.75 16a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM2.5 14.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM1.25 2.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
                              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
                            </svg>
                            <span className="text-xs ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                              Utility
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0">
                            <MdKeyboardArrowDown
                              className={`w-5 h-5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`pl-8 mt-1 list-disc ${!open && "hidden"}`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="#"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Changelog
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="#"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                Roadmap
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="#"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-xs lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200">
                                FAQs
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
