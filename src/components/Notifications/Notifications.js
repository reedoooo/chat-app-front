// components/Notifications/Notifications.js
import React from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
