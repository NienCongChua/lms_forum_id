import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_PATH = path.join(__dirname, '../../GmailAPI/token.json'); // Đường dẫn tới file token.json

interface TokenData {
    token: string;
    refresh_token: string;
    token_uri: string;
    client_id: string;
    client_secret: string;
    scopes: string[];
    expiry: string; // Sử dụng expiry thay vì expiry_date
}

// Hàm để đọc và phân tích cú pháp token
async function loadCredentials(): Promise<TokenData> {
    try {
        const content = await fs.readFile(TOKEN_PATH, 'utf8');
        const credentials = JSON.parse(content);
        // Đảm bảo các trường cần thiết tồn tại
        if (!credentials.client_id || !credentials.client_secret || !credentials.refresh_token) {
            throw new Error('Missing required fields in token.json (client_id, client_secret, refresh_token)');
        }
        return credentials as TokenData;
    } catch (err) {
        console.error('Error loading token file:', err);
        throw new Error('Could not load token file.');
    }
}

// Hàm để tạo OAuth2 client và thiết lập credentials
async function getOAuth2Client() {
    const credentials = await loadCredentials();
    const { client_secret, client_id, refresh_token, token, expiry } = credentials;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.token_uri);

    oAuth2Client.setCredentials({
        access_token: token,
        refresh_token: refresh_token,
        expiry_date: new Date(expiry).getTime(), // Chuyển đổi expiry thành timestamp
        token_type: 'Bearer', // Thường là 'Bearer'
    });

    // Tự động làm mới token nếu cần
    oAuth2Client.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
            // Lưu refresh token mới nếu có
            credentials.refresh_token = tokens.refresh_token;
        }
        if (tokens.access_token) {
             credentials.token = tokens.access_token;
        }
        if (tokens.expiry_date) {
             credentials.expiry = new Date(tokens.expiry_date).toISOString(); // Cập nhật expiry mới
        }
        // Lưu lại token mới vào file (cần xử lý ghi file an toàn và đồng bộ)
        fs.writeFile(TOKEN_PATH, JSON.stringify(credentials, null, 2)).catch(err => {
             console.error('Error saving updated token:', err);
        });
        console.log("Access token refreshed and saved!");
    });


    return oAuth2Client;
}

// Hàm để gửi email sử dụng Gmail API
export async function sendEmail(to: string, subject: string, html: string) {
    try {
        const oAuth2Client = await getOAuth2Client();
        // Đảm bảo token còn hạn hoặc được làm mới trước khi gọi API
        await oAuth2Client.getAccessToken(); // Quan trọng: đảm bảo token hợp lệ

        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

        // Lấy địa chỉ email của người dùng đã xác thực từ token info
        let fromEmail: string = "me"; // Mặc định là 'me'
        // try {
        //     // Thử lấy thông tin người dùng để lấy email 'from'
        //     // Lưu ý: Cần scope 'https://www.googleapis.com/auth/userinfo.email' trong token.json để hoạt động
        //     const tokenInfo = await oAuth2Client.getTokenInfo(oAuth2Client.credentials.access_token!);
        //     fromEmail = tokenInfo.email;
        //     if (!fromEmail) {
        //         console.warn("Could not get email from token info, using 'me'. Ensure 'userinfo.email' scope is granted.");
        //         fromEmail = 'me';
        //     }
        // } catch (tokenInfoError) {
        //     console.warn("Error fetching token info, using 'me' as sender.", tokenInfoError);
        //     fromEmail = 'me';
        // }


        const emailLines = [
            `From: "LMS System" <${fromEmail === 'me' ? 'địa chỉ email của bạn' : fromEmail}>`, // Thay "LMS System" và địa chỉ email nếu cần
            `To: ${to}`,
            'Content-type: text/html;charset=utf-8', // Sử dụng utf-8 để hỗ trợ tiếng Việt
            'MIME-Version: 1.0',
            `Subject: =?utf-8?B?${Buffer.from(subject).toString('base64')}?=`, // Mã hóa subject sang base64 để hỗ trợ tiếng Việt
            '',
            html,
        ];
        const email = emailLines.join('\r\n');

        // Mã hóa email sang base64url
        const base64EncodedEmail = Buffer.from(email).toString('base64url');

        await gmail.users.messages.send({
            userId: 'me', // Luôn là 'me' để gửi từ tài khoản đã xác thực
            requestBody: {
                raw: base64EncodedEmail,
            },
        });

        console.log(`Email sent successfully to ${to}`);
    } catch (error: any) {
         console.error('Error sending email via Gmail API:', error.response?.data || error.message || error);
         // Ném lại lỗi để authService có thể bắt và xử lý
         throw new Error(`Failed to send email: ${error.message || 'Gmail API error'}`);
    }
}
