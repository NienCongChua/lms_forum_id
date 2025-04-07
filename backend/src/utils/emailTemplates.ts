/**
 * Email template for account verification
 * @param firstName User's first name
 * @param code Verification code
 * @returns HTML string for the email
 */
export function getVerificationEmailTemplate(firstName: string, code: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #3b82f6;
      padding: 20px;
      text-align: center;
      color: white;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f9fafb;
      padding: 30px;
      border-radius: 0 0 5px 5px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .code-container {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
      font-size: 24px;
      letter-spacing: 5px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #6b7280;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LMS FORUM ID</h1>
    </div>
    <div class="content">
      <h2>Verify Your Account</h2>
      <p>Hello ${firstName},</p>
      <p>Thank you for registering with LMS FORUM ID. To complete your registration and activate your account, please use the verification code below:</p>
      
      <div class="code-container">
        ${code}
      </div>
      
      <p>This code will expire in 24 hours. If you did not request this verification, please ignore this email.</p>
      
      <p>Best regards,<br>The LMS FORUM ID Team</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} LMS FORUM ID. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Email template for password reset
 * @param firstName User's first name
 * @param code Reset code
 * @returns HTML string for the email
 */
export function getPasswordResetEmailTemplate(firstName: string, code: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #3b82f6;
      padding: 20px;
      text-align: center;
      color: white;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f9fafb;
      padding: 30px;
      border-radius: 0 0 5px 5px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .code-container {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
      font-size: 24px;
      letter-spacing: 5px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #6b7280;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LMS FORUM ID</h1>
    </div>
    <div class="content">
      <h2>Reset Your Password</h2>
      <p>Hello ${firstName},</p>
      <p>We received a request to reset your password. To proceed with the password reset, please use the verification code below:</p>
      
      <div class="code-container">
        ${code}
      </div>
      
      <p>This code will expire in 1 hour. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
      
      <p>Best regards,<br>The LMS FORUM ID Team</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} LMS FORUM ID. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `;
}
