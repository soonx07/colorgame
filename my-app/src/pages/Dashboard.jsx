import React, { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/CommonCard";
import {
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  PieChart,
  ArrowDownUp,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SectionHeader from "../components/SectionHeader";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [cardStates, setCardStates] = useState({
    userAccounts: false,
    kycStatus: false,
    companyOverview: false,
    totalDeductions: false,
    fundRequests: false,
    monthlyWithdrawals: false,
    deposits: false,
    eWallet: false,
    clubEarningsTrend: true,
    clubEarningsBreakdown: true,
    profitAnalysis: false,
    performanceSummary: false,
  });

  const toggleCard = (cardId) => {
    setCardStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

   // function to open and close all toggles when we are clicking on the eye icon
  const toggleAllCards = () => {
    setIsEyeOpen(!isEyeOpen);
    const newState = !isEyeOpen;
    
    // Stagger the animations
    const cardIds = Object.keys(cardStates);
    cardIds.forEach((cardId, index) => {
      setTimeout(() => {
        setCardStates(prev => ({
          ...prev,
          [cardId]: newState
        }));
      }, index * 100); // 100ms delay between each card
    });
  };

  const clubEarningsHistory = [
    { month: "Jan", earnings: 300000 },
    { month: "Feb", earnings: 425000 },
    { month: "Mar", earnings: 615550 },
    { month: "Apr", earnings: 500000 },
    { month: "May", earnings: 550000 },
  ];

  const accountData = [
    { name: "Active", value: 197, color: "#10B981" },
    { name: "Inactive", value: 116, color: "#EF4444" },
  ];

  const profitCompoundingData = [
    { period: "Today", profit: 0, compounding: 0 },
    { period: "Weekly", profit: 0, compounding: 0 },
    { period: "Monthly", profit: 0, compounding: 0 },
  ];

  return (
  
<div className=" flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-6">
          <div className="max-w-full mx-auto">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Admin Dashboard
                </h1>
                <button
                  onClick={toggleAllCards}
                  className={`relative group p-1 bg-gray-800  dark:hover:bg-gray-800 shadow-md rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer ${isEyeOpen ? 'shadow-sm shadow-[#FCB90F]' : 'shadow-sm shadow-gray-300'}`}
                  title={isEyeOpen ? "Close all sections" : "Open all sections"}
                >
                  <div className="relative">
                    <Eye
                      className={`w-5 h-5 text-[#FCB90F]  transition-all duration-300 transform
                        ${isEyeOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    />
                    <EyeOff
                      className={`w-5 h-5 text-gray-300 absolute top-0 left-0 transition-all duration-300 transform
                        ${!isEyeOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    />
                  </div>
                  <span className="absolute bottom-0 left-[5.6rem] transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {isEyeOpen ? 'Close All Sections' : 'Open All Sections'}
                  </span>
                </button>
              </div>
              
             
            </div>

            <div className="flex flex-col gap-8">
              {/* Accounts & KYC Section */}
              <div className="">
              <SectionHeader title="Accounts & KYC" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* User Accounts Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="userAccounts"
                      onToggle={toggleCard}
                      isExpanded={cardStates.userAccounts}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          User Accounts
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Users className="w-6 h-6 text-primary" />
                          {cardStates.userAccounts ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>
                        Overview of User Accounts
                      </CardDescription>
                    </CardHeader>
                    {cardStates.userAccounts && (
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Total Joinings
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                313
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Active Accounts
                              </p>
                              <p className="text-2xl font-bold text-emerald-600">
                                197
                              </p>
                            </div>
                          </div>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsPieChart>
                                <Pie
                                  data={accountData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {accountData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </RechartsPieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>

                  {/* KYC Status Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="kycStatus"
                      onToggle={toggleCard}
                      isExpanded={cardStates.kycStatus}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold ">
                          KYC Status
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Info className="w-6 h-6 text-red-800 animate-pulse duration-1000 scale-110" />
                          {cardStates.kycStatus ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Verification Pending</CardDescription>
                    </CardHeader>
                    {cardStates.kycStatus && (
                      <CardContent
                        className="pt-4"
                        isExpanded={cardStates.kycStatus}
                      >
                        <div className="text-center py-8">
                          <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                            0
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Pending Verifications
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </div>

                  {/* Company Overview Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="companyOverview"
                      onToggle={toggleCard}
                      isExpanded={cardStates.companyOverview}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Company Overview
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-violet-500" />
                          {cardStates.companyOverview ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Financial Turnover</CardDescription>
                    </CardHeader>
                    {cardStates.companyOverview && (
                      <CardContent className="pt-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Turnover
                          </p>
                          <p className="text-2xl font-bold text-emerald-600">
                            ₹16,000,000
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </div>
                </div>
              </div>

              {/* Deposits, Withdrawal & Funds Section */}
              <div>
              <SectionHeader title=" Deposits, Withdrawal & Funds" />
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Total Deductions Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="totalDeductions"
                      onToggle={toggleCard}
                      isExpanded={cardStates.totalDeductions}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Total Deductions
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <ArrowDownUp className="w-6 h-6 text-primary" />
                          {cardStates.totalDeductions ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Deduction Breakdown</CardDescription>
                    </CardHeader>
                    {cardStates.totalDeductions && (
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              USDT Deduction
                            </p>
                            <p className="text-xl font-bold text-red-600">₹0</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              INR Deduction
                            </p>
                            <p className="text-xl font-bold text-red-600">₹0</p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>

                  {/* Fund Requests Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="fundRequests"
                      onToggle={toggleCard}
                      isExpanded={cardStates.fundRequests}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Fund Requests
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-6 h-6 text-primary" />
                          {cardStates.fundRequests ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>
                        Pending Deposit Requests
                      </CardDescription>
                    </CardHeader>
                    {cardStates.fundRequests && (
                      <CardContent className="pt-4">
                        <div className="text-center py-4">
                          <p className="text-3xl font-bold text-yellow-600">
                            ₹500,000
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Pending Amount
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </div>

                  {/* Monthly Withdrawals Card */}
                  <div className="w-full transition-all duration-300">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="monthlyWithdrawals"
                      onToggle={toggleCard}
                      isExpanded={cardStates.monthlyWithdrawals}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Monthly Withdrawals
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-primary" />
                          {cardStates.monthlyWithdrawals ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>
                        Profit Withdrawal Status
                      </CardDescription>
                    </CardHeader>
                    {cardStates.monthlyWithdrawals && (
                      <CardContent className="pt-4">
                        <div className="text-center py-4">
                          <p className="text-3xl font-bold text-green-600">
                            ₹0
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Monthly Profit Withdrawn
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </div>

                  {/* Deposits Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="deposits"
                      onToggle={toggleCard}
                      isExpanded={cardStates.deposits}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Deposits
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-6 h-6 text-primary" />
                          {cardStates.deposits ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Recent Deposit Activity</CardDescription>
                    </CardHeader>
                    {cardStates.deposits && (
                      <CardContent className="pt-4">
                        <div>
                          <p className="text-sm text-gray-500">Last Update</p>
                          <p className="text-base font-medium">
                            10/02/25 16:58:05
                          </p>
                          <div className="mt-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-500">
                                7 Days
                              </span>
                              <span className="font-bold text-emerald-600">
                                ₹100,000
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                Monthly
                              </span>
                              <span className="font-bold text-emerald-600">
                                ₹100,000
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>

                  {/* E-wallet Card */}
                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="eWallet"
                      onToggle={toggleCard}
                      isExpanded={cardStates.eWallet}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          E-wallet
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-primary" />
                          {cardStates.eWallet ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Current Balance</CardDescription>
                    </CardHeader>
                    {cardStates.eWallet && (
                      <CardContent className="pt-4">
                        <div>
                          <p className="text-2xl font-bold text-emerald-600">
                            ₹16,000,000
                          </p>
                          <div className="mt-4 h-2 bg-emerald-100 rounded-full">
                            <div
                              className="h-2 bg-emerald-500 rounded-full"
                              style={{ width: "80%" }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>
                </div>
              </div>

              {/* Club Earnings Section */}
              <div>
              <SectionHeader title="Club Earnings" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="w-full transition-all duration-300">
                      <CardHeader
                        className="cursor-pointer"
                        cardId="clubEarningsTrend"
                        onToggle={toggleCard}
                        isExpanded={cardStates.clubEarningsTrend}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold">
                            Club Earnings Trend
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-primary" />
                            {cardStates.clubEarnings ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        <CardDescription>
                          Historical Earnings Performance
                        </CardDescription>
                      </CardHeader>
                      {cardStates.clubEarningsTrend && (
                        <CardContent className="pt-4">
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={clubEarningsHistory}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="earnings"
                                stroke="#8884d8"
                                strokeWidth={3}
                                dot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      )}
                    </div>
                  </div>

                  <div className="w-full transition-all duration-300">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="clubEarningsBreakdown"
                      onToggle={toggleCard}
                      isExpanded={cardStates.clubEarningsBreakdown}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Club Earnings Breakdown
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <PieChart className="w-6 h-6 text-primary" />
                          {cardStates.clubBreakdown ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Current Distribution</CardDescription>
                    </CardHeader>
                    {cardStates.clubEarningsBreakdown && (
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Master Club</p>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-purple-600 h-2.5 rounded-full"
                                  style={{ width: "90%" }}
                                />
                              </div>
                              <span className="text-sm font-medium text-purple-600">
                                ₹615,550
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Prime Club</p>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: "0%" }}
                                />
                              </div>
                              <span className="text-sm font-medium text-blue-600">
                                ₹0
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Superior Club
                            </p>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-green-600 h-2.5 rounded-full"
                                  style={{ width: "0%" }}
                                />
                              </div>
                              <span className="text-sm font-medium text-green-600">
                                ₹0
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>
                </div>
              </div>

              {/* Profit & Compounding Section */}
              <div>
                <SectionHeader title=" Profit & Compounding" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="w-full transition-all duration-300 ">
                      <CardHeader
                        className="cursor-pointer"
                        cardId="profitAnalysis"
                        onToggle={toggleCard}
                        isExpanded={cardStates.profitAnalysis}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold">
                            Profit & Compounding Analysis
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <PieChart className="w-6 h-6 text-primary" />
                            {cardStates.profitAnalysis ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        <CardDescription>
                          Comprehensive Financial Performance
                        </CardDescription>
                      </CardHeader>
                      {cardStates.profitAnalysis && (
                        <CardContent className="pt-4">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={profitCompoundingData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="period" />
                              <YAxis />
                              <Tooltip />
                              <Bar
                                dataKey="profit"
                                fill="#10B981"
                                name="Profit"
                              />
                              <Bar
                                dataKey="compounding"
                                fill="#3B82F6"
                                name="Compounding"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      )}
                    </div>
                  </div>

                  <div className="w-full transition-all duration-300 ">
                    <CardHeader
                      className="cursor-pointer"
                      cardId="performanceSummary"
                      onToggle={toggleCard}
                      isExpanded={cardStates.performanceSummary}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          Performance Summary
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-primary" />
                          {cardStates.performanceSummary ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <CardDescription>Key Financial Metrics</CardDescription>
                    </CardHeader>
                    {cardStates.performanceSummary && (
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Profit
                            </p>
                            <p className="text-2xl font-bold text-emerald-600">
                              ₹0
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Total Compounding
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                              ₹0
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Net Value</p>
                            <p className="text-2xl font-bold text-violet-600">
                              ₹0
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


// <div className="flex space-x-4">
// <FilterButton />
// <Datepicker />
// <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
//   Add View
// </button>
// </div>