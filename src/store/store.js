import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import checkinReducer from "./slices/medicalUserSlice"
import covidTestReducer from "./slices/covidTestSlice"
import questionReducer from "./slices/questionSlice"
import covidCaseReducer from "./slices/covidCaseSlice"
import accountReducer from "./slices/accountSlice"
const rootReducer = {
    userStore: userReducer,
    checkinListStore: checkinReducer,
    covidTestStore: covidTestReducer,
    questionStore: questionReducer,
    covidCaseStore: covidCaseReducer,
    accountStore: accountReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;