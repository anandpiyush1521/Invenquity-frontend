import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Bell, Clock, XCircle, Trash, EyeOff } from "lucide-react";
import Sidebar from "./Sidebar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showOld, setShowOld] = useState(false);

  useEffect(() => {
    // Fetch notifications from the API
    fetch("http://localhost:8080/api/invenquity/notifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "warning":
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <Bell className="text-blue-500" size={20} />;
    }
  };

  const handleClearNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const isToday = (date) => {
    const today = new Date();
    const notificationDate = new Date(date);
    return (
      today.getFullYear() === notificationDate.getFullYear() &&
      today.getMonth() === notificationDate.getMonth() &&
      today.getDate() === notificationDate.getDate()
    );
  };

  const todayNotifications = notifications.filter((notification) => isToday(notification.createdAt));

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-4 p-8 w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className={`text-gray-700 ${todayNotifications.length > 0 ? 'text-green-500' : ''}`} size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          </div>
          <div className="flex gap-4">
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                <Trash size={16} />
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowOld(!showOld)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              <EyeOff size={16} />
              {showOld ? "Hide Old" : "Show Old"}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.filter(notification => showOld || isToday(notification.createdAt)).map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 border rounded-lg shadow hover:shadow-md transition-shadow duration-200 ${isToday(notification.createdAt) ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200'}`}
            >
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-grow">
                <p className="text-gray-700 font-medium">{notification.message}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock size={14} className="mr-1" />
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => handleClearNotification(notification.id)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Remove notification"
              >
                <XCircle size={20} />
              </button>
            </div>
          ))}

          {todayNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-500">No notifications from today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
