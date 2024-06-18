import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";
import Renamedata from "./layouts copy/reducer";


const rootReducer = combineReducers({
  // public
  Layout,
  Renamedata,
});

export default rootReducer;
