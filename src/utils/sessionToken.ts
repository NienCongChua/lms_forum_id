/**
 * Session token utility for managing temporary tokens
 * Used for registration and password reset flows
 */

// Keys for different session tokens
export const SESSION_KEYS = {
  RESET_PASSWORD: 'reset_password_session',
  REGISTRATION: 'registration_session',
};

// Session data interface
export interface SessionData {
  email: string;
  timestamp: number;
  token?: string;
  code?: string;
  countdownEnd?: number; // Timestamp when the countdown ends
  firstName?: string; // Added for registration
  lastName?: string; // Added for registration
  // Any other data needed for the session
}

/**
 * Generate a secure random token
 * @param length Length of the token (default: 32)
 * @returns A random token string
 */
export const generateToken = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const charactersLength = characters.length;

  // Create a Uint8Array with random values
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);

  // Convert random values to characters
  for (let i = 0; i < length; i++) {
    token += characters.charAt(randomValues[i] % charactersLength);
  }

  return token;
}

/**
 * Validate a token against the stored session token
 * @param key Session key
 * @param token Token to validate
 * @returns True if token is valid, false otherwise
 */
export const validateToken = (key: string, token: string): boolean => {
  const session = getSession(key);
  if (!session || !session.token) return false;

  return session.token === token;
}

/**
 * Save session data to sessionStorage
 * @param key Session key
 * @param data Session data
 */
export const saveSession = (key: string, data: Partial<SessionData>): void => {
  const sessionData: SessionData = {
    email: data.email || '',
    timestamp: Date.now(),
    ...data,
  };

  sessionStorage.setItem(key, JSON.stringify(sessionData));
};

/**
 * Get session data from sessionStorage
 * @param key Session key
 * @returns Session data or null if not found
 */
export const getSession = (key: string): SessionData | null => {
  const data = sessionStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as SessionData;
  } catch (error) {
    console.error('Error parsing session data:', error);
    return null;
  }
};

/**
 * Clear session data from sessionStorage
 * @param key Session key
 */
export const clearSession = (key: string): void => {
  sessionStorage.removeItem(key);
};

/**
 * Check if session is valid (not expired)
 * @param key Session key
 * @param maxAgeMs Maximum age in milliseconds (default: 30 minutes)
 * @returns True if session is valid, false otherwise
 */
export const isSessionValid = (key: string, maxAgeMs: number = 30 * 60 * 1000): boolean => {
  const session = getSession(key);
  if (!session) return false;

  const now = Date.now();
  return now - session.timestamp < maxAgeMs;
};
