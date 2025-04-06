const API_BASE_URL = 'http://localhost:3001';

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

interface AuthResponse {
  token?: string;
  message?: string;
  userId?: number;
  error?: string;
  success?: boolean;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Login failed'
    };
  }
};

export const register = async (user: User): Promise<AuthResponse> => {
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

export const resetPassword = async (token: string, newPassword: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
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

export const verifyEmail = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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

export const logout = async (): Promise<void> => {
  localStorage.removeItem('authToken');
};
