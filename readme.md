# 🎓 Faculty Community Platform

A full-stack web application designed to bring together students of the faculty in one modern, unified platform. This project is built with **TypeScript**, **Next.js**, **Express**, **Prisma**, **MySQL**, **Redis**, and **Docker**, aiming to provide a centralized digital hub for all academic and community-related activities.

---

## 🚀 Features

### 🧑‍🎓 For Students

- 🧾 **PDF & Resources Repository** – Access lecture notes, tasks, quizzes, and more.
- 📅 **Task & Quiz Alerts** – Automated notifications/reminders before deadlines.
- 📨 **Messages & Email Alerts** – Important notices and alerts sent directly to students.
- 🧪 **Quiz & Task Management** – View assigned tasks/quizzes and track deadlines.
- 🧠 **Microsoft Login** – Secure login using Microsoft OAuth 2.0.
- 📤 **Upload Files** – Using `Multer` and `Cloudinary` for secure and scalable media upload.

### 🏛️ For Faculty & Union

- 📢 **Events & Announcements** – Manage and share events happening within the college.
- 🗨️ **Community Posts** – Enable student engagement through post creation and commenting.
- 🔔 **Important Notices** – Deliver alerts to all or specific users for urgent tasks or actions.
- 📊 **Smart Dashboard** – Track activity, uploads, deadlines, and more.

---

## 🛠️ Tech Stack

| Frontend        | Backend             | Infrastructure    |
| --------------- | ------------------- | ----------------- |
| Next.js         | Express.js          | Docker            |
| TypeScript      | Prisma ORM          | Docker Compose    |
| Tailwind CSS    | MySQL               | Redis             |
| Shadcn/UI       | bcrypt              | Nodemon + ts-node |
| React Hot Toast | Multer + Cloudinary | Microsoft OAuth   |

---

## 🗂️ Folder Structure

root/
├── backend/ # Express.js API with Prisma
│ ├── src/
│ ├── Dockerfile
│ └── .env # Backend environment variables
│
├── frontend/ # Next.js + Tailwind + Shadcn
│ ├── app/
│ ├── components/
│ └── .env.local # Frontend environment variables
└── README.md

---

## ⚙️ Environment Variables

### 🌐 Frontend (`frontend/.env`)

```env
NEXT_PUBLIC_BACKEND_URL=
```

### 🌐 Backend (`backend/.env`)

```env
PORT=4000

DATABASE_URL="mysql://abdoyasser:devpass@mysql:3306/unit"

REDIS_URL=redis://redis:6379

MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_REDIRECT_URI= cline url

JWT_SECRET=
JWT_REFRESH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

## 🐟 Docker Build Dev :

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

## 📘 Prisma Schema Overview

| Model            | Key Fields                                    | Relations                                                                 |
|------------------|-----------------------------------------------|---------------------------------------------------------------------------|
| **Users**        | `id`, `email`, `name`, `role`, `Grade`        | - `communities`: [CommunityUser]  <br> - `created subjects`, `tasks`, etc. |
| **Subject**      | `id`, `name`, `grade`, `specialization[]`     | - `doctor`: Users <br> - `documentations`, `tasks`, `quizzes`             |
| **Documentations** | `id`, `title`, `description`, `isDeleted`   | - `subject`: Subject <br> - `uploader`: Users                              |
| **Task**         | `id`, `title`, `description`, `endDate`       | - `subject`: Subject <br> - `creator`: Users                               |
| **Quiz**         | `id`, `title`, `startDate`, `duration`        | - `subject`: Subject <br> - `creator`: Users                               |
| **Events**       | `id`, `title`, `description`, `startDate`     | Standalone model for scheduled events                                     |
| **Communities**  | `id`, `title`, `description`, `image`         | - `users`: [CommunityUser]                                                |
| **CommunityUser**| `userId`, `communityId`, `role`, `joinedAt`   | Bridge table <br> - `user`: Users <br> - `community`: Communities         |

---

### 📦 Enums Used

| Enum               | Values |
|--------------------|--------|
| `Roles`            | `doctor`, `assistant`, `worker`, `admin`, `leader`, `student` |
| `Grades`           | `first`, `second`, `third`, `fourth` |
| `Specializations`  | `general`, `cs`, `it`, `is`, `ai`, `se` |
| `CommunityRoles`   | `manager`, `helper`, `reader` |

---
