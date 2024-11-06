import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const unameRef = useRef();  //'useRef' to get references to the username and password input fields
    const pwordRef = useRef();

    const handleLogin = (e) => {  //form is submitted
        e.preventDefault();
        
        let user = {  // Creating an object 'user' to store the username and password 
            uname: unameRef.current.value,
            pword: pwordRef.current.value,
        };
    
        let parameters = {  // Setting up the parameters for the fetch request to send data to the server
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };

         // Making the fetch request to the server to check if the login credentials are correct
        fetch("http://localhost:3003/users/login", parameters)
            .then((res) => res.json())
            .then((json) => {
                if (json.message === 'Login successful') {
                    setErrorMessage('');
                    navigate('/dashboard', { state: { username: user.uname } }); // Use navigate() to go to the dashboard, passing the username as state
                } else {
                    setErrorMessage(json.message || 'Invalid username or password');
                }
            })
            .catch((err) => {
                setErrorMessage('Server error. Please try again later.');
                console.error(err);
            });
    };

    return (
        <div className="auth-screen login-screen">
            <div className="caution-tape"></div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}> {/* Form that triggers handleLogin when submitted */}
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        ref={unameRef}  // Use 'ref' to get the value of the username input
                        placeholder="Enter username"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        ref={pwordRef}
                        placeholder="Enter password"
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
            {/* Link to the registration page */}
            <p>Don't have an account? <span className="register-link"><Link to="/register">Register here</Link></span></p>
        </div>
    );
};

export default Login;
