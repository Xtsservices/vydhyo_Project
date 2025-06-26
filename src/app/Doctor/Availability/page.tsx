"use client";   
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import AppHeader from '../components/header';
import SideHeader from '../components/sideheader';

const AvailabilityPage = () => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  type Entry = {
    id: string;
    type?: string; // 'schedule' or 'leave'
    fromDate: string;
    toDate: string;
    fromTime?: string;
    toTime?: string;
    status?: string;
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

  // API Configuration
  const API_BASE_URL = 'http://192.168.1.44:3000';
  const STAFF_ID = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  // Fetch schedules and leaves on component mount
  useEffect(() => {
    const fetchSchedulesAndLeaves = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/doctor/getSchedulesAndLeaves`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Process the response data which contains both schedules and leaves in one array
        if (result.data) {
          const schedules = result.data.filter((item: Entry) => !item.type || item.type === 'schedule');
          const leaves = result.data.filter((item: Entry) => item.type === 'leave');
          
          setScheduleData(schedules);
          setLeaveData(leaves);
        }
      } catch (error) {
        console.error('Error fetching schedules and leaves:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (STAFF_ID && token) {
      fetchSchedulesAndLeaves();
    }
  }, [STAFF_ID, token]);

  // API Functions
  const createSchedule = async (scheduleData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctor/createSchedule`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffId: STAFF_ID,
          fromDate: scheduleData.fromDate,
          toDate: scheduleData.toDate,
          fromTime: scheduleData.fromTime,
          toTime: scheduleData.toTime
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw error;
    }
  };

  const createLeave = async (leaveData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctor/createLeave`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffId: STAFF_ID,
          fromDate: leaveData.fromDate,
          toDate: leaveData.toDate
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating leave:', error);
      throw error;
    }
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

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
        isScheduled: scheduleData.some(item => 
          isDateInRange(dateString, formatDate(item.fromDate), formatDate(item.toDate))
        ),
        isLeave: leaveData.some(item => 
          isDateInRange(dateString, formatDate(item.fromDate), formatDate(item.toDate))
        )
      });
    }
    
    return days;
  };

  const isDateInRange = (date: string, fromDate: string, toDate: string) => {
    return date >= fromDate && date <= toDate;
  };

  const handleAdd = async () => {
    if (!formData.fromDate || !formData.toDate) return;
    
    setIsLoading(true);
    
    try {
      if (selectedAction === 'schedule') {
        // Call API to create schedule
        const result = await createSchedule(formData);
        const newEntry = {
          id: result.data.id,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          fromTime: formData.fromTime,
          toTime: formData.toTime,
          status: 'pending'
        };
        setScheduleData([...scheduleData, newEntry]);
        
        // Show success message
        alert('Schedule created successfully!');
      } else if (selectedAction === 'leave') {
        // Call API to create leave
        const result = await createLeave(formData);
        const newEntry = {
          id: result.data.id,
          type: 'leave',
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          status: result.data.status || 'pending'
        };
        setLeaveData([...leaveData, newEntry]);
        
        // Show success message
        alert('Leave created successfully!');
      }

      // Reset form
      setFormData({
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: ''
      });
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: 'schedule' | 'leave', id: string) => {
    try {
      setIsLoading(true);
      // You would need to implement delete API endpoints for schedules and leaves
      // For now, we'll just update the local state
      if (type === 'schedule') {
        setScheduleData(scheduleData.filter(s => s.id !== id));
      } else {
        setLeaveData(leaveData.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Error deleting entry. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
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
                disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                <input
                type="date"
                value={formData.toDate}
                onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                className="w-full px-2 py-1 border rounded text-xs"
                disabled={isLoading}
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
                  disabled={isLoading}
                />
                </div>
                
                <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To Time</label>
                <input
                  type="time"
                  value={formData.toTime}
                  onChange={(e) => setFormData({...formData, toTime: e.target.value})}
                  className="w-full px-2 py-1 border rounded text-xs"
                  disabled={isLoading}
                />
                </div>
              </div>
              )}

              <button
              onClick={handleAdd}
              disabled={!formData.fromDate || !formData.toDate || isLoading}
              className="w-full px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-300 flex items-center justify-center"
              >
              {isLoading ? (
                <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Saving...
                </>
              ) : (
                'Add'
              )}
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
            <span className="text-xs">Unavailable</span>
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
                {formatDate(item.fromDate)} - {formatDate(item.toDate)}
              </div>
              {item.fromTime && item.toTime && (
                <div className="text-green-600">
                {item.fromTime} - {item.toTime}
                </div>
              )}
              {item.status && (
                <div className={`text-xs ${
                  item.status === 'approved' ? 'text-green-600' : 
                  item.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  Status: {item.status}
                </div>
              )}
              </div>
              <button
              onClick={() => handleDelete('schedule', item.id)}
              className="text-green-600 hover:text-green-800"
              disabled={isLoading}
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
                {formatDate(item.fromDate)} - {formatDate(item.toDate)}
              </div>
              {item.status && (
                <div className={`text-xs ${
                  item.status === 'approved' ? 'text-green-600' : 
                  item.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  Status: {item.status}
                </div>
              )}
              </div>
              <button
              onClick={() => handleDelete('leave', item.id)}
              className="text-red-600 hover:text-red-800"
              disabled={isLoading}
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