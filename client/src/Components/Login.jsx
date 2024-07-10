import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/dashboard');
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="error-message">
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='email'><strong>Email:</strong></label>
                        <input type='email' name='email' placeholder='Enter your email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'><strong>Password:</strong></label>
                        <input type='password' name='password' placeholder='Enter your password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} />
                    </div>
                    <button className="login-button">Login</button>
                    <div className="terms-checkbox">
                        <input type='checkbox' name='tick' id='tick' />
                        <label htmlFor='tick'>You agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
