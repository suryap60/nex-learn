export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  qualification: string;
  profile_image: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  login?: boolean;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  user?: User;
}

export interface ProfileData {
  mobile: string;
  name: string;
  email: string;
  qualification: string;
  profile_image: File | string | null;
}
