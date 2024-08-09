import {createStore, combineReducers} from "redux"
import CountReducer from "../reducers/CountReducer"
import TodosReducer from "../reducers/TodoReducer";
let store=createStore(
    combineReducers({count:CountReducer, todos:TodosReducer}),
);
export default store;