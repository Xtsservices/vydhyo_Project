import React from 'react';
import AppHeader from '../../components/header';
import SideHeader from '../../components/sideheader';
const BillingPage = () => {
  const billingData = [
    { name: 'Insurance Claims', value: 45000, color: '#3B82F6', percentage: 53 },
    { name: 'Direct Pay', value: 28000, color: '#10B981', percentage: 33 },
    { name: 'Pending', value: 12000, color: '#F59E0B', percentage: 14 }
  ];

  const recentBills = [
    { patientName: 'Sarah Johnson', type: 'Insurance Claim', amount: '₹3,500', date: '2024-06-01', status: 'Paid' },
    { patientName: 'Michael Chen', type: 'Direct Pay', amount: '₹2,800', date: '2024-06-02', status: 'Paid' },
    { patientName: 'Emily Rodriguez', type: 'Insurance Claim', amount: '₹4,200', date: '2024-06-03', status: 'Pending' },
    { patientName: 'David Thompson', type: 'Direct Pay', amount: '₹1,900', date: '2024-06-04', status: 'Paid' },
    { patientName: 'Lisa Anderson', type: 'Insurance Claim', amount: '₹3,800', date: '2024-06-05', status: 'Processing' }
  ];

  // Simple pie chart component
  const PieChart = ({ data }: { data: { name: string; value: number; color: string; percentage: number }[] }) => {
    const size = 200;
    const center = size / 2;
    const radius = 80;
    let cumulativePercentage = 0;

    const createPath = (percentage: number, startAngle: number) => {
      const angle = (percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="mb-4">
          {data.map((item: { percentage: number; color: string | undefined; }, index: React.Key | null | undefined) => {
            const startAngle = cumulativePercentage * 3.6 - 90;
            const path = createPath(item.percentage, startAngle);
            cumulativePercentage += item.percentage;
            
            return (
              <path
                key={index}
                d={path}
                fill={item.color}
                stroke="#fff"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        <div className="flex flex-col space-y-2">
          {data.map((item: { color: any; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
        <AppHeader />

        {/* Layout with SideHeader on the left */}
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 hidden md:block bg-white border-r">
                <SideHeader />
            </div>

            {/* Main Content */}
            
            <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing Summary</h1>
                    
                    {/* Billing Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-600 mb-2">Insurance Claims</h3>
                            <p className="text-3xl font-bold text-blue-600">₹45,000</p>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-600 mb-2">Direct Pay</h3>
                            <p className="text-3xl font-bold text-green-600">₹28,000</p>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-600 mb-2">Pending</h3>
                            <p className="text-3xl font-bold text-yellow-600">₹12,000</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Bills Table */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bills</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-2 font-medium text-gray-600">Patient Name</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-600">Type</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-600">Amount (₹)</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                                            <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBills.map((bill, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-2 text-gray-900">{bill.patientName}</td>
                                                <td className="py-3 px-2 text-gray-600">{bill.type}</td>
                                                <td className="py-3 px-2 text-gray-900 font-medium">{bill.amount}</td>
                                                <td className="py-3 px-2 text-gray-600">{bill.date}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        bill.status === 'Paid' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : bill.status === 'Pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {bill.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Billing Distribution Chart */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Distribution</h2>
                            <div className="flex justify-center">
                                <PieChart data={billingData} />
                            </div>
                        </div>
                    </div>

                    {/* Additional Billing Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Credit Card Payments</span>
                                    <span className="font-medium text-gray-900">65%</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Bank Transfers</span>
                                    <span className="font-medium text-gray-900">25%</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600">Cash Payments</span>
                                    <span className="font-medium text-gray-900">10%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <span className="font-medium text-blue-900">Generate Invoice</span>
                                    <p className="text-sm text-blue-600 mt-1">Create a new patient invoice</p>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                    <span className="font-medium text-green-900">Process Payment</span>
                                    <p className="text-sm text-green-600 mt-1">Record a patient payment</p>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                                    <span className="font-medium text-yellow-900">Send Reminder</span>
                                    <p className="text-sm text-yellow-600 mt-1">Send payment reminder to patients</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  );
};

export default BillingPage;