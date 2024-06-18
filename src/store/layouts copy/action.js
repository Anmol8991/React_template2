import {
  CHANGE_USER,
  CHANGE_CLIENT,
} from './actionType';

export const changeUser = user => ({
  type: CHANGE_USER,
  payload: user,
});


export const changeClient = client => ({
  type: CHANGE_CLIENT,
  payload: client,
});
