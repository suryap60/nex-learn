export const API = {
    AUTH: {
        SEND_OTP: "/auth/send-otp",
        VERIFY_OTP: "/auth/verify-otp",
        CREATE_PROFILE: "/auth/create-profile",
        REFRESH: "/auth/token-refresh",
    },
} as const;