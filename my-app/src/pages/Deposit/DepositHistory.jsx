import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  CalendarIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/CommonCard";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import OverallCommonTable from "../../components/OverallCommonTable";
import { IoRemoveCircle } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import DatePickerWithRange from "../../components/Datepicker";
import {
  copyToClipboard,
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../../utils/Utils";
import PaymentProofViewer from "../../partials/deposit/PaymentProofViewer";

const StatsCard = ({ title, value, textColor = "text-black", icon: Icon }) => (
  <div className="p-2 flex flex-col items-center sm:items-start justify-center gap-1 transform transition-all duration-300">
    <h3
      className={`text-base font-medium text-center tracking-wide ${textColor}`}
    >
      {title}
    </h3>
    <p className="text-2xl font-bold text-center">{value}</p>
  </div>
);

const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow} text-white px-2 sm:px-4 py-1 text-xs sm:text-sm rounded-lg hover:opacity-90 cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </button>
);

const DepositHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const itemsPerPage = 10;

  // Sample data
  const [data, setData] = useState([
    {
      id: 1,
      srNo: 1,
      memberId: "FGFC",
      requestMode: "Bank",
      paymentProof: "/api/placeholder/400/320",
      depositAmountINR: "2000000",
      depositAmountUSD: "180.00",
      status: "Pending",
      requestDate: "2024-12-10 19:17:55",
      approvedDate: "",
      rejectDate: "",
      remark: "",
    },
    {
      id: 2,
      srNo: 2,
      memberId: "Shreeswami",
      requestMode: "USDT",
      paymentProof: "/api/placeholder/400/320",
      depositAmountINR: "200000",
      depositAmountUSD: "2173.91",
      status: "Pending",
      requestDate: "2024-12-14 16:33:45",
      approvedDate: "",
      rejectDate: "",
      remark: "",
    },
  ]);


  //for approval/rejection
  const handleStatusUpdate = (id, newStatus) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            approvedDate: newStatus === 'Approved' ? now : item.approvedDate,
            rejectDate: newStatus === 'Rejected' ? now : item.rejectDate,
          };
        }
        return item;
      })
    );
  };

  const handleRemarkUpdate = (id, remark) => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            remark: remark
          };
        }
        return item;
      })
    );
  };

  // Stats calculation
  const stats = useMemo(() => ({
    totalRequests: data.length,
    approved: data.filter((item) => item.status === "Approved").length,
    pending: data.filter((item) => item.status === "Pending").length,
    rejected: data.filter((item) => item.status === "Rejected").length,
  }), [data]);

  const columns = [
    { key: "srNo", label: "Sr No" },
    { key: "memberId", label: "Member ID" },
    { key: "requestMode", label: "Request Mode" },
    {
      key: "paymentProof",
      label: "Payment Proof",
      render: (row) => (
        <div className="flex justify-center">
          <PaymentProofViewer
            document={row.paymentProof}
            status={row.status}
            onApprove={() => handleStatusUpdate(row.id, 'Approved')}
            onReject={(remark) => {  
              handleStatusUpdate(row.id, 'Rejected');
              handleRemarkUpdate(row.id, remark);
            }}
          />
        </div>
      ),
    },
    { key: "depositAmountINR", label: "Deposit Amount(INR)" },
    { key: "depositAmountUSD", label: "Deposit Amount(USD)" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex justify-center">
                    <span
            className={`px-2  py-[2px] rounded-full text-[11px] ${
              row.status === "Approved"
                ? "bg-green-100 text-green-800"
                : row.status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {row.status}
          </span>

        </div>
      ),
    },
    { key: "requestDate", label: "Request Date" },
    {
      key: "approvedRejectDate",
      label: "Approved/Reject Date",
      render: (row) => <span>{row.approvedDate || row.rejectDate || "-"}</span>,
    },
    {
      key: "remark",
      label: "Remark",
      render: (row) => (
        <span className={`text-sm ${
          row.status === 'Rejected' ? 'text-red-600' : ''
        }`}>
          {row.status === 'Rejected' ? row.remark || '-' : '-'}
        </span>
      ),
    },
  ];

  // Export functions
  const handleBulkExport = (exportType) => {
    const selectedData = filteredData.filter((row) => selectedRows.has(row.id));
    const dataToExport = selectedRows.size > 0 ? selectedData : filteredData;

    switch (exportType) {
      case "copy":
        copyToClipboard(dataToExport);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        break;
      case "csv":
        exportToCSV(dataToExport, "deposit_history.csv");
        break;
      case "excel":
        exportToExcel(dataToExport, "deposit_history.xlsx");
        break;
      case "pdf":
        exportToPDF(dataToExport, "deposit_history.pdf");
        break;
      default:
        break;
    }
  };

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDateRange =
        (!dateRange.from || new Date(item.requestDate) >= dateRange.from) &&
        (!dateRange.to || new Date(item.requestDate) <= dateRange.to);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [data, searchTerm, statusFilter, dateRange]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ from: null, to: null });
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className="max-w-full sm:max-w-sm px-2 rounded-xl grid grid-cols-2 sm:grid-cols-4 mb-6 bg-white dark:bg-gray-800 shadow-lg">
              <StatsCard
                title="Total"
                value={stats.totalRequests}
                textColor="text-blue-600"
                icon={Users}
              />
              <StatsCard
                title="Approved"
                value={stats.approved}
                textColor="text-green-600"
                icon={CheckCircle}
              />
              <StatsCard
                title="Pending"
                value={stats.pending}
                textColor="text-yellow-600"
                icon={Clock}
              />
              <StatsCard
                title="Rejected"
                value={stats.rejected}
                textColor="text-red-600"
                icon={XCircle}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-4 py-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Deposit History
                </h2>
                <div className="flex items-center gap-2">
                  <ExportButton
                    label={
                      <div className="flex items-center gap-1">
                        <span>Copy</span>
                        {selectedRows.size > 0 && (
                          <span className="text-xs">({selectedRows.size})</span>
                        )}
                      </div>
                    }
                    bgColor="bg-blue-500"
                    shadow="shadow-md shadow-blue-600"
                    onClick={() => handleBulkExport("copy")}
                  />
                  <ExportButton
                    label={
                      <div className="flex items-center gap-1">
                        <span>CSV</span>
                        {selectedRows.size > 0 && (
                          <span className="text-xs">({selectedRows.size})</span>
                        )}
                      </div>
                    }
                    bgColor="bg-red-500"
                    shadow="shadow-md shadow-red-600"
                    onClick={() => handleBulkExport("csv")}
                  />
                  <ExportButton
                    label={
                      <div className="flex items-center gap-1">
                        <span>Excel</span>
                        {selectedRows.size > 0 && (
                          <span className="text-xs">({selectedRows.size})</span>
                        )}
                      </div>
                    }
                    bgColor="bg-yellow-500"
                    shadow="shadow-md shadow-yellow-600"
                    onClick={() => handleBulkExport("excel")}
                  />
                  <ExportButton
                    label={
                      <div className="flex items-center gap-1">
                        <span>PDF</span>
                        {selectedRows.size > 0 && (
                          <span className="text-xs">({selectedRows.size})</span>
                        )}
                      </div>
                    }
                    bgColor="bg-green-500"
                    shadow="shadow-md shadow-green-600"
                    onClick={() => handleBulkExport("pdf")}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
                {/*  Filter Section */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors cursor-pointer"
                    >
                      <IoRemoveCircle className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 w-full bg-gray-100 dark:bg-gray-900  rounded-lg shadow-sm p-3">
                  {/* Date Filter */}
                    <div className="">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Request Period
                        </span>
                      </div>
                      
                      <DatePickerWithRange
                        date={dateRange}
                        onDateChange={setDateRange}
                      />
                    </div>


                    {/* Search */}
                      <div className="flex flex-col justify-end">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                  
                      {/*Status Filter */}
                      <div className="flex flex-col justify-end">

                    <select
                        className=" px-4 py-2 text-xs sm:text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <OverallCommonTable
                data={paginatedData}
                columns={columns}
                selectedRows={selectedRows}
                onRowSelect={(id) => {
                  const newSelected = new Set(selectedRows);
                  if (newSelected.has(id)) {
                    newSelected.delete(id);
                  } else {
                    newSelected.add(id);
                  }
                  setSelectedRows(newSelected);
                }}
                selectAll={selectAll}
                onSelectAll={() => {
                  if (selectAll) {
                    setSelectedRows(new Set());
                  } else {
                    setSelectedRows(
                      new Set(paginatedData.map((row) => row.id))
                    );
                  }
                  setSelectAll(!selectAll);
                }}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {/* Copied Message */}
              {isCopied && (
                <div className="absolute right-[15rem] flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Copied! <FaCopy />
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
                <span className="text-xs sm:text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length} entries
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepositHistory;
