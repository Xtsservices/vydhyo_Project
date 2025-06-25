import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
// import Home from "./page";
import LoginScreen from "./Admin/app/login/page";
import Dashboard from "./Admin/app/dashboard/page";
import Clinics from './Admin/app/clinics/page';
import DoctorList from "./Admin/app/doctors/page";
import NeedApproval from "./Admin/app/needApproval/page";
import DoctorDashboardPage from './Doctor/dashboard/page';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Admin */}
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clinics" element={<Clinics />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/needApproval" element={<NeedApproval />} />

                {/* Doctor */}
                <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />

            </Routes>
        </Router>
    );
}

export default App;