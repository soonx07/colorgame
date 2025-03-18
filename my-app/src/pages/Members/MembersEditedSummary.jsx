import React, { useState, useMemo } from 'react';
import { CalendarDays, Search, ArrowUpDown, Filter, Download, FileDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge
} from "../../components/CommonCard";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import CommonTable from '../../components/CommonTable';
import OverallCommonTable from '../../components/OverallCommonTable';

const MembersEditedSummary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedFields, setSelectedFields] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const columns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'memberId', label: 'Member ID' },
    { key: 'memberName', label: 'Member Name' },
    { key: 'field', label: 'Field' },
    { key: 'oldValue', label: 'Old Value' },
    { key: 'newValue', label: 'New Value' },
    { key: 'editedBy', label: 'Edited By' },
    { key: 'reason', label: 'Reason' }
  ];

  // Mock data for edit history
  const editHistory = [
    {
      id: 1,
      memberId: "MEM001",
      memberName: "John Doe",
      field: "Mobile Number",
      oldValue: "+1-555-0123",
      newValue: "+1-555-0124",
      editedBy: "Admin",
      timestamp: "2025-02-13T10:30:00",
      reason: "User request",
    },
    {
      id: 2,
      memberId: "MEM001",
      memberName: "John Doe",
      field: "Bank Details",
      oldValue: "Account: 1234567",
      newValue: "Account: 7654321",
      editedBy: "Admin",
      timestamp: "2025-02-13T09:15:00",
      reason: "Bank update",
    },
    // Add more history items as needed
  ];

  const fields = [
    "Personal Info",
    "Contact Details",
    "Bank Details",
    "KYC Status",
    "Account Status",
  ];

  // Filter and sort logic
  const filteredHistory = useMemo(() => {
    return editHistory
      .filter(item => {
        const matchesSearch = 
          item.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.memberId.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFields = 
          selectedFields.length === 0 || 
          selectedFields.includes(item.field);
        
        const matchesDate = 
          (!dateRange.start || new Date(item.timestamp) >= new Date(dateRange.start)) &&
          (!dateRange.end || new Date(item.timestamp) <= new Date(dateRange.end));
        
        return matchesSearch && matchesFields && matchesDate;
      })
      .sort((a, b) => {
        const direction = sortConfig.direction === 'asc' ? 1 : -1;
        return direction * (new Date(a[sortConfig.key]) - new Date(b[sortConfig.key]));
      });
  }, [editHistory, searchTerm, selectedFields, dateRange, sortConfig]);

  // Stats calculations
  const stats = useMemo(() => {
    return {
      totalEdits: editHistory.length,
      todayEdits: editHistory.filter(item => 
        new Date(item.timestamp).toDateString() === new Date().toDateString()
      ).length,
      uniqueMembers: new Set(editHistory.map(item => item.memberId)).size
    };
  }, [editHistory]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFieldToggle = (field) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const transformedData = filteredHistory.map(item => ({
    ...item,
    // Add any required fields that CommonTable expects
    fullname: item.memberName,
    // Format timestamp if needed
    timestamp: new Date(item.timestamp).toLocaleString()
  }));

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Edits</CardTitle>
                  <FileDown className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEdits}</div>
                  <p className="text-xs text-gray-500">All time edit records</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Edits</CardTitle>
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.todayEdits}</div>
                  <p className="text-xs text-gray-500">Changes made today</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Members Modified</CardTitle>
                  <Download className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uniqueMembers}</div>
                  <p className="text-xs text-gray-500">Unique members edited</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Edit History Filters</CardTitle>
                <CardDescription>Filter and search through all member modifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search by member name or ID..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid col-span-2 gap-2">
                    <div className='flex flex-row gap-2'>

                    <input
                      type="date"
                      className=" px-4 py-2 h-10 w-full border rounded-lg"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    />
                    <input
                      type="date"
                      className="w-full px-4 py-2 h-10 border rounded-lg"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {fields.map(field => (
                      <Badge
                        key={field}
                        variant={selectedFields.includes(field) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleFieldToggle(field)}
                      >
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Table */}
            <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit History</CardTitle>
        </CardHeader>
        <CardContent>
          <OverallCommonTable
            data={transformedData}
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            // Set these props to false/empty to hide unnecessary UI elements
            selectedRows={new Set()}
            onRowSelect={() => {}}
            selectAll={false}
            onSelectAll={() => {}}
            memberStatus={{}}
            pinStatus={{}}
            levelStatus={{}}
            onEditClick={() => {}}
            onBlockToggle={() => {}}
            onPinToggle={() => {}}
            onLevelToggle={() => {}}
            onLoginClick={() => {}}
            lastEdited={{}}
          />
        </CardContent>
      </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MembersEditedSummary;