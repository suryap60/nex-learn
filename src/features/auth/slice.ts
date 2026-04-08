import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("access_token", action.payload.token);
      if (action.payload.refreshToken) {
        localStorage.setItem("refresh_token", action.payload.refreshToken);
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;