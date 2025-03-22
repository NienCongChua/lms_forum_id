# LMS Forum ID

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dự án diễn đàn học tập trực tuyến (Learning Management System Forum) được xây dựng bằng React và TypeScript.

[English](./README.md) | [Tiếng Việt](./README.vi.md)

</div>

## 📋 Mục lục

- [🚀 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [💻 Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [🛠️ Cài đặt và Chạy](#️-cài-đặt-và-chạy)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [🔧 Cấu hình](#-cấu-hình)
- [📝 Scripts](#-scripts)
- [🤝 Đóng góp](#-đóng-góp)
- [📄 License](#-license)
- [👥 Tác giả](#-tác-giả)
- [🙏 Cảm ơn](#-cảm-ơn)

## 🚀 Công nghệ sử dụng

<table>
  <tr>
    <td align="center" width="96">
      <a href="https://reactjs.org/">
        <img src="https://api.iconify.design/logos:react.svg" width="48" height="48" alt="React" />
      </a>
    </td>
    <td align="center" width="96">
      <a href="https://www.typescriptlang.org/">
        <img src="https://api.iconify.design/logos:typescript-icon.svg" width="48" height="48" alt="TypeScript" />
      </a>
    </td>
    <td align="center" width="96">
      <a href="https://vitejs.dev/">
        <img src="https://api.iconify.design/logos:vite.svg" width="48" height="48" alt="Vite" />
      </a>
    </td>
    <td align="center" width="96">
      <a href="https://www.docker.com/">
        <img src="https://api.iconify.design/logos:docker-icon.svg" width="48" height="48" alt="Docker" />
      </a>
    </td>
    <td align="center" width="96">
      <a href="https://nginx.org/">
        <img src="https://api.iconify.design/logos:nginx.svg" width="48" height="48" alt="Nginx" />
      </a>
    </td>
    <td align="center" width="96">
      <a href="https://tailwindcss.com/">
        <img src="https://api.iconify.design/logos:tailwindcss-icon.svg" width="48" height="48" alt="TailwindCSS" />
      </a>
    </td>
  </tr>
</table>

## 💻 Yêu cầu hệ thống

- <img src="https://api.iconify.design/logos:nodejs-icon.svg" width="20" height="20" /> Node.js >= 18
- <img src="https://api.iconify.design/logos:docker-icon.svg" width="20" height="20" /> Docker và Docker Compose
- <img src="https://api.iconify.design/logos:npm-icon.svg" width="20" height="20" /> npm hoặc yarn
- <img src="https://api.iconify.design/logos:git-icon.svg" width="20" height="20" /> Git

## 🛠️ Cài đặt và Chạy

### Phương án 1: Chạy trực tiếp

<details>
<summary>Xem hướng dẫn chi tiết</summary>

1. Clone repository:
```bash
git clone [https://github.com/NienCongChua/lms_forum_id.git]
cd lms_forum_id
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:8080`

</details>

### Phương án 2: Chạy bằng Docker

<details>
<summary>Xem hướng dẫn chi tiết</summary>

1. Build và chạy container:
```bash
docker-compose up --build
```

2. Chạy ở chế độ background:
```bash
docker-compose up -d
```

3. Dừng ứng dụng:
```bash
docker-compose down
```

Ứng dụng sẽ chạy tại: `http://localhost:80`

</details>

## 📁 Cấu trúc thư mục

```
lms_forum_id/
├── src/                # Source code
├── public/            # Static files
├── backend/           # Backend code
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf         # Nginx configuration
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # TailwindCSS configuration
├── tsconfig.json      # TypeScript configuration
├── postcss.config.js  # PostCSS configuration
├── eslint.config.js   # ESLint configuration
├── components.json    # Shadcn UI configuration
└── package.json       # Project dependencies
```

## 🔧 Cấu hình

### Vite
<table>
  <tr>
    <th>Cấu hình</th>
    <th>Giá trị</th>
  </tr>
  <tr>
    <td>Port mặc định</td>
    <td>8080</td>
  </tr>
  <tr>
    <td>Host</td>
    <td>"::" (all interfaces)</td>
  </tr>
  <tr>
    <td>Alias</td>
    <td>"@" trỏ đến thư mục src</td>
  </tr>
  <tr>
    <td>Plugins</td>
    <td>React SWC, Component Tagger (dev)</td>
  </tr>
</table>

### Docker
<table>
  <tr>
    <th>Cấu hình</th>
    <th>Giá trị</th>
  </tr>
  <tr>
    <td>Port</td>
    <td>8008</td>
  </tr>
  <tr>
    <td>Node version</td>
    <td>18-alpine</td>
  </tr>
  <tr>
    <td>Nginx</td>
    <td>Được tối ưu cho React SPA</td>
  </tr>
  <tr>
    <td>Multi-stage build</td>
    <td>Build stage + Production stage</td>
  </tr>
</table>

## 📝 Scripts

<table>
  <tr>
    <th>Script</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>npm run dev</code></td>
    <td>Chạy ứng dụng ở môi trường development</td>
  </tr>
  <tr>
    <td><code>npm run build</code></td>
    <td>Build ứng dụng cho production</td>
  </tr>
  <tr>
    <td><code>npm run build:dev</code></td>
    <td>Build ứng dụng ở môi trường development</td>
  </tr>
  <tr>
    <td><code>npm run preview</code></td>
    <td>Preview build production</td>
  </tr>
  <tr>
    <td><code>npm run lint</code></td>
    <td>Chạy ESLint</td>
  </tr>
  <tr>
    <td><code>npm run type-check</code></td>
    <td>Kiểm tra TypeScript</td>
  </tr>
</table>

## 🤝 Đóng góp

<div align="center">

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dự án được phân phối dưới giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

</div>

## 👥 Tác giả

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/NienCongChua">
        <img src="https://avatars.githubusercontent.com/u/117887397?v=4" width="100px;" alt="Richard Jacob"/>
        <br />
        <sub><b>Richard Jacob</b></sub>
      </a>
      <br />
      <sub>niencongchua@gmail.com</sub>
    </td>
  </tr>
</table>

</div>

## 🙏 Cảm ơn

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)](https://nginx.org/)

</div>

---
<div align="center">

Made with ❤️ by [Tên tác giả]

</div>