# Environment Variables Setup

This document explains how to set up and use environment variables in this project.

## Backend Environment Variables

The backend uses a `.env` file located in the `backend/` directory. Create or modify this file with the following variables:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lms_forum_id
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=30d

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:8080
```

## Frontend Environment Variables

The frontend uses a `.env` file located in the root directory. Create or modify this file with the following variables:

```
# Frontend Environment Variables
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=LMS Forum ID
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

## How Environment Variables Work

### Backend

The backend uses the `dotenv` package to load environment variables from the `.env` file. These variables are accessed using `process.env.VARIABLE_NAME`.

Example:
```typescript
// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Access environment variables
const port = process.env.PORT || 3001;
const dbHost = process.env.DB_HOST || 'localhost';
```

### Frontend

The frontend uses Vite's built-in environment variable handling. All environment variables must be prefixed with `VITE_` to be exposed to the frontend code. These variables are accessed using `import.meta.env.VARIABLE_NAME`.

Example:
```typescript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const appName = import.meta.env.VITE_APP_NAME || 'LMS Forum ID';
```

## Docker Environment Variables

When running the application with Docker, environment variables are set in the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - PORT=8008
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=your_password
  - DB_NAME=lms_forum_id
  - DB_PORT=3306
  - JWT_SECRET=your_jwt_secret_key_here
  - FRONTEND_URL=http://localhost:8008
```

## Best Practices

1. **Never commit sensitive information**: Keep your `.env` files in `.gitignore` to avoid committing sensitive information.
2. **Provide default values**: Always provide default values when accessing environment variables to prevent errors.
3. **Document all variables**: Keep this document updated with all environment variables used in the project.
4. **Use different values for different environments**: Use different values for development, testing, and production environments.
