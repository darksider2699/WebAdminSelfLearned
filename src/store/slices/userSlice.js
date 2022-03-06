import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInRequest, signupRequest, getAllRoleRequest } from "../../api";
import { toast } from "react-toastify";

export const login = createAsyncThunk("user/login", async (param, thunkAPI) => {
  const { username, password, cb } = param;
  const result = await signInRequest({ username, password, cb })
    .then((res) => {
      console.log("res", res);
      localStorage.setItem("roles", JSON.stringify(res.roles));
      localStorage.setItem("token", res.accessToken);
      cb();
      return res;
    })
    .catch((message) => {
      toast.error("Login Fail. Check Your Network !");
      throw new Error(message);
    });
  return result;
});

export const signup = createAsyncThunk(
  "user/signup",
  async (param, thunkAPI) => {
    console.log("signup slice", param)
    const { username, password, role } = param.submitData;
    const cb = param.cb;
    const result = await signupRequest({ username, password, role, cb })
      .then((res) => {
        console.log("res", res);
        param.cb();
        return res;
      })
      .catch((message) => {
        toast.error("Create account Fail. Check Your Network !");
        console.log("Message error", message)
        throw new Error(message);
      });
    return result;
  }
);
export const getAllRole = createAsyncThunk(
  "user/getRoles",
  async () => {
    console.log("user get all role")
    const result = await getAllRoleRequest()
      .then((res) => {
        console.log("res", res);
        return res;
      })
      .catch((message) => {
        toast.error("Get All Role fail !");
        throw new Error(message);
      });
    return result;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("roles");
  localStorage.removeItem("token");
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    account: {
      current: {},
      loading: false,
      success: false,
    },
    roleList: {
      current: [],
      loading: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: {
    //login
    [login.pending]: (state, action) => {
      state.account.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.account.current = action.payload;
      state.account.loading = false;
      state.account.success = true;
    },
    [login.rejected]: (state, action) => {
      state.account.current = {};
      state.account.loading = false;
      state.account.success = false;
    },
    //role
    [getAllRole.pending]: (state, action) => {
      state.roleList.loading = true;
    },
    [getAllRole.fulfilled]: (state, action) => {
      state.roleList.current = action.payload;
      state.roleList.loading = false;
      state.roleList.success = true;
    },
    [getAllRole.rejected]: (state, action) => {
      state.roleList.current = [];
      state.roleList.loading = false;
      state.roleList.success = false;
    },

    //logout
    [logout.fulfilled]: (state, action) => {
      state.account.current = {};
      state.account.loading = false;
      state.account.success = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
