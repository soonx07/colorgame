import React from "react";

function RechargeIns() {
  return (
    <div>
      <div className="p-3  rounded-lg">
        <div className="flex my-3">
          <div className="flex-shrink-0">
            <svg
              height="25"
              viewBox="0 0 64 64"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="_14_wallet_download_download_wallet_money_purse_interest_business_and_finance"
                data-name="14 wallet download, download, wallet, money, purse, interest, business and finance"
              >
                <path
                  d="m29.89 43.54a1 1 0 0 0 -.89-.54h-3v-6a1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1v6h-3a1 1 0 0 0 -.88.53 1 1 0 0 0 .05 1l6 9a1 1 0 0 0 .83.47 1 1 0 0 0 .83-.45l6-9a1 1 0 0 0 .06-1.01z"
                  fill="#3b2314"
                />
                <path
                  d="m4 12a1 1 0 0 1 -1-1v-3a5 5 0 0 1 5-5h47a1 1 0 0 1 0 2h-47a3 3 0 0 0 -3 3v3a1 1 0 0 1 -1 1z"
                  fill="#ec1c24"
                />
                <path
                  d="m58 8h-52a3 3 0 0 0 -3 3v36a3 3 0 0 0 3 3h1.81a16 16 0 0 0 30.38 0h19.81a3 3 0 0 0 3-3v-36a3 3 0 0 0 -3-3zm-35 50a13 13 0 1 1 13-13 13 13 0 0 1 -13 13z"
                  fill="#f6921e"
                />
                <path
                  d="m56 24h-11a5 5 0 0 0 0 10h11a1 1 0 0 0 1-1v-8a1 1 0 0 0 -1-1z"
                  fill="#3b2314"
                />
                <g fill="#ec1c24">
                  <path d="m46 31a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                  <path d="m9 16a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                  <path d="m55 46a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                  <path d="m55 16a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z" />
                </g>
              </g>
            </svg>
          </div>
          <div className="flex-1 min-w-0 ms-2">
            <p className="text-sm font-medium text-white truncate ">
              Recharge instructions
            </p>
          </div>
        </div>
        <div className="p-2 py-3.5 border border-gray-200 rounded-lg">
          <div className="flex mb-2">
            <div className="me-3">
              <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
            </div>
            <div>
              <p className="text-gray-200 text-xs">
                If the transfer time is up, please fill out the deposit form
                again.
              </p>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="me-3">
              <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
            </div>
            <div>
              <p className="text-gray-200 text-xs">
                The transfer amount must match the order you created, otherwise
                the money cannot be credited successfully.
              </p>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="me-3">
              <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
            </div>
            <div>
              <p className="text-gray-200 text-xs">
                If you transfer the wrong amount, our company will not be
                responsible for the lost amount!
              </p>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="me-3">
              <div className="w-1.5 h-1.5 rotate-45 mt-2  bg-[#ED8A1F]"></div>
            </div>
            <div>
              <p className="text-gray-200 text-xs">
                Note: do not cancel the deposit order after the money has been
                transferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RechargeIns;
