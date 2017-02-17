import { AJAX_REQUEST } from '../constants/ActionTypes';
// import { handleError } from 'actionCreators/serverActionCreators';

/**
  Enables async methods to dispatch actions after call completes or dispatch error on fail.
**/
export default store => next => action => { // eslint-disable-line consistent-return
  if (action.type !== AJAX_REQUEST) return next(action);
  const { promise, onSuccess } = action.payload;
  const { dispatch } = store;
  promise
  .then((res) => {
    onSuccess(dispatch, res);
  })
  .catch((err) => {
    // handleError(err, dispatch);
    console.log(':(', err);
  });
};
