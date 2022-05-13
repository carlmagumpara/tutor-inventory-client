export const updateState = (value) => dispatch => {
  dispatch(value);
  return Promise.resolve();
};