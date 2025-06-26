"use client";   
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import AppHeader from '../components/header';
import SideHeader from '../components/sideheader';

const AvailabilityPage = () => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  type Entry = {
    id: number;
    fromDate: string;
    toDate: string;
    fromTime?: string;
    toTime?: string;
  };

  const [scheduleData, setScheduleData] = useState<Entry[]>([]);
  const [leaveData, setLeaveData] = useState<Entry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    fromTime: '',
    toTime: ''
  });

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        dateString,
        isScheduled: scheduleData.some(item => isDateInRange(dateString, item.fromDate, item.toDate)),
        isLeave: leaveData.some(item => isDateInRange(dateString, item.fromDate, item.toDate))
      });
    }
    
    return days;
  };

  const isDateInRange = (date: string | number, fromDate: string | number, toDate: string | number) => {
    return date >= fromDate && date <= toDate;
  };

  const handleAdd = () => {
    if (!formData.fromDate || !formData.toDate) return;
    
    const newEntry = {
      id: Date.now(),
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      fromTime: formData.fromTime,
      toTime: formData.toTime
    };

    if (selectedAction === 'schedule') {
      setScheduleData([...scheduleData, newEntry]);
    } else if (selectedAction === 'leave') {
      setLeaveData([...leaveData, newEntry]);
    }

    // Reset form
    setFormData({
      fromDate: '',
      toDate: '',
      fromTime: '',
      toTime: ''
    });
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
    <AppHeader />
    <div className="flex">
      <div className="hidden lg:block mt-15">
      <SideHeader />
      </div>
      <div className="flex-1 min-h-screen bg-gray-50 p-3">
      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-blue-100 px-3 py-2 flex items-center space-x-2">
          <div className="bg-blue-500 p-1 rounded-full">
          <Calendar className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Doctor Availability</span>
        </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Left Side - Forms */}
        <div className="space-y-3">
          
          {/* Action Selection and Form */}
          <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="space-y-3">
            
            {/* Dropdown Selection */}
            <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm flex items-center justify-between hover:bg-blue-600"
            >
              <span>{selectedAction ? (selectedAction === 'schedule' ? 'Schedule' : 'Leave') : 'Select Action'}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => {
                setSelectedAction('schedule');
                setIsDropdownOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                Schedule
              </button>
              <button
                onClick={() => {
                setSelectedAction('leave');
                setIsDropdownOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-t"
              >
                Leave
              </button>
              </div>
            )}
            </div>

            {/* Form Fields */}
            {selectedAction && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
                <input
                type="date"
                value={formData.fromDate}
                onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                className="w-full px-2 py-1 border rounded text-xs"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                <input
                type="date"
                value={formData.toDate}
                onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                className="w-full px-2 py-1 border rounded text-xs"
                />
              </div>
              </div>
              
              {selectedAction === 'schedule' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">From Time</label>
                <input
                  type="time"
                  value={formData.fromTime}
                  onChange={(e) => setFormData({...formData, fromTime: e.target.value})}
                  className="w-full px-2 py-1 border rounded text-xs"
                />
                </div>
                
                <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To Time</label>
                <input
                  type="time"
                  value={formData.toTime}
                  onChange={(e) => setFormData({...formData, toTime: e.target.value})}
                  className="w-full px-2 py-1 border rounded text-xs"
                />
                </div>
              </div>
              )}

              <button
              onClick={handleAdd}
              disabled={!formData.fromDate || !formData.toDate}
              className="w-full px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-300"
              >
              Add
              </button>
            </div>
            )}
          </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-sm p-3">
          <h3 className="text-sm font-semibold mb-2">Legend</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <span className="text-xs">Scheduled</span>
            </div>
            <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-200 rounded"></div>
            <span className="text-xs">Leave</span>
            </div>
            <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-200 rounded"></div>
            <span className="text-xs">Both</span>
            </div>
          </div>
          </div>
        </div>

        {/* Right Side - Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-1">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {dayNames.map(day => (
            <div key={day} className="p-1 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
            ))}
            
            {/* Calendar Days */}
            {generateCalendarDays().map((dayData, index) => (
            <div key={index} className="aspect-square">
              {dayData ? (
              <div
                className={`w-full h-full flex items-center justify-center text-xs rounded cursor-pointer ${
                dayData.isScheduled && dayData.isLeave
                  ? 'bg-purple-200 text-purple-800 font-medium'
                  : dayData.isScheduled
                  ? 'bg-green-200 text-green-800 font-medium'
                  : dayData.isLeave
                  ? 'bg-red-200 text-red-800 font-medium'
                  : 'hover:bg-gray-100'
                }`}
              >
                {dayData.day}
              </div>
              ) : (
              <div className="w-full h-full"></div>
              )}
            </div>
            ))}
          </div>
          </div>
        </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Schedule Summary */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <h3 className="text-sm font-semibold mb-2">Scheduled ({scheduleData.length})</h3>
          {scheduleData.length === 0 ? (
          <p className="text-gray-500 text-xs">No scheduled periods</p>
          ) : (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {scheduleData.map(item => (
            <div key={item.id} className="flex justify-between items-center p-2 bg-green-50 rounded text-xs">
              <div>
              <div className="font-medium text-green-800">
                {item.fromDate} - {item.toDate}
              </div>
              {item.fromTime && item.toTime && (
                <div className="text-green-600">
                {item.fromTime} - {item.toTime}
                </div>
              )}
              </div>
              <button
              onClick={() => setScheduleData(scheduleData.filter(s => s.id !== item.id))}
              className="text-green-600 hover:text-green-800"
              >
              <X className="h-3 w-3" />
              </button>
            </div>
            ))}
          </div>
          )}
        </div>

        {/* Leave Summary */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <h3 className="text-sm font-semibold mb-2">Leave ({leaveData.length})</h3>
          {leaveData.length === 0 ? (
          <p className="text-gray-500 text-xs">No leave periods</p>
          ) : (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {leaveData.map(item => (
            <div key={item.id} className="flex justify-between items-center p-2 bg-red-50 rounded text-xs">
              <div>
              <div className="font-medium text-red-800">
                {item.fromDate} - {item.toDate}
              </div>
              </div>
              <button
              onClick={() => setLeaveData(leaveData.filter(l => l.id !== item.id))}
              className="text-red-600 hover:text-red-800"
              >
              <X className="h-3 w-3" />
              </button>
            </div>
            ))}
          </div>
          )}
        </div>
        </div>
      </div>
      </div>
    </div>
    </>
    
  );
};

export default AvailabilityPage;