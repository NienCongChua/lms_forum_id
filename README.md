# LMS Forum ID

<div align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<h3>Dự án diễn đàn học tập trực tuyến</h3>
<p><i>Learning Management System Forum</i></p>

[English](./README.md) | [Tiếng Việt](./README.vi.md)

</div>

---

## 📋 Mục lục

<div align="center">

| [🚀 Công nghệ](#-công-nghệ-sử-dụng) | [💻 Yêu cầu](#-yêu-cầu-hệ-thống) | [🛠️ Cài đặt](#️-cài-đặt-và-chạy) |
|:-----------------------------------:|:--------------------------------:|:--------------------------------:|
| [📁 Cấu trúc](#-cấu-trúc-thư-mục) | [🔧 Cấu hình](#-cấu-hình) | [📝 Scripts](#-scripts) |
| [🤝 Đóng góp](#-đóng-góp) | [📄 License](#-license) | [👥 Tác giả](#-tác-giả) |

</div>

## 🚀 Công nghệ sử dụng

<div align="center">

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

</div>

## 💻 Yêu cầu hệ thống

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://api.iconify.design/logos:nodejs-icon.svg" width="32" height="32" />
      <br/>
      <sub>Node.js >= 18</sub>
    </td>
    <td align="center">
      <img src="https://api.iconify.design/logos:docker-icon.svg" width="32" height="32" />
      <br/>
      <sub>Docker & Compose</sub>
    </td>
    <td align="center">
      <img src="https://api.iconify.design/logos:npm-icon.svg" width="32" height="32" />
      <br/>
      <sub>npm hoặc yarn</sub>
    </td>
    <td align="center">
      <img src="https://api.iconify.design/logos:git-icon.svg" width="32" height="32" />
      <br/>
      <sub>Git</sub>
    </td>
  </tr>
</table>

</div>

## 🛠️ Cài đặt và Chạy

<div align="center">

<details>
<summary><b>Phương án 1: Chạy trực tiếp</b></summary>

```bash
# 1. Clone repository
git clone https://github.com/NienCongChua/lms_forum_id.git
cd lms_forum_id

# 2. Cài đặt dependencies
npm install
# hoặc
yarn install

# 3. Chạy ứng dụng
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:8080`

</details>

<details>
<summary><b>Phương án 2: Chạy bằng Docker</b></summary>

```bash
# 1. Build và chạy container
docker-compose up --build

# 2. Chạy ở chế độ background
docker-compose up -d

# 3. Dừng ứng dụng
docker-compose down
```

Ứng dụng sẽ chạy tại: `http://localhost:8008`

</details>

</div>

## 📁 Cấu trúc thư mục

<div align="center">

```
lms_forum_id/
├── src/               # Source code
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

</div>

## 🔧 Cấu hình

<div align="center">

<table>
  <tr>
    <th colspan="2">Vite Configuration</th>
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

<table>
  <tr>
    <th colspan="2">Docker Configuration</th>
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

</div>

## 📝 Scripts

<div align="center">

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
</table>

</div>

## 🤝 Đóng góp

<div align="center">

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

</div>

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
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

<div align="center">

Made with ❤️ by Richard Jacob

</div>