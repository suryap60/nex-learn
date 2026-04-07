// Utility functions for managing authentication tokens
// Stores tokens in both localStorage and cookies for client and server access

export const setAuthToken = (token: string) => {
  // Store in localStorage for client-side access
  localStorage.setItem("access", token);
  
};

export const getAuthToken = (): string | null => {
  // Try localStorage first
  if (typeof window !== 'undefined') {
    return localStorage.getItem("access");
  }
  return null;
};

export const removeAuthToken = () => {
  // Remove from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem("access");
    
    // Clear all session storage data to prevent showing previous user's data
    sessionStorage.clear();
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
