# Placement Management App

A full-stack web application built to manage student placement activities, including login, student dashboards, and profile management.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Others**: Axios for API requests, React Router for navigation

---

## Current Features (Completed)
- **Student Login**:  
  - Students can log in using email and password.
  - On successful login, they are redirected to their Student Dashboard.

- **Student Dashboard**:  
  - Displays basic student information fetched from MySQL:
    - Roll Number
    - Name
    - Section
    - Branch
  
- **Server**:
  - Express server connected to MySQL database.
  - Provides APIs for student login and fetching profile details.

- **Authentication**:
  - Basic email/password verification.
  - Error handling for wrong credentials or server issues.

- **GitHub Deployment**:
  - Project initialized with Git.
  - Code pushed and version-controlled via GitHub.

---

## Future Goals (Upcoming)
- **Student Dashboard Improvements**:
  - Display additional student details (phone number, email, CGPA, etc.).
  - Show profile completion status.

- **Student Profile Management**:
  - Allow students to **edit their profile**.
  - Add **Resume upload** functionality (accept only PDF files).
  - Store extra information like LinkedIn, GitHub profiles, Skills, Placement Status.

- **Backend Enhancements**:
  - Create new API endpoints for updating profile and uploading resumes.
  - Store resume files securely in the server (uploads folder).

- **Database Changes**:
  - Create a new table `placement_profiles` or extend the current profile table.

- **Frontend Enhancements**:
  - Form to edit basic and placement-related details.
  - Progress bar to indicate how much of the profile is complete.
  - Prevent applications if the profile is incomplete.

- **Deployment**:
  - After full development, build the React app and deploy it using GitHub Pages or Vercel.

---

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/RohithChaduvala/placement-management-app.git
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   node server.js
   ```
4. Make sure MySQL server is running and the database is properly set up.

---

## Author
- **GitHub**: [RohithChaduvala](https://github.com/RohithChaduvala)
