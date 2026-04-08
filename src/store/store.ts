import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/features/auth/slice";
import examReducer from "@/src/features/exam/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        exam: examReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;