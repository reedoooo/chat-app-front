// actions/messageActions.js
import { createAction } from '@reduxjs/toolkit';

// assuming you have a messages slice in your redux store
export const addReaction = createAction('messages/addReaction', (messageId, reaction) => {
  return {
    payload: {
      messageId,
      reaction,
    },
  };
});
