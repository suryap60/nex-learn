import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    token: string | null;
    tempMobile: string | null; // To persist mobile between Phone and OTP screens
}

const initialState: AuthState = {
    user: null,
    token: null,
    tempMobile: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTempMobile: (state, action: PayloadAction<string>) => {
            state.tempMobile = action.payload;
        },
        setAuth: (state, action: PayloadAction<{ user: any; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("access_token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
    },
});

export const { setTempMobile, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;