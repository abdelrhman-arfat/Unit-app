# 🎓 Faculty Community Platform

A full-stack web application designed to bring together students of the faculty in one modern, unified platform. This project is built with **TypeScript**, **Next.js**, **Express**, **Prisma**, **MySQL**, **Redis**, and **Docker**, aiming to provide a centralized digital hub for all academic and community-related activities.

---

## 📹 Online Video

You can watch a short demo or explanation of the project using the link below:
👉 [Click here to watch the video](https://your-video-link.com)

## 🚀 Features

### 🧑‍🎓 For Students

- 🧾 **PDF & Resources Repository** – Access lecture notes, tasks, quizzes, and more.
- 📅 **Task & Quiz Alerts** – Automated notifications/reminders before deadlines.
- 📨 **Messages & Email Alerts** – Important notices and alerts sent directly to students.
- 🧪 **Quiz & Task Management** – View assigned tasks/quizzes and track deadlines.
- 🧠 **Google Login** – Secure login using Google OAuth 2.0.
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
| React Hot Toast | Multer + Cloudinary | Google OAuth      |

---

## 🗂️ Folder Structure

```bash
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

```

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
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672

JWT_SECRET=
JWT_REFRESH =
CLIENT_URL = http://localhost:3000

GOOGLE_AUTH_ID=

GOOGLE_AUTH_SECRET=
GOOGLE_AUTH_SERVER_CALLBACK=http://localhost:4000/auth/google/callback
GOOGLE_AUTH_URL_SUCCESS=http://localhost:3000/success

REDIS_HOST=redis
REDIS_PORT=6379

EMAIL_USER = your_email
EMAIL_PASS = your_email_password

<!-- if u will use microsoft login -->
MICROSOFT_AUTH_ID=
MICROSOFT_AUTH_SECRET=
MICROSOFT_AUTH_SERVER_CALLBACK=http://localhost:4000/auth/microsoft/callback

```

## 🐟 Docker Build Dev :

1. First Time

```bash
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

```bash
  npm run dev:docker
```

## 📘 Prisma Schema Overview

### 👤 Users

Represents all platform users (students, doctors, admins, etc.).

| Field            | Type              | Description                               |
| ---------------- | ----------------- | ----------------------------------------- |
| `role`           | `Roles` enum      | Role of the user (doctor, student, etc.)  |
| `communityName`  | `String?`         | Linked to the `Communities.name`          |
| `communityRole`  | `CommunityRoles?` | Role inside the community (manager, etc.) |
| `specialization` | `Specializations` | User's academic field                     |
| `Grade`          | `Grades`          | User's academic year                      |

---

### 👥 Communities

Organized student groups like clubs, teams, or faculty divisions.

| Field   | Type    | Description                    |
| ------- | ------- | ------------------------------ |
| `name`  | String  | Unique name used in relations  |
| `title` | String  | Display title                  |
| `users` | Users[] | Linked users in this community |

---

### 📚 Subject

Courses for each specialization & grade, assigned to doctors.

| Field            | Type             | Description                   |
| ---------------- | ---------------- | ----------------------------- |
| `specialization` | Enum[]           | Target specializations        |
| `grade`          | Grades           | Target academic year          |
| `doctorId`       | Users (relation) | Doctor who teaches the course |

---

### 📄 Documentations

Lecture notes, PDFs, and resources uploaded by users.

| Field        | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `subjectId`  | Subject  | Linked subject                 |
| `uploaderId` | Users    | Who uploaded the documentation |
| `isDeleted`  | Boolean  | Soft-delete flag               |
| `deletedAt`  | DateTime | When it was deleted (if any)   |

---

### ✅ Tasks

Homework or assignments linked to subjects.

| Field       | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `creatorId` | Users    | Creator (doctor, assistant) |
| `endDate`   | DateTime | Deadline for the task       |

---

### ❓ Quizzes

Online tests created by staff for students.

| Field       | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `startDate` | DateTime | When quiz becomes available |
| `duration`  | Int      | Duration in minutes         |

---

### 📅 Events

Events hosted by the university or a community (e.g., seminars, contests).

| Field       | Type     | Description           |
| ----------- | -------- | --------------------- |
| `link`      | String   | External or Zoom link |
| `startDate` | DateTime | Event start time      |
| `image`     | String?  | Optional event image  |

---

## 🧱 Enums Used

### 🎭 Roles

- `doctor`
- `assistant`
- `worker`
- `admin`
- `leader`
- `student`

### 🧠 Specializations

- `general`, `cs`, `it`, `is`, `ai`, `se`

### 🎓 Grades

- `first`, `second`, `third`, `fourth`

### 👥 CommunityRoles

- `manager`, `helper`, `reader`

---
