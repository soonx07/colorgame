import React from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
import { IoRemoveCircle } from "react-icons/io5";
import DatePickerWithRange from '../../components/Datepicker';

const DateRangeFilter = ({ 
  title, 
  dateRange,
  onDateChange,
  indicatorColor = "bg-blue-500",
  bgColor = "bg-blue-50",
  textColor = "text-blue-600"
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 ${indicatorColor} rounded-full`}></div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {title}
        </span>
      </div>
      
      <DatePickerWithRange 
        className="w-full"
        date={dateRange}
        onDateChange={onDateChange}
      />
    </div>
  );
};

export default DateRangeFilter;