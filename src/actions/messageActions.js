import { createAction } from '@reduxjs/toolkit';

export const loadMessages = createAction('messages/loadMessages');
export const saveMessages = createAction('messages/saveMessages', (messages) => { /* logic */ });
export const addReaction = createAction('messages/addReaction', (messageId, reaction) => {
  return { payload: { messageId, reaction } };
});

// // actions/messageActions.js
// import { createAction } from '@reduxjs/toolkit';

// // assuming you have a messages slice in your redux store
// export const addReaction = createAction('messages/addReaction', (messageId, reaction) => {
//   return {
//     payload: {
//       messageId,
//       reaction,
//     },
//   };
// });
// // 