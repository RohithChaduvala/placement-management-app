# Placement Management App

A full-stack web application built to manage student placement activities, including login, dashboards, profile management, and officer job postings.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Others:** Axios for API requests, React Router for navigation

---

## Current Features (Completed)

### ✅ Student Login:
- Secure login with email and password.
- On successful login, students are redirected to their personalized Student Dashboard.

### ✅ Student Dashboard:
- Displays student information from MySQL:
  - Roll Number  
  - Name  
  - Section  
  - Branch  
- Shows a welcome message with animation and styling.
- Displays **only approved job postings**.
- **Eligibility checks** per job based on student branch and CGPA:
  - ✅ "Apply Now" button if eligible.
  - ❌ Red "Not eligible" note if not.
- **View** button on each job card to display full job details.
- **Profile logo and popup**:
  - Read-only fields: Email, Roll Number, Branch.
  - Editable fields: Phone number, CGPA (if needed).
  - Back button for navigation.

### ✅ Officer Login:
- Secure login using hashed passwords (bcrypt).
- JWT-based session/token handling (if configured).
- Access to Officer Dashboard after login.

### ✅ Officer Dashboard:
- Form to post new jobs:
  - Dropdowns for consistent entry: `eligible_courses`, `eligible_branches`, `job_type`.
  - Proper placeholders to guide inputs.
- Job posts are linked with officer_id via email lookup.
- Displays all previously posted jobs.

### ✅ Server:
- Node.js Express server with full REST API routes.
- MySQL connection and queries for students, officers, job posts.
- API validations using `express-validator`.

---

## Version Highlights

### 📌 Version 2.1 – 2025-05-19

- ✅ Added **Dropdown Menus** to Officer Job Posting for consistent entries:
  - Eligible Branches
  - Courses
  - Job Type
- ✅ Form Reset after job post submission.
- ✅ Toast notifications for success/error while posting jobs.
- ✅ View all posted jobs in a responsive layout.
- ✅ Student Dashboard now fetches **only approved jobs** from the database.
- ✅ Eligibility logic integrated into frontend:
  - Compares student's branch & CGPA with job's eligibility.
- ✅ “Apply Now” & “Not Eligible” display per job card.
- ✅ View button opens full job details.
- ✅ Profile icon now opens student profile:
  - Shows profile info (some editable).
  - Includes back button.

---

## Future Goals (Upcoming)

### Student Dashboard Improvements:
- Display additional student details (phone number, email, CGPA, etc.).  
- Show profile completion status visually.

### Student Profile Management:
- Allow students to edit their profile and update fields.
- Add Resume upload functionality (PDF only).
- Store data like:
  - LinkedIn
  - GitHub
  - Skills
  - Placement Status

### Backend Enhancements:
- API endpoints for:
  - Profile updates  
  - Resume upload and download  
- Resume storage in server `/uploads` folder or Azure Cloud.

### Faculty Role (In Progress):
- Faculty login
- Approve/reject jobs posted by officers
- View & update student profiles
- Revoke student access if needed

### Database Changes:
- Create or extend tables:
  - `student_profiles`, `job_posts`, `faculty_accounts`, `officer_accounts`
  - Add tables for `student_applications`, `resumes`

### Frontend Enhancements:
- Profile edit forms with dropdowns, validation
- Upload buttons for resume (PDF)
- Profile completion progress bar

### Deployment:
- After full development:
  - Build React app
  - Deploy using GitHub Pages / Vercel (Frontend)
  - Deploy backend on Render / Railway / Azure App Services

---

## How to Run Locally

```bash
# Clone repository
git clone https://github.com/RohithChaduvala/placement-management-app.git

# Frontend Setup
cd placement-management-app/frontend
npm install
npm run dev

# Backend Setup
cd ../backend
npm install
node server.js



Author
RohithChaduvala