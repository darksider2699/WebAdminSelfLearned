import { getAllAccountRequest } from "../../api";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllAccount = createAsyncThunk(
    "account/getAllAccount",
    async () => {
      console.log("All Account Slice");
      const result = await getAllAccountRequest()
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
  const accountSlice = createSlice({
    name: "accountSlice",
    initialState: {
        accountList: {
        current: [],
        loading: false,
        success: false,
      },
    },
    reducers: {},
    extraReducers: {
      //Account List
      [getAllAccount.pending]: (state, action) => {
        state.accountList.loading = true;
      },
      [getAllAccount.fulfilled]: (state, action) => {
        state.accountList.current = action.payload;
        state.accountList.loading = false;
        state.accountList.success = true;
      },
      [getAllAccount.rejected]: (state, action) => {
        state.accountList.loading = false;
        state.accountList.success = false;
      },
    },
  });
  
  const { reducer, actions } = accountSlice;
  export const {} = actions;
  export default reducer;
  