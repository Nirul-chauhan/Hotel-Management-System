import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiCalendar, FiHome, FiClipboard, FiBell } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Guest Registration",
      description: "Register new guests and maintain guest records",
      icon: FiUsers,
      path: '/Register',
      bgColor: "bg-blue-500"
    },
    {
      title: "Room Booking",
      description: "Book rooms and manage availability",
      icon: FiCalendar,
      path: '/Book',
      bgColor: "bg-green-500"
    },
    {
      title: "Manage Hotels",
      description: "Update hotel details and pricing",
      icon: FiHome,
      path: '/manage_hotels',
      bgColor: "bg-purple-500"
    },
    {
      title: "View Bookings",
      description: "Check all reservations and status",
      icon: FiClipboard,
      path: '/bookings',
      bgColor: "bg-orange-500"
    }
  ];

  const updates = [
    "Room 305 maintenance scheduled for tomorrow",
    "3 new bookings received today",
    "Check-in reminder: 2 guests arriving at 2 PM"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(service.path)}
                className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiBell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Updates
            </h2>
          </div>
          <div className="space-y-3">
            {updates.map((update, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{update}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
