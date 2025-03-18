import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import MembersList from "./pages/Members/MembersList";
import EditMemberInfo from "./pages/Members/EditMemberInfo";
import CreateSubAdmin from "./pages/subAdmin/CreateSubAdmin";
import MembersEditedSummary from "./pages/Members/MembersEditedSummary";
import KycHistory from "./pages/Kyc/KycHistory";
import DepositHistory from "./pages/Deposit/DepositHistory";
import AddQRCode from "./pages/Deposit/AddQRCode";
import WithdrawalHistory from "./pages/Withdrawal/WithdrawalHistory";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import UserProtectedRoute from "./UserPanel/ProtectedRoute/UserProtectedRoute";
import Login from "./pages/Login";

import Registration from "./UserPanel/pages/Registration";
import UserLogin from "./UserPanel/pages/UserLogin";
import WelcomeLetter from "../src/UserPanel/pages/WelcomeLetter";
import ForgotPassword from "../src/UserPanel/pages/ForgotPassword";
import Colorgame from "../src/UserPanel/pages/Colorgame";
import HomePage from "./UserPanel/pages/HomePage/HomePage";
import CustomerService from "./UserPanel/pages/CustomerService";
import GameProblems from "./UserPanel/component/CustomerService/GameProblems";
import WinStreakBonus from "./UserPanel/component/CustomerService/WinStreakBonus";
import IfscModification from "./UserPanel/component/CustomerService/IfscModification";
import ChangeBankName from "./UserPanel/component/CustomerService/ChangeBankName";
import AviatorLuckyBonus from "./UserPanel/component/CustomerService/AviatorLuckyBonus";
import DepositNotReceive from "./UserPanel/component/CustomerService/DepositNotReceive";
import DeleteWithdrawBankAccont from "./UserPanel/component/CustomerService/DeleteWithdrawBankAccount";
import ChangePassword from "./UserPanel/component/CustomerService/ChangePassword";
import UsdtVerificationIndian from "./UserPanel/component/CustomerService/UsdtVerificationIndian";
import UsdtVerificationNonIndian from "./UserPanel/component/CustomerService/UsdtVerificationNonIndian";
import DeleteOldUsdtAccount from "./UserPanel/component/CustomerService/DeleteOldUsdtAddress";
import WithdrawalProblem from "./UserPanel/component/CustomerService/WithdrawalProblem";
import Promotions from "./UserPanel/pages/Promotions";
import Activity from "./UserPanel/pages/Activity";
import Account from "./UserPanel/pages/Account/Account";
import Wallet from "./UserPanel/pages/Wallet/Wallet";
import Voult from "./UserPanel/pages/Account/Voult";
import DepositHist from "./UserPanel/component/Deposit/DepositHistory";
import TransactionHistory from "./UserPanel/pages/Account/TransactionHistory";
import GameStatistics from "./UserPanel/pages/Account/GameStatistics";
import WithdrawHistory from "./UserPanel/component/Withdraw/WithdrawHistory";
import Deposit from "./UserPanel/component/Deposit/Depositt";
import Withdraw from "./UserPanel/component/Withdraw/Withdraw";
import Vip from "./UserPanel/component/VIP/Vip";
import Notification from "./UserPanel/component/dashboard/Notification";
import Gift from "./UserPanel/pages/Account/Gift";
import Language from "./UserPanel/pages/Account/Language";
import VoultBox from "./UserPanel/pages/Account/VoultBox";
import LiveGame from "./pages/LiveGame/LiveGame";
import DepositBonus from "./pages/Reports/DepositBonusReport";
import InvitationBonus from "./pages/Reports/InvitationBonus";
import LevelBonus from "./pages/Reports/LevelBonus";
import TeamWinningBonus from "./pages/Reports/TeamWinningBonus";
import RoyaltyBonus from "./pages/Bonanza/RoyaltyBonus";
import SpecialReward from "./pages/Bonanza/SpecialReward";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <AuthProvider>
      <Routes>
        {/* admin routes */}
        <Route exact path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route exact path="/admin/live-game" element={<LiveGame />} />

        <Route exact path="/admin/members-list" element={<MembersList />} />
        <Route
          exact
          path="/admin/edited-info"
          element={<MembersEditedSummary />}
        />
        <Route
          exact
          path="/admin/create-subadmin"
          element={<CreateSubAdmin />}
        />
        <Route exact path="/admin/kyc-history" element={<KycHistory />} />
        <Route exact path="/admin/add-qr" element={<AddQRCode />} />
        <Route
          exact
          path="/admin/deposit-history"
          element={<DepositHistory />}
        />
        <Route
          exact
          path="/admin/withdraw-history"
          element={<WithdrawalHistory />}
        />

        {/* admin report routes */}
        <Route
          exact
          path="/admin/deposit-bonus"
          element={<DepositBonus />}
        />
         <Route
          exact
          path="/admin/invitation-bonus"
          element={<InvitationBonus />}
        />
        <Route
          exact
          path="/admin/level-bonus"
          element={<LevelBonus />}
        />
        <Route
          exact
          path="/admin/team-winning-bonus"
          element={<TeamWinningBonus />}
        />
        <Route
          exact
          path="/admin/royalty-bonus"
          element={<RoyaltyBonus />}
        />
        <Route
          exact
          path="/admin/special-reward"
          element={<SpecialReward />}
        />

        {/* user routes */}
        <Route exact path="/" element={<Registration />} />
        <Route exact path="/user/welcome-letter" element={<WelcomeLetter />} />
        <Route exact path="/user/login" element={<UserLogin />} />
        <Route exact path="/user/reset-password" element={<ForgotPassword />} />
        <Route exact path="/user/support" element={<CustomerService />} />
        <Route exact path="/user/promotion-link" element={<Promotions />} />
        <Route exact path="/user/activity" element={<Activity />} />
        <Route exact path="/user/account" element={<Account />} />
        <Route exact path="/user/wallet" element={<Wallet />} />

        {/* customer service pages routes */}
        <Route exact path="/user/deposit" element={<Deposit />} />
        <Route exact path="/user/withdraw" element={<Withdraw />} />
        <Route exact path="/user/account/vip" element={<Vip />} />
        <Route exact path="/user/account/voultBox" element={<VoultBox />} />
        <Route
          exact
          path="/user/account/gameHistory"
          element={<GameStatistics />}
        />
        <Route
          exact
          path="/user/account/transactionHistory"
          element={<TransactionHistory />}
        />
        <Route
          exact
          path="/user/account/depositHistory"
          element={<DepositHist />}
        />
        <Route
          exact
          path="/user/account/withdrawHistory"
          element={<WithdrawHistory />}
        />
        {/* <Route exact path="/notification" element={<Notification />} /> */}
        <Route exact path="/user/account/gift" element={<Gift />} />
        <Route exact path="/user/account/language" element={<Language />} />

        {/* customer service pages routes */}
        <Route
          exact
          path="/user/support/game-problem"
          element={<GameProblems />}
        />
        <Route
          exact
          path="/user/support/mpride-bonus"
          element={<WinStreakBonus />}
        />
        <Route
          exact
          path="/user/support/aviator-bonus"
          element={<AviatorLuckyBonus />}
        />
        <Route
          exact
          path="/user/support/recharge-history"
          element={<DepositNotReceive />}
        />
        <Route
          exact
          path="/user/support/ifsc-modify"
          element={<IfscModification />}
        />
        <Route
          exact
          path="/user/support/delete-withdraw-account"
          element={<DeleteWithdrawBankAccont />}
        />
        <Route
          exact
          path="/user/support/withdrawal-problems"
          element={<WithdrawalProblem />}
        />
        <Route
          exact
          path="/user/support/bank-modify"
          element={<ChangeBankName />}
        />
        <Route
          exact
          path="/user/support/change-password"
          element={<ChangePassword />}
        />
        <Route
          exact
          path="/user/support/usdt-verify-indian"
          element={<UsdtVerificationIndian />}
        />
        <Route
          exact
          path="/user/support/usdt-verify-non-indian"
          element={<UsdtVerificationNonIndian />}
        />
        <Route
          exact
          path="/user/support/delete-old-usdt-address"
          element={<DeleteOldUsdtAccount />}
        />

        <Route
          exact
          path="/user/home"
          element={
            <UserProtectedRoute>
              <HomePage />
            </UserProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/game"
          element={
            <UserProtectedRoute>
              <Colorgame />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
