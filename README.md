# Placement Management App

A full-stack web application built to manage student placement activities, including login, student dashboards, profile management, and officer job postings.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Others:** Axios for API requests, React Router for navigation

---

## Current Features (Completed)

### Student Login:
- Students can log in using email and password.  
- On successful login, they are redirected to their Student Dashboard.

### Student Dashboard:
- Displays basic student information fetched from MySQL:
  - Roll Number  
  - Name  
  - Section  
  - Branch  

### Server:
- Express server connected to MySQL database.  
- Provides APIs for student login and fetching profile details.

### Authentication:
- Basic email/password verification.  
- Error handling for wrong credentials or server issues.

### GitHub Deployment:
- Project initialized with Git.  
- Code pushed and version-controlled via GitHub.

---

## New Features & Improvements for Officer Role (Version 2.0 - 2025-05-16)

- **Officer Login:** Secure login with bcrypt password hashing.  
- **Job Posting Functionality:** Officers can post new job listings via a detailed form with validation on both frontend and backend.  
- **Form Field Examples:** Added placeholder examples for all job posting fields to guide correct data entry.  
- **Database Integration:** Job posts are linked to officers using officer_id fetched via email.  
- **Enhanced API:** Improved error handling and status responses for job posting API endpoint.  
- **Frontend-Backend Sync:** Fixed issues with API request URLs and data structure to ensure successful job post submissions.  
- **Validation:** Added express-validator checks on the backend to validate inputs such as email format and required fields.  
- **Storage:** Job posts saved in MySQL with proper JSON stringification for registration_form field.

---

## Future Goals (Upcoming)

### Student Dashboard Improvements:
- Display additional student details (phone number, email, CGPA, etc.).  
- Show profile completion status.

### Student Profile Management:
- Allow students to edit their profile.  
- Add Resume upload functionality (accept only PDF files).  
- Store extra information like LinkedIn, GitHub profiles, Skills, Placement Status.

### Backend Enhancements:
- Create new API endpoints for updating profile and uploading resumes.  
- Store resume files securely in the server (uploads folder).

### Database Changes:
- Create a new table placement_profiles or extend the current profile table.

### Frontend Enhancements:
- Form to edit basic and placement-related details.  
- Progress bar to indicate how much of the profile is complete.  
- Prevent applications if the profile is incomplete.

### Deployment:
- After full development, build the React app and deploy it using GitHub Pages or Vercel.

---

## How to Run Locally

```bash
git clone https://github.com/RohithChaduvala/placement-management-app.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd server
npm install
node server.js
