export const createAction =
  (type, payloadCreator = (value) => value) =>
    (value) => ({
      type,
      payload: payloadCreator(value),
    });

export const createThunkAction = (type, fn) => async (dispatch, getState) => {
  try {
    const res = await fn();
    dispatch({ type, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};


