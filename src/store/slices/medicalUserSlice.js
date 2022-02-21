import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllMedicalInformationRequest,
  getCheckinByDateRequest,
  getCheckoutByDateRequest,
  getCheckoutByDateAndIdUserRequest,
} from "../../api";
import { toast } from "react-toastify";

export const getAllMedicalInformation = createAsyncThunk(
  "checkin/getListCheckin",
  async () => {
    const result = await getAllMedicalInformationRequest()
      .then((res) => {
        return res;
      })
      .catch((message) => {
        toast.error("Get Data Fail. Check Your Network !");
        throw new Error(message);
      });
    return result;
  }
);
export const getCheckinByDate = createAsyncThunk(
  "user/getCheckinByDate",
  async (param) => {
    console.log("param", param);
    const result = await getCheckinByDateRequest(param ? param : "")
      .then((res) => res)
      .catch((message) => message);
    return result;
  }
);
export const getCheckoutByDate = createAsyncThunk(
  "user/getCheckoutByDate",
  async (param) => {
    console.log("param", param);
    const result = await getCheckoutByDateRequest(param ? param : "")
      .then((res) => res)
      .catch((message) => message);
    return result;
  }
);
export const getCheckoutByDateAndIdUser = createAsyncThunk(
  "user/getCheckoutByDateAndIdUser",
  async (param) => {
    console.log("param", param);
    const result = await getCheckoutByDateAndIdUserRequest(param ? param : "")
      .then((res) => res)
      .catch((message) => message);
    return result;
  }
);
const checkinSlice = createSlice({
  name: "checkinSlice",
  initialState: {
    medicalUserList: {
      current: {},
      loading: false,
      success: false,
    },
    checkinList: {
      current: [],
      loading: false,
      success: false,
    },
    checkoutList: {
      current: [],
      loading: false,
      success: false,
    },
    userCheckoutList: {
      current: {},
      loading: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: {
    //medicalUserList
    [getAllMedicalInformation.pending]: (state, action) => {
      state.medicalUserList.loading = true;
    },
    [getAllMedicalInformation.fulfilled]: (state, action) => {
      state.medicalUserList.current = action.payload;
      state.medicalUserList.loading = false;
      state.medicalUserList.success = true;
    },
    [getAllMedicalInformation.rejected]: (state, action) => {
      state.medicalUserList.loading = false;
      state.medicalUserList.success = false;
    },
    //Checkedin List
    [getCheckinByDate.pending]: (state) => {
      state.checkinList.loading = true;
    },
    [getCheckinByDate.fulfilled]: (state, action) => {
      state.checkinList.current = action.payload;
      state.checkinList.loading = false;
      state.checkinList.success = true;
    },
    [getCheckinByDate.rejected]: (state) => {
      state.checkinList.loading = false;
      state.checkinList.success = false;
    },
    //Checkout List
    [getCheckoutByDate.pending]: (state) => {
      state.checkoutList.loading = true;
    },
    [getCheckoutByDate.fulfilled]: (state, action) => {
      state.checkoutList.current = action.payload;
      state.checkoutList.loading = false;
      state.checkoutList.success = true;
    },
    [getCheckoutByDate.rejected]: (state) => {
      state.checkoutList.loading = false;
      state.checkoutList.success = false;
    },
    //User checkout List
    [getCheckoutByDateAndIdUser.pending]: (state) => {
      state.userCheckoutList.loading = true;
    },
    [getCheckoutByDateAndIdUser.fulfilled]: (state, action) => {
      state.userCheckoutList.current = action.payload;
      state.userCheckoutList.loading = false;
      state.userCheckoutList.success = true;
    },
    [getCheckoutByDateAndIdUser.rejected]: (state) => {
      state.userCheckoutList.loading = false;
      state.userCheckoutList.success = false;
    },
  },
});

const { reducer, actions } = checkinSlice;
export const {} = actions;
export default reducer;
