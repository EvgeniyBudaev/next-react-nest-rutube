import {combineReducers} from "redux";
import {authSlice} from "@/store/auth/auth.slice";
import {api} from "@/store/api/api";
//import {reducer as toastrReducer} from 'react-redux-toastr'

export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    //toastr: toastrReducer
})