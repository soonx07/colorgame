import React, { useState, useMemo, useEffect } from 'react';

const DateFilterSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Date Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Registration Date Range
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              label="Start Date"
              value={regStartDate}
              onChange={(e) => setRegStartDate(e.target.value)}
            />
            <DateInput
              label="End Date"
              value={regEndDate}
              onChange={(e) => setRegEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Activation Date Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Activation Date Range
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              label="Start Date"
              value={actStartDate}
              onChange={(e) => setActStartDate(e.target.value)}
            />
            <DateInput
              label="End Date"
              value={actEndDate}
              onChange={(e) => setActEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the DateInput component for consistency
const DateInput = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-xs text-gray-600 dark:text-gray-400">
      {label}
    </label>
    <input
      type="date"
      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default DateFilterSection;