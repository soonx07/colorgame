import React from "react";
import achievementBadge from "../../assets/accounts/badge.png";

function UserInfo() {
  const user = [
    {
      name: "MEMBERNNGRR9LO",
      UID: 10161223,
      achievementBadge: achievementBadge,
      profilePicture:
        "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
      LastLogin: " 2024-08-26 11:04:10"
    }
  ];
  return (
    <div>
      {user.map((items, index) => {
        return (
          <div key={index} className="px-3 mt-5 text-center text-2xl text-white ">
            <div  className="flex  items-center gap-2">
              <img
                className="w-16 rounded-full"
                src={items.profilePicture}
                alt=""
              />
              <div className="font-normal flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-start">{items.name}</span>
                  <img src={achievementBadge} alt="" className="w-12" />
                </div>
                <div className="text-sm ">
                  <div className="bg-white w-fit bg-opacity-30 text-white text-xs font-medium me-2 px-2.5  rounded-full">
                    <div className=" flex justify-between gap-2">
                      <span className="font-medium">UID</span>
                      <span className="font-medium">|</span>
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-medium">{items.UID}</span>
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
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-start">
                Last login: {items.LastLogin}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserInfo;
