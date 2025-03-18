// import React, { useState } from "react";
// import { AlertCircle, Building2, Check, UserCog, X } from "lucide-react";
// import { HiMiniArrowPath } from "react-icons/hi2";
// import Header from "../../partials/Header";
// import Sidebar from "../../partials/Sidebar";
// import data from "../../utils/DummyData";
// import SectionHeader from "../../components/SectionHeader";
// import "../../css/additional.css"

// const EditMemberInfo = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [memberId, setMemberId] = useState("");
  // const [isVerifying, setIsVerifying] = useState(false);
  // const [memberData, setMemberData] = useState(null);
  // const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [showError, setShowError] = useState(false);
  // const [error, setError] = useState("");
  // const [validationErrors, setValidationErrors] = useState({});
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   // Form states
//   const [memberInfo, setMemberInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobileNumber: "",
//     dateOfBirth: "",
//     gender: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const [bankDetails, setBankDetails] = useState({
//     accountHolder: "",
//     accountNumber: "",
//     bankName: "",
//     branchName: "",
//     ifscCode: "",
//     accountType: "Savings",
//   });

//   // Validation patterns
//   const validationPatterns = {
//     email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     mobileNumber: /^[0-9]{10}$/,
//     name: /^[a-zA-Z\s]{2,30}$/,
//     ifscCode: /^[A-Z]{4}0[A-Z0-9]{6}$/,
//     accountNumber: /^\d{9,18}$/,
//   };

//   const validateField = (name, value) => {
//     // Handling undefined or null values
//     if (value === undefined || value === null) {
//       return "This field is required";
//     }

//     const stringValue = String(value).trim();

//     switch (name) {
//       case "email":
//         return stringValue && validationPatterns.email.test(stringValue)
//           ? ""
//           : "Invalid email format";

//       case "mobileNumber":
//         return stringValue && validationPatterns.mobileNumber.test(stringValue)
//           ? ""
//           : "Mobile number must be 10 digits";

//       case "firstName":
//       case "lastName":
//         return stringValue && validationPatterns.name.test(stringValue)
//           ? ""
//           : "Name should be 2-30 characters, letters only";

//       case "dateOfBirth":
//         if (!stringValue) return "Date of birth is required";
//         const date = new Date(stringValue);
//         const age = new Date().getFullYear() - date.getFullYear();
//         return age >= 18 ? "" : "Must be at least 18 years old";

//       case "ifscCode":
//         return stringValue && validationPatterns.ifscCode.test(stringValue)
//           ? ""
//           : "Invalid IFSC code format";

//       case "accountNumber":
//         return stringValue && validationPatterns.accountNumber.test(stringValue)
//           ? ""
//           : "Invalid account number";

//       case "gender":
//         return stringValue ? "" : "Please select a gender";

//       case "accountType":
//         return stringValue ? "" : "Please select an account type";

//       default:
//         return stringValue ? "" : "This field is required";
//     }
//   };

//   const resetForm = () => {
//     setMemberInfo({
//       firstName: "",
//       lastName: "",
//       email: "",
//       mobileNumber: "",
//       dateOfBirth: "",
//       gender: "",
//       address: "",
//       city: "",
//       state: "",
//       country: "",
//     });
//     setBankDetails({
//       accountHolder: "",
//       accountNumber: "",
//       bankName: "",
//       branchName: "",
//       ifscCode: "",
//       accountType: "Savings",
//     });
//     setValidationErrors({});
//   };

//   // Verify member ID
//   const handleVerify = () => {
//     setIsVerifying(true);
//     setError("");
//     const foundMember = data.find((member) => member.memberId === memberId);

//     setTimeout(() => {
//       if (foundMember) {
//         setMemberData(foundMember);
//         const [firstName, lastName] = foundMember.fullname.split(" ");
//         setMemberInfo((prevState) => ({
//           ...prevState,
//           firstName: firstName || "",
//           lastName: lastName || "",
//           email: "example@email.com",
//           mobileNumber: foundMember.mobileNumber || "",
//           dateOfBirth: "2000-01-01",
//           gender: "Male",
//           address: "123 Street",
//           city: "City",
//           state: "State",
//           country: "Country",
//         }));
//       } else {
//         setError("Member ID not found. Please check and try again.");
//         setMemberData(null);
//         setTimeout(() => {
//           setShowError(true);
//           setShowUpdateDialog(false);
//           setTimeout(() => setShowError(false), 3000);
//         }, 1000);
//       }
//       setIsVerifying(false);
//     }, 1000);
//   };

//   const handleMemberInfoChange = (e) => {
//     const { name, value } = e.target;
//     setMemberInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     const error = validateField(name, value);
//     setValidationErrors((prev) => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

//   const handleBankDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setBankDetails((prev) => ({ ...prev, [name]: value }));

//     const error = validateField(name, value);
//     setValidationErrors((prev) => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

//   const handleSubmit = () => {
//     // Validating  all fields
//     const errors = {};
//     Object.keys(memberInfo).forEach((key) => {
//       const error = validateField(key, memberInfo[key]);
//       if (error) errors[key] = error;
//     });
//     Object.keys(bankDetails).forEach((key) => {
//       const error = validateField(key, bankDetails[key]);
//       if (error) errors[key] = error;
//     });

//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     setShowUpdateDialog(true);
//     // alert("submitted");
//   };

//   const handleUpdateConfirm = () => {
//     // Updating the data in the MembersList
//     const updatedData = data.map((member) => {
//       if (member.memberId === memberId) {
//         return {
//           ...member,
//           fullname: `${memberInfo.firstName} ${memberInfo.lastName}`,
//           mobileNumber: memberInfo.mobileNumber,
//           // Add other fields as needed
//         };
//       }
//       return member;
//     });

//     // Update the data array
//     Object.assign(data, updatedData);

//     setTimeout(() => {
//       setShowUpdateDialog(false);
//       setShowSuccess(true);
//       setIsFormSubmitted(true); // Setting form as submitted
//       setMemberData(null); // Clearing the member data
//       setTimeout(() => setShowSuccess(false), 3000);
//     }, 1000);
//   };

//   // thi is to start a new edit
//   const handleStartNewEdit = () => {
//     setMemberId("");
//     setIsFormSubmitted(false);
//     setMemberData(null);
//     resetForm();
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div className="relative z-10 flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="grow p-4 sm:p-6">
//           <div className="mx-auto space-y-6">
//             {/* Page Header */}
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//                 Edit Member Information
//               </h1>
//               <p className="mt-2 text-gray-600 dark:text-gray-400">
//                 Update member details and bank information
//               </p>
//             </div>

//             {isFormSubmitted ? (
//               // Show successful submission view
//               <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//                 <div className="text-center">
//                   <div className="mb-4 flex justify-center">
//                     <Check className="h-12 w-12 text-green-500" />
//                   </div>
//                   <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
//                     Update Successful
//                   </h2>
//                   <p className="mb-4 text-gray-600 dark:text-gray-400">
//                     Member ID: {memberId}
//                   </p>
//                   <button
//                     onClick={handleStartNewEdit}
//                     className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
//                   >
//                     Edit Another Member
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {/* Member ID Verification */}
//                 <div className="rounded-lg border bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
//                   <SectionHeader title="Enter Member ID" />
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <input
//                       type="text"
//                       value={memberId}
//                       onChange={(e) => setMemberId(e.target.value)}
//                       placeholder="Enter Member ID"
//                       className="flex-1 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//                     />
//                     <button
//                       onClick={handleVerify}
//                       disabled={isVerifying || !memberId}
//                       className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-blue-300 dark:bg-blue-600 dark:disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
//                     >
//                       {isVerifying ? "Verifying..." : "Verify"}
//                     </button>
//                   </div>
//                 </div>

//                 {memberData && (
//                   <>
//                     {/* Member Information Form */}
//                     <div className=" flex flex-col gap-8 rounded-lg border bg-white p-4 sm:p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
//                       <div>
//                         <div className="MemberInfoContainer flex flex-row items-center justify-between">
//                           <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
//                             <UserCog className="mr-2 h-6 w-6" />
//                             Member Information
//                           </h2>
//                           <button
//                             onClick={resetForm}
//                             className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
//                           >
//                             <HiMiniArrowPath className="mr-1.5 h-4 w-4" />
//                             Reset Form
//                           </button>
//                         </div>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
//                           {/* Form fields */}
//                           <div className="space-y-2">
//                             <label className="block text-sm  text-gray-700 dark:text-gray-300">
//                               First Name
//                             </label>
//                             <input
//                               type="text"
//                               name="firstName"
//                               value={memberInfo.firstName}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.firstName
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.firstName && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.firstName}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm  text-gray-700 dark:text-gray-300">
//                               Last Name
//                             </label>
//                             <input
//                               type="text"
//                               name="lastName"
//                               value={memberInfo.lastName}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.lastName
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.lastName && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.lastName}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm  text-gray-700 dark:text-gray-300">
//                               Email
//                             </label>
//                             <input
//                               type="email"
//                               name="email"
//                               value={memberInfo.email}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.email
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.email && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.email}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <label className="block text-sm  text-gray-700 dark:text-gray-300">
//                               Mobile Number
//                             </label>
//                             <input
//                               type="tel"
//                               name="mobileNumber"
//                               value={memberInfo.mobileNumber}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.mobileNumber
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.mobileNumber && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.mobileNumber}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm  text-gray-700 dark:text-gray-300">
//                               DOB
//                             </label>
//                             <input
//                               type="date"
//                               name="dateOfBirth"
//                               value={memberInfo.dateOfBirth}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.dateOfBirth
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.dateOfBirth && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.dateOfBirth}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Gender
//                             </label>
//                             <select
//                               name="gender"
//                               value={memberInfo.gender}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.gender
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             >
//                               <option value="">Select Gender</option>
//                               <option value="Male">Male</option>
//                               <option value="Female">Female</option>
//                               <option value="Other">Other</option>
//                             </select>
//                             {validationErrors.gender && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.gender}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2 col-span-2 sm:col-span-3">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Address
//                             </label>
//                             <textarea
//                               name="address"
//                               value={memberInfo.address}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.address
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                               rows="2"
//                             />
//                             {validationErrors.address && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.address}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               City
//                             </label>
//                             <input
//                               type="text"
//                               name="city"
//                               value={memberInfo.city}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.city
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.city && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.city}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               State
//                             </label>
//                             <input
//                               type="text"
//                               name="state"
//                               value={memberInfo.state}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.state
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.state && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.state}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Country
//                             </label>
//                             <input
//                               type="text"
//                               name="country"
//                               value={memberInfo.country}
//                               onChange={handleMemberInfoChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.country
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.country && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.country}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Bank Details Form */}
//                       <div>
//                         <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
//                           <Building2 className="mr-2 h-6 w-6" />
//                           Bank Details
//                         </h2>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                           {/* Bank details fields */}
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Account Holder Name
//                             </label>
//                             <input
//                               type="text"
//                               name="accountHolder"
//                               value={bankDetails.accountHolder}
//                               onChange={handleBankDetailsChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.accountHolder
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.accountHolder && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.accountHolder}
//                               </p>
//                             )}
//                           </div>
//                           {/* Account Number */}
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Account Number
//                             </label>
//                             <input
//                               type="text"
//                               name="accountNumber"
//                               value={bankDetails.accountNumber}
//                               onChange={handleBankDetailsChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.accountNumber
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.accountNumber && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.accountNumber}
//                               </p>
//                             )}
//                           </div>
//                           {/* Bank Name */}
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Bank Name
//                             </label>
//                             <input
//                               type="text"
//                               name="bankName"
//                               value={bankDetails.bankName}
//                               onChange={handleBankDetailsChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.bankName
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.bankName && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.bankName}
//                               </p>
//                             )}
//                           </div>
//                           {/* Branch Name */}
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Branch Name
//                             </label>
//                             <input
//                               type="text"
//                               name="branchName"
//                               value={bankDetails.branchName}
//                               onChange={handleBankDetailsChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.branchName
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.branchName && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.branchName}
//                               </p>
//                             )}
//                           </div>
//                           {/* IFSC Code */}
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               IFSC Code
//                             </label>
//                             <input
//                               type="text"
//                               name="ifscCode"
//                               value={bankDetails.ifscCode}
//                               onChange={handleBankDetailsChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.ifscCode
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             />
//                             {validationErrors.ifscCode && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.ifscCode}
//                               </p>
//                             )}
//                           </div>
//                           {/* Account Type */}
//                           <div className="space-y-2">
//                             <label className="block text-sm text-gray-700 dark:text-gray-300">
//                               Account Type
//                             </label>
//                             <select
//                               name="accountType"
//                               value={bankDetails.accountType}
//                               onChange={handleBankDetailsChange}
//                               className={`w-full rounded-md border ${
//                                 validationErrors.accountType
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
//                             >
//                               <option value="Savings">Savings</option>
//                               <option value="Current">Current</option>
//                             </select>
//                             {validationErrors.accountType && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {validationErrors.accountType}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-end">
//                       <button
//                         onClick={handleSubmit}
//                         className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
//                       >
//                         Update
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </>
//             )}

            // {/* Update Confirmation Dialog */}
            // {showUpdateDialog && (
            //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            //     <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            //       <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            //         Confirm Update
            //       </h3>
            //       <p className="mb-6 text-gray-600 dark:text-gray-400">
            //         Are you sure you want to update {memberId} information?
            //       </p>
            //       <div className="flex justify-end space-x-4">
            //         <button
            //           onClick={() => setShowUpdateDialog(false)}
            //           className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            //         >
            //           Cancel
            //         </button>
            //         <button
            //           onClick={handleUpdateConfirm}
            //           className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            //         >
            //           Confirm Update
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // )}

            // {/* Success Message */}
            // {showSuccess && (
            //   <div className="fixed top-4 right-4 z-40 w-96 rounded-lg border border-green-500 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900">
            //     <div className="flex items-center">
            //       <Check className="h-6 w-6 text-green-500 dark:text-green-400" />
            //       <p className="ml-3 text-green-700 dark:text-green-300 text-sm">
            //         {memberId} information updated successfully!
            //       </p>
            //     </div>
            //   </div>
            // )}

            // {/* Error Message */}
            // {showError && (
            //   <div className="fixed top-4 right-4 z-40 w-96 rounded-lg border border-red-500 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900">
            //     <div className="flex items-center">
            //       <X className="h-6 w-6 text-red-500 dark:text-red-400" />
            //       <p className="ml-3 text-red-700 dark:text-red-300 text-sm">
            //         Member ID not found. Please check and try again.
            //       </p>
            //     </div>
            //   </div>
            // )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditMemberInfo;










// import React, { useState } from "react";

// const EditMemberInfo = ({ member, onSave, onClose }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [memberId, setMemberId] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [memberData, setMemberData] = useState(null);
//   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const [error, setError] = useState("");
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const [memberInfo, setMemberInfo] = useState({
//     firstName: member.fullname.split(" ")[0],
//     lastName: member.fullname.split(" ")[1] || "",
//     email: "example@email.com",
//     mobileNumber: member.mobileNumber,
//     dateOfBirth: "2000-01-01",
//     gender: "Male",
//     address: "123 Street",
//     city: "City",
//     state: "State",
//     country: "Country",
//   });

//   const [bankDetails, setBankDetails] = useState({
//     accountHolder: "",
//     accountNumber: "",
//     bankName: "",
//     branchName: "",
//     ifscCode: "",
//     accountType: "Savings",
//   });

//   const handleMemberInfoChange = (e) => {
//     const { name, value } = e.target;
//     setMemberInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBankDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setBankDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Validate all fields
//     const errors = {};
//     Object.keys(memberInfo).forEach((key) => {
//       const error = validateField(key, memberInfo[key]);
//       if (error) errors[key] = error;
//     });
//     Object.keys(bankDetails).forEach((key) => {
//       const error = validateField(key, bankDetails[key]);
//       if (error) errors[key] = error;
//     });
  
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
  
//     // Prepare the updated member data
//     const updatedMember = {
//       ...selectedMember,
//       fullname: `${memberInfo.firstName} ${memberInfo.lastName}`,
//       mobileNumber: memberInfo.mobileNumber,
//       // Add other fields as needed
//     };
  
//     // Call the onSave function with the updated member data
//     onSave(updatedMember);
  
//     // Close the modal
//     onClose();
//   };

//   // const handleUpdateConfirm = () => {
//   //   // Update the data in the MembersList
//   //   const updatedData = data.map((member) => {
//   //     if (member.memberId === memberId) {
//   //       return {
//   //         ...member,
//   //         fullname: `${memberInfo.firstName} ${memberInfo.lastName}`,
//   //         mobileNumber: memberInfo.mobileNumber,
//   //         // Add other fields as needed
//   //       };
//   //     }
//   //     return member;
//   //   });
  
//   //   // Update the data array
//   //   Object.assign(data, updatedData);
  
//   //   setTimeout(() => {
//   //     setShowUpdateDialog(false);
      // setShowSuccess(true);
      // setIsFormSubmitted(true); // Setting form as submitted
      // setMemberData(null); // Clearing the member data
      // setTimeout(() => setShowSuccess(false), 3000);
//   //   }, 1000);
//   // };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Member Information */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Member Information</h3>
//           <div className="space-y-2">
//             <input
//               type="text"
//               name="firstName"
//               value={memberInfo.firstName}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="First Name"
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={memberInfo.lastName}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Last Name"
//             />
//             <input
//               type="email"
//               name="email"
//               value={memberInfo.email}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Email"
//             />
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={memberInfo.mobileNumber}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Mobile Number"
//             />
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={memberInfo.dateOfBirth}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//             />
//             <select
//               name="gender"
//               value={memberInfo.gender}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <textarea
//               name="address"
//               value={memberInfo.address}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Address"
//             />
//             <input
//               type="text"
//               name="city"
//               value={memberInfo.city}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="City"
//             />
//             <input
//               type="text"
//               name="state"
//               value={memberInfo.state}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="State"
//             />
//             <input
//               type="text"
//               name="country"
//               value={memberInfo.country}
//               onChange={handleMemberInfoChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Country"
//             />
//           </div>
//         </div>

//         {/* Bank Details */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
//           <div className="space-y-2">
//             <input
//               type="text"
//               name="accountHolder"
//               value={bankDetails.accountHolder}
//               onChange={handleBankDetailsChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Account Holder Name"
//             />
//             <input
//               type="text"
//               name="accountNumber"
//               value={bankDetails.accountNumber}
//               onChange={handleBankDetailsChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Account Number"
//             />
//             <input
//               type="text"
//               name="bankName"
//               value={bankDetails.bankName}
//               onChange={handleBankDetailsChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Bank Name"
//             />
//             <input
//               type="text"
//               name="branchName"
//               value={bankDetails.branchName}
//               onChange={handleBankDetailsChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="Branch Name"
//             />
//             <input
//               type="text"
//               name="ifscCode"
//               value={bankDetails.ifscCode}
//               onChange={handleBankDetailsChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               placeholder="IFSC Code"
//             />
//             <select
//               name="accountType"
//               value={bankDetails.accountType}
//               onChange={handleBankDetailsChange}
//               className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//             >
//               <option value="Savings">Savings</option>
//               <option value="Current">Current</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end mt-4">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="ml-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>

//                   {/* Update Confirmation Dialog */}
//                   {showUpdateDialog && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
//                   <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//                     Confirm Update
//                   </h3>
//                   <p className="mb-6 text-gray-600 dark:text-gray-400">
//                     Are you sure you want to update {memberId} information?
//                   </p>
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       onClick={() => setShowUpdateDialog(false)}
//                       className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSubmit}
//                       className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
//                     >
//                       Confirm Update
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

         
//     </div>
//   );
// };

// export default EditMemberInfo;




import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import PasswordVerificationDialog from "../../partials/members/PasswordVerificationDailog";

const EditMemberInfo = ({ member, onSave, onClose }) => {
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [memberInfo, setMemberInfo] = useState({
    firstName: member.fullname.split(" ")[0],
    lastName: member.fullname.split(" ")[1] || "",
    email: "example@email.com",
    mobileNumber: member.mobileNumber,
    dateOfBirth: "2000-01-01",
    gender: "Male",
    address: "123 Street",
    city: "City",
    state: "State",
    country: "Country",
  });

  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountType: "Savings",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleMemberInfoChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    // Add your validation logic here
    // Example:
    if (!memberInfo.firstName) errors.firstName = "First name is required";
    if (!memberInfo.mobileNumber) errors.mobileNumber = "Mobile number is required";
    
    return errors;
  };

  const handleSaveClick = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    // Show confirmation dialog instead of saving directly
  
    setShowPasswordVerification(true);
  };

  const handleVerifiedSave = () => {
    // Proceed with saving after password verification
    onSave(memberInfo);
    
  };

  const handleConfirmSave = () => {
    // Prepare the updated member data
    const updatedMember = {
      ...member,
      fullname: `${memberInfo.firstName} ${memberInfo.lastName}`.trim(),
      mobileNumber: memberInfo.mobileNumber,
      email: memberInfo.email,
      dateOfBirth: memberInfo.dateOfBirth,
      gender: memberInfo.gender,
      address: memberInfo.address,
      city: memberInfo.city,
      state: memberInfo.state,
      country: memberInfo.country,
      // Include bank details if they should be updated
      bankDetails: {
        accountHolder: bankDetails.accountHolder,
        accountNumber: bankDetails.accountNumber,
        bankName: bankDetails.bankName,
        branchName: bankDetails.branchName,
        ifscCode: bankDetails.ifscCode,
        accountType: bankDetails.accountType,
      }
    };

    // Call the onSave function with the updated member data
    onSave(updatedMember);
    setShowUpdateDialog(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Member Information */}
         <div>
          <SectionHeader title="Member Information" />
          <div className="space-y-2">
            <input
              type="text"
              name="firstName"
              value={memberInfo.firstName}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={memberInfo.lastName}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={memberInfo.email}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Email"
            />
            <input
              type="tel"
              name="mobileNumber"
              value={memberInfo.mobileNumber}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Mobile Number"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={memberInfo.dateOfBirth}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            />
            <select
              name="gender"
              value={memberInfo.gender}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="address"
              value={memberInfo.address}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Address"
            />
            <input
              type="text"
              name="city"
              value={memberInfo.city}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={memberInfo.state}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="State"
            />
            <input
              type="text"
              name="country"
              value={memberInfo.country}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Country"
            />
          </div>
        </div>

        {/* Bank Details */}
        <div>
        <SectionHeader title="Bank Details" />
          <div className="space-y-2">
            <input
              type="text"
              name="accountHolder"
              value={bankDetails.accountHolder}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Account Holder Name"
            />
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Account Number"
            />
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Bank Name"
            />
            <input
              type="text"
              name="branchName"
              value={bankDetails.branchName}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Branch Name"
            />
            <input
              type="text"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="IFSC Code"
            />
            <select
              name="accountType"
              value={bankDetails.accountType}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-200 bg-gray-500 hover:bg-gray-800 dark:hover:bg-gray-100  dark:hover:text-gray-800 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="ml-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Save
        </button>
      </div>

      {/* Update Confirmation Dialog */}
      {showUpdateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800 w-96 transform transition-all duration-200 ease-out scale-100 opacity-100 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Update
            </h3>
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Member ID:</span>
                <span className="font-medium text-gray-900 dark:text-white">{member.memberId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {memberInfo.firstName} {memberInfo.lastName}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Are you sure you want to update this member's information?
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowUpdateDialog(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

<PasswordVerificationDialog
        isOpen={showPasswordVerification}
        onClose={() => setShowPasswordVerification(false)}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default EditMemberInfo;