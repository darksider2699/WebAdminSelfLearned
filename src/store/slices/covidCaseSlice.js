import { getAllCovidCaseRequest, deleteCaseRequest,createNewCaseRequest } from "../../api";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCovidCase = createAsyncThunk(
    "covidCase/getAllCovidCase",
    async () => {
      console.log("Covid Case Slice");
      const result = await getAllCovidCaseRequest()
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
  export const deleteCase = createAsyncThunk(
    "covidCase/deleteCase",
    async (param) => {
      await deleteCaseRequest(
        param.id,
      )
        .then((res) => {
          param.cb();
          console.log("res data", res.data)
          return res.data;
        })
        .catch((message) => {
          toast.error("Get Data Fail. Check Your Network !");
          console.log("msg error", message);
          throw new Error(message);
        });
    }
  );
  export const createNewCase = createAsyncThunk(
    "covidCase/createNewCase",
    async (param) => {
      console.log("Hello covid case slice", param);
      const result = await createNewCaseRequest(
        param.id,
        param.covidStatus,
        param.dateRecord,
        param.cb()
      )
        .then((res) => {
          param.cb();
          toast(res);
          console.log("Success", res)
          return res;
        })
        .catch((message) => {
          toast.error("Get Data Fail. Check Your Network !");
          toast.error(message);
          console.log("Fail", message)
          throw new Error(message);
        });
      return result;
    }
  );
  const covidCaseSlice = createSlice({
  name: "covidCaseSlice",
  initialState: {
    covidCaseList: {
      current: [],
      loading: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: {
    //medicalUserList
    [getAllCovidCase.pending]: (state, action) => {
      state.covidCaseList.loading = true;
    },
    [getAllCovidCase.fulfilled]: (state, action) => {
      state.covidCaseList.current = action.payload;
      state.covidCaseList.loading = false;
      state.covidCaseList.success = true;
    },
    [getAllCovidCase.rejected]: (state, action) => {
      state.covidCaseList.loading = false;
      state.covidCaseList.success = false;
    },
  },
});

const { reducer, actions } = covidCaseSlice;
export const {} = actions;
export default reducer;
