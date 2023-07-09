import { createAction } from '@reduxjs/toolkit';

export const addNotification = createAction('notifications/addNotification');

// // actions/notificationActions.js
// export const addNotification = (notification) => ({
//   type: 'ADD_NOTIFICATION',
//   payload: notification,
// });
