// reducers/notificationReducer.js
const notificationReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return [...state, action.payload];
  default:
    return state;
  }
};

export default notificationReducer;
