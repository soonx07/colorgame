import React, { useState, useRef, useEffect } from "react";
import { MinusCircle, X, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  Button,
} from "../Common";
import { IoWallet } from "react-icons/io5";

const Wallet = ({ walletBalance, setWalletBalance }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleDeposit = (amount) => {
    setWalletBalance((prevBalance) => prevBalance + amount);
    setShowDepositModal(false);
  };

  const handleWithdraw = (amount) => {
    if (walletBalance < amount) {
      alert("Insufficient balance!");
      return;
    }
    setWalletBalance((prevBalance) => prevBalance - amount);
    setShowWithdrawModal(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Wallet Card */}
      <div className="relative overflow-hidden bg-gradient-to-r bg-gray-700 via-gray-800 to-gray-900  rounded-2xl shadow-md shadow-yellow-400/20 border border-yellow-500/20 my-2">
        {/* Animated Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-blue-500/10 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        {/* Content Container */}
        <div className="relative p-4 backdrop-blur-sm">
          {/* Balance Display */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.1),transparent_50%)]" />

          <div className="flex flex-col items-center gap-1 mb-4">
            <h3 className="text-xl font-bold text-white font-mono">
              {/* {isVisible ? "₹. 000" : "₹. •••"} */} ₹
              {walletBalance.toFixed(2)}
            </h3>
            <div className="flex  items-center justify-center gap-2">
              <IoWallet className="h-5 w-5 text-yellow-400" />
              <p className="text-slate-200 text-sm font-medium">
                Wallet Balance
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-8">
            <button
              onClick={() => setShowDepositModal(true)}
              className="relative flex items-center justify-center gap-2 btn-gold-ltr text-slate-900 font-bold rounded-3xl px-4 py-[6px] transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <PlusCircle className="w-4 h-4 relative" />
              <span className="relative text-sm">Deposit</span>
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-yellow-500 font-bold rounded-3xl px-4 py-[6px] transition-all duration-200 border border-yellow-500/50 hover:border-yellow-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <MinusCircle className="w-4 h-4 relative" />
              <span className="relative text-sm">Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between ">
              <DialogTitle>Deposit Funds</DialogTitle>
              <button
                onClick={() => setShowDepositModal(false)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <X className="w-5 h-5 text-slate-400 group-hover:text-yellow-400" />
              </button>
            </div>
            <DialogDescription>Add funds to your game wallet</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 p-6 pt-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">Credit Card</span>
                </Button>
                <Button
                  variant="outline"
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">PayPal</span>
                </Button>
              </div>
            </div>
            <Button
              className="w-full relative group overflow-hidden"
              onClick={() => handleDeposit(/* amount from input */)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Confirm Deposit</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between ">
              <DialogTitle>Withdraw Funds</DialogTitle>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <X className="w-5 h-5 text-slate-400 group-hover:text-yellow-400" />
              </button>
            </div>
            <DialogDescription>
              Withdraw funds from your game wallet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 p-6 pt-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">
                Withdrawal Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">Bank Account</span>
                </Button>
                <Button
                  variant="outline"
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">PayPal</span>
                </Button>
              </div>
            </div>
            <Button
              className="w-full relative group overflow-hidden"
              onClick={() => handleWithdraw(/* amount from input */)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Confirm Withdrawal</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
