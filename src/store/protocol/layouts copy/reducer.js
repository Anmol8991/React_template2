import {
  CHANGE_USER,
  CHANGE_CLIENT,
} from './actionType';

//constants
import {
  users,
  clients,
} from "./layout";

const INIT_STATE = {
  users: users,
  clients: clients,
};


const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        users: action.payload,
      };

    case CHANGE_CLIENT:
      return {
        ...state,
        clients: action.payload,
      };

    default:
      return state;
  }
};

export default Layout;
