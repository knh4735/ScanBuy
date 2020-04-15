import { combineReducers } from "redux";
import view from "./view";
import cart from "./cart";

const rootReducer = combineReducers({
  view,
  cart
});

export default rootReducer;
