# Task Manager Application

This repository contains a React frontend and an Express + MySQL backend for a task management application using REST APIs.

## Features
- User registration and login
- Token-based authentication with JWT
- Task CRUD operations
- Search and filtering by status, priority, and due date
- Responsive React UI
- Backend data persistence in MySQL

## Backend Setup
1. Copy `backend/.env.example` to `backend/.env` and update database credentials.
2. Run:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. The API will run on `http://localhost:5000`.

## Frontend Setup
1. Run:
   ```bash
   cd frontend
   npm install
   npm start
   ```
2. The app will run on `http://localhost:3000`.

## API Endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/tasks`
- POST `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Postman Collection
The Postman collection is available at `postman_task_manager_collection.json`.
