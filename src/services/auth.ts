const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface RegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

interface User {
  userId: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  token?: string;
  user?: User;
  message?: string;
  userId?: number;
  error?: string;
  success?: boolean;
}

export const login = async (email: string, password: string, rememberMe: boolean = false): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');

    if (data.token) {
      // Store token based on remember me option
      if (rememberMe) {
        localStorage.setItem('authToken', data.token);
        sessionStorage.removeItem('authToken');
      } else {
        sessionStorage.setItem('authToken', data.token);
        localStorage.removeItem('authToken');
      }
    }

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Login failed'
    };
  }
};

export const register = async (user: RegisterUser): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role || 'student'
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Registration failed'
    };
  }
};

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Password reset failed');

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Password reset failed'
    };
  }
};

export const verifyResetCode = async (email: string, code: string): Promise<AuthResponse> => {
  try {
    // Make a request to verify the reset code without changing the password
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-reset-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Code verification failed');

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Code verification failed',
      success: false
    };
  }
};

export const resetPassword = async (email: string, code: string, newPassword: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Password reset failed');

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Password reset failed'
    };
  }
};

export const verifyEmail = async (email: string, code: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Email verification failed');

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Email verification failed'
    };
  }
};

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const resendVerificationCode = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to resend verification code');

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to resend verification code'
    };
  }
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};
