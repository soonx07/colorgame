import React, { useState } from "react";
import { AlertCircle, Building2, Check, UserCog, X } from "lucide-react";
import { HiMiniArrowPath } from "react-icons/hi2";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import data from "../../utils/DummyData";
import SectionHeader from "../../components/SectionHeader";
import "../../css/additional.css"

const CreateSubAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative z-10 flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Create Sub Admin
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Add Members
              </p>
            </div>

{/*            
              // Show successful submission view
              <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Check className="h-12 w-12 text-green-500" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Update Successful
                  </h2>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Member ID: {memberId}
                  </p>
                  <button
                    onClick={handleStartNewEdit}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
                  >
                    Edit Another Member
                  </button>
                </div>
              </div>
         */}
 
           
                    {/* Member Information Form */}
                    <div className=" flex flex-col gap-8 rounded-lg border bg-white p-4 sm:p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                      <div>
                        <div className="MemberInfoContainer flex flex-row items-center justify-between">
                          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                            <UserCog className="mr-2 h-6 w-6" />
                            Member Information
                          </h2>
                          <button
                            // onClick={resetForm}
                            className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            <HiMiniArrowPath className="mr-1.5 h-4 w-4" />
                            Reset Form
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                          {/* Form fields */}
                          <div className="space-y-2">
                            <label className="block text-sm  text-gray-700 dark:text-gray-300">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value=""
                              onChange=""
                              className={`w-full rounded-md border ${
                                validationErrors.firstName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.firstName && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.firstName}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm  text-gray-700 dark:text-gray-300">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={memberInfo.lastName}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.lastName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.lastName && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.lastName}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm  text-gray-700 dark:text-gray-300">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={memberInfo.email}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.email && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.email}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm  text-gray-700 dark:text-gray-300">
                              Mobile Number
                            </label>
                            <input
                              type="tel"
                              name="mobileNumber"
                              value={memberInfo.mobileNumber}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.mobileNumber
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.mobileNumber && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.mobileNumber}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm  text-gray-700 dark:text-gray-300">
                              DOB
                            </label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={memberInfo.dateOfBirth}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.dateOfBirth
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.dateOfBirth && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.dateOfBirth}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Gender
                            </label>
                            <select
                              name="gender"
                              value={memberInfo.gender}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.gender
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            {validationErrors.gender && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.gender}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2 col-span-2 sm:col-span-3">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Address
                            </label>
                            <textarea
                              name="address"
                              value={memberInfo.address}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.address
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                              rows="2"
                            />
                            {validationErrors.address && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.address}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={memberInfo.city}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.city
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.city && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.city}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={memberInfo.state}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.state
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.state && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.state}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Country
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={memberInfo.country}
                              onChange={handleMemberInfoChange}
                              className={`w-full rounded-md border ${
                                validationErrors.country
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.country && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.country}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bank Details Form */}
                      <div>
                        <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                          <Building2 className="mr-2 h-6 w-6" />
                          Bank Details
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {/* Bank details fields */}
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Account Holder Name
                            </label>
                            <input
                              type="text"
                              name="accountHolder"
                              value={bankDetails.accountHolder}
                              onChange={handleBankDetailsChange}
                              className={`w-full rounded-md border ${
                                validationErrors.accountHolder
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.accountHolder && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.accountHolder}
                              </p>
                            )}
                          </div>
                          {/* Account Number */}
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Account Number
                            </label>
                            <input
                              type="text"
                              name="accountNumber"
                              value={bankDetails.accountNumber}
                              onChange={handleBankDetailsChange}
                              className={`w-full rounded-md border ${
                                validationErrors.accountNumber
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.accountNumber && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.accountNumber}
                              </p>
                            )}
                          </div>
                          {/* Bank Name */}
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              name="bankName"
                              value={bankDetails.bankName}
                              onChange={handleBankDetailsChange}
                              className={`w-full rounded-md border ${
                                validationErrors.bankName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.bankName && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.bankName}
                              </p>
                            )}
                          </div>
                          {/* Branch Name */}
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Branch Name
                            </label>
                            <input
                              type="text"
                              name="branchName"
                              value={bankDetails.branchName}
                              onChange={handleBankDetailsChange}
                              className={`w-full rounded-md border ${
                                validationErrors.branchName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.branchName && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.branchName}
                              </p>
                            )}
                          </div>
                          {/* IFSC Code */}
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              IFSC Code
                            </label>
                            <input
                              type="text"
                              name="ifscCode"
                              value={bankDetails.ifscCode}
                              onChange={handleBankDetailsChange}
                              className={`w-full rounded-md border ${
                                validationErrors.ifscCode
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            />
                            {validationErrors.ifscCode && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.ifscCode}
                              </p>
                            )}
                          </div>
                          {/* Account Type */}
                          <div className="space-y-2">
                            <label className="block text-sm text-gray-700 dark:text-gray-300">
                              Account Type
                            </label>
                            <select
                              name="accountType"
                              value={bankDetails.accountType}
                              onChange={handleBankDetailsChange}
                              className={`w-full rounded-md border ${
                                validationErrors.accountType
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                            >
                              <option value="Savings">Savings</option>
                              <option value="Current">Current</option>
                            </select>
                            {validationErrors.accountType && (
                              <p className="text-red-500 text-xs mt-1">
                                {validationErrors.accountType}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
                      >
                        Update
                      </button>
                    </div>
                  
             

            {/* Update Confirmation Dialog */}
            {showUpdateDialog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Confirm Update
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Are you sure you want to update {memberId} information?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowUpdateDialog(false)}
                      className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateConfirm}
                      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Confirm Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="fixed top-4 right-4 z-40 w-96 rounded-lg border border-green-500 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900">
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-500 dark:text-green-400" />
                  <p className="ml-3 text-green-700 dark:text-green-300 text-sm">
                    {memberId} information updated successfully!
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <div className="fixed top-4 right-4 z-40 w-96 rounded-lg border border-red-500 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900">
                <div className="flex items-center">
                  <X className="h-6 w-6 text-red-500 dark:text-red-400" />
                  <p className="ml-3 text-red-700 dark:text-red-300 text-sm">
                    Member ID not found. Please check and try again.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateSubAdmin;
