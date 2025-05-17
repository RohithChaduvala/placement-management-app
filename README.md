# Placement Management App

A full-stack web application to manage student placement activities for colleges. It includes role-based access for Students, Officers, and Faculty (in-progress), with powerful backend integration and real-time data management.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Others:** Axios for API requests, React Router for routing, Bcrypt for password security

---

## Current Features (As of Version 2.0 - 2025-05-17)

### Student Login:
- Email/password-based login.
- Redirect to personalized dashboard on success.
- Basic profile status shown (Pending, Verified).

### Student Dashboard:
- Displays student profile data:
  - Roll Number, Name, Section, Branch, Course, Email, Phone
- Lists **only eligible job postings** based on:
  - Approved jobs
  - Matching course and branch
  - Minimum CGPA requirement met

### Student Profile Management:
- View existing profile details.
- Update phone number (editable field).
- Profile fetched via email for precision.

### Officer Login:
- Secure login using bcrypt for password hashing.
- Officer role granted dashboard access after login.

### Job Posting by Officer:
- Post new job roles via form with:
  - Title, Description, Location, Package, Skills, Deadline
  - Eligible Branches and Courses (comma-separated)
  - Minimum CGPA
  - Registration Form fields (JSON array)
- Jobs are saved to MySQL with `officer_id` reference.
- Only approved jobs are shown to students.

### Job Approval:
- `is_approved` flag used to control job visibility to students.
- Faculty role to approve jobs is under development.

---

## Recent Fixes (May 17, 2025)

- **Fixed: Student ID mismatch in eligible jobs query.**
  - Now uses `roll_number` instead of internal `id`.
- **Fixed: Student profile fetch using email**
  - Enabled full name, branch, course, section, phone.
- **Improved error handling and API structure** for better debugging and integration.

---

## Future Goals (Coming Soon)

### Faculty Role:
- Login and approval dashboard.
- Approve/reject jobs and student profiles.
- Revoke student access.

### Resume Upload (Student):
- Upload PDF resumes.
- Store securely in server or Azure Blob Storage.
- Validate file size and type.

### Profile Enhancement:
- Add LinkedIn, GitHub, Skills, Placement Status.
- Visual progress bar for profile completion.
- Prevent job applications if profile incomplete.

### Officer Dashboard Enhancements:
- View posted jobs.
- Filter applicants by branch, CGPA, course.
- Export selected students to CSV.

### Student Job Application:
- Apply to jobs directly from dashboard.
- Track application status.

### Analytics & Azure Integration:
- Push placement stats and data to Azure for dashboard insights.
- Use Power BI or low-cost alternatives for graphs.

---

## Folder Structure

PLACEMENT-MANAGEMENT-APP/
│
├── backend/
│ ├── routes/
│ │ ├── studentRoutes.js
│ │ └── officerRoutes.js
│ ├── db.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ │ ├── StudentLogin.jsx
│ │ │ ├── OfficerLogin.jsx
│ │ │ ├── StudentDashboard.jsx
│ │ │ └── ...
│ ├── App.jsx
│ └── main.jsx
│
├── README.md
└── .env

yaml


---

## How to Run Locally

### 1. Clone the repo:
```bash
git clone https://github.com/RohithChaduvala/placement-management-app.git
cd placement-management-app
2. Start Backend:
    cd backend
    npm install
    node server.js
3. Start Frontend:
    
    cd frontend
    npm install
    npm run dev
