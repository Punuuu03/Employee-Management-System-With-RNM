import axios from 'axios';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../App.css'; 

const Dashboard = () => {
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/');
                }
            });
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="logo">
                    <Link to="/dashboard"><img src={'data:image/png;base64,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'} alt="Logo" /></Link>
                </div>
                <nav>
                    <ul className="sidebar-menu">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/dashboard/employee">Manage Employees</Link></li>
                        <li><Link to="/dashboard/category">Category</Link></li>
                        <li><Link to="/dashboard/profile">Profile</Link></li>
                        <li onClick={handleLogout}><Link to="/dashboard">Logout</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <div className="header">
                    <h4>Employee Management System</h4>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
