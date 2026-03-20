# Advanced Leave Management System (EMS)

A modern, full-stack Leave Management System built with Vue.js, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based secure signup and login with role-based access control (Employee vs Employer).
- **Employee Dashboard**: View leave balances (Casual and Sick), submit leave requests with overlap/past dates validation, and track application history.
- **Employer Dashboard**: Manage all employee leave requests, filter requests by status, search by employee name, view top-level statistics, and approve/reject applications.
- **Automated Balances**: Approving a leave request automatically deducts from the employee's respective leave balance.

## Tech Stack

- **Frontend**: Vue.js 3, Vue Router, Tailwind CSS, Axios, Vite
- **Backend**: Node.js, Express, Mongoose (MongoDB), JSON Web Tokens (JWT), bcrypt

## Folder Structure

```
EMS/
├── backend/                  # Express API Server
│   ├── controllers/          # Route handlers (auth, leave)
│   ├── middleware/           # JWT and Role protection
│   ├── models/               # Mongoose schemas (User, Leave)
│   ├── routes/               # API endpoints
│   ├── server.js             # Entry point
│   └── package.json
└── frontend/                 # Vue.js Client
    ├── src/
    │   ├── router/           # Vue Router config & guards
    │   ├── views/            # UI components (Dashboards, Login, Signup)
    │   ├── App.vue           # Main layout & navigation
    │   └── main.js           # Vue init and Axios interceptors
    ├── tailwind.config.js    # Tailwind configurations
    └── package.json
```

## Setup Guide

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ems
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   # or
   node server.js
   ```
   *The server runs on http://localhost:5000*

### 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The application typically runs on http://localhost:5173*

## API Documentation

### Auth Routes (`/api/auth`)
- `POST /signup` - Register a new user (`name`, `email`, `password`, `role`).
- `POST /login` - Login (`email`, `password`). Returns JWT token.

### Leave Routes (`/api/leaves`) - Protected
- `POST /apply` - Apply for leave (`leaveType`, `startDate`, `endDate`, `reason`).
- `GET /my-leaves` - Get current user's leave history.
- `GET /all` - (Employer Only) Get all leave requests.
- `PUT /:id` - (Employer Only) Approve or Reject a request (`status: 'Approved' | 'Rejected'`).

### User Routes (`/api/users`) - Protected
- `GET /balance` - Get current user's leave balance.

## Deployment Instructions (AWS EC2)

1. **Launch an EC2 Instance**: Choose an Ubuntu Server instance. Configure Security Groups to allow inbound traffic on HTTP (80), HTTPS (443), and custom TCP (5000) for testing.
2. **Connect & Install Dependencies**:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   sudo npm install -g pm2
   ```
3. **Clone Repository / Upload Code**: Clone your EMS repo to the server.
4. **Deploy Backend**:
   - `cd backend`
   - `npm install`
   - Create `.env` file with production secrets.
   - Start via PM2: `pm2 start server.js --name "ems-backend"`
5. **Deploy Frontend**:
   - Update `axios` base URLs in frontend to point to your EC2 public IP or domain.
   - `cd frontend`
   - `npm install`
   - `npm run build`
   - Set up an NGINX server to serve the static frontend files from `dist/` and proxy API requests to `localhost:5000`.
6. **Configure NGINX** (Basic Proxy):
   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       location / {
           root /path/to/EMS/frontend/dist;
           try_files $uri /index.html;
       }

       location /api/ {
           proxy_pass http://localhost:5000;
       }
   }
   ```
