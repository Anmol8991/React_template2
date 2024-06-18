import { all, fork } from "redux-saga/effects";
import LayoutSaga from "./layouts/saga";
export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),

  ]);
}
