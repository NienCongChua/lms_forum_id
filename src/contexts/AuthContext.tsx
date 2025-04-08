import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Define the user interface
interface User {
  userId: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

// Define the token payload interface
interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  exp: number;
}

// Define the auth context interface
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  redirectToRoleDashboard: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Initialize auth state from localStorage or sessionStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (storedToken) {
      try {
        // Decode the token to get user information
        const decoded = jwtDecode<TokenPayload>(storedToken);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token is expired, clear storage
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          return;
        }
        
        // Set user and token state
        setUser({
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          firstName: decoded.firstName,
          lastName: decoded.lastName
        });
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        // Invalid token, clear storage
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
    }
  }, []);

  // Login function
  const login = (newToken: string, rememberMe: boolean) => {
    try {
      // Decode the token to get user information
      const decoded = jwtDecode<TokenPayload>(newToken);
      
      // Set user and token state
      setUser({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        firstName: decoded.firstName,
        lastName: decoded.lastName
      });
      setToken(newToken);
      setIsAuthenticated(true);
      
      // Store token based on remember me option
      if (rememberMe) {
        localStorage.setItem('authToken', newToken);
        sessionStorage.removeItem('authToken');
      } else {
        sessionStorage.setItem('authToken', newToken);
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  // Redirect to role-specific dashboard
  const redirectToRoleDashboard = () => {
    if (!user) return;
    
    switch (user.role.toLowerCase()) {
      case 'student':
        navigate('/dashboard');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated, 
      login, 
      logout,
      redirectToRoleDashboard
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
