import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';

import AdminSelection from './components/Admin/AdminSelection';
import LoginForm from './components/Admin/LoginForm';
import CreateAdminForm from './components/Admin/CreateAdminForm';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AdminDashboard from './components/Admin/AdminDashboard';

import StudentSelection from './components/Student/StudentSelection';
import StudentCreation from './components/Student/CreateStudent';
import LoginStudent from './components/Student/LoginStudent';
import Dashboard from './components/Student/Dashboard';


// import AttendanceUpload from './components/Admin/AdminComponent/AttendanceUpload';
// import ProjectReviewUpload from './components/Admin/AdminComponent/ProjectReviewUpload';
// import AssessmentUpload from './components/Admin/AdminComponent/AssessmentUpload';
// import ProjectSubmissionUpload from './components/Admin/AdminComponent/ProjectSubmissionUpload';
// import LinkedInPostUpload from './components/Admin/AdminComponent/LinkedInPostUpload';
//  // Import Role Selection component
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
axios.defaults.baseURL='http://localhost:5000';
axios.defaults.withCredentials=true;

function App() {
  return (
    <Router>
      { <Toaster position='bottom-right' toastOptions={{duration:2000}}/> }
      <Routes>
        {/* Landing page to select role */}
        <Route path="/" element={<RoleSelection />} />
        
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminSelection />} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
{/* 
        <Route path="/admin/attendance" element={<AttendanceUpload     />} />
        <Route path="/admin/project-review" element={<ProjectReviewUpload />} />
        <Route path="/admin/assessment" element={<AssessmentUpload />} />
        <Route path="/admin/project-submission" element={<ProjectSubmissionUpload />} />
        <Route path="/admin/linkedin" element={<LinkedInPostUpload />} /> */}

    {/* <Route path="/admin/*" element={<AdminDashboard /> } /> */}
        <Route path="/admin-login" element={<LoginForm />} />
        <Route path="/create-admin" element={<CreateAdminForm />} />
        
        {/* Student Routes */}
        <Route path="/student-results" element={<StudentSelection />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/create-student" element={<StudentCreation />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>


  );
}

export default App;
