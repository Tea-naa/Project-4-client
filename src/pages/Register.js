import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isValidPassword = (password) => {
        return /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password); //// Password validation function At least 8 chars, 1 letter, 1 number
    };

    const handleRegister = (e) => {  // Function to handle form submission (registration)
        e.preventDefault();
        setErrorMessage('');

        // Field validation
        if (!username || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!isValidPassword(password)) {
            setErrorMessage('Password must be at least 8 characters and contain at least one number.');
            return;
        }

        if (!agreeToTerms) {
            setErrorMessage('You must agree to the terms and conditions and privacy policy.');
            return;
        }

        // newUser to store user information received in the registration request.        
        const newUser = {
            uname: username,
            pword: password,
        };

        // Parameters for fetch request;  POST request for user registration
        const parameters = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        };

        // Make the fetch request to the backend to register the user
        fetch('http://localhost:3003/users/register', parameters)
            .then((res) => res.json())  
            .then((json) => {
                if (json.message === 'User registered successfully') {
                    setErrorMessage('');
                    navigate('/');  // Redirect to login page(home)
                } else {
                    setErrorMessage(json.message || 'Registration failed. Please try again.');
                }
            })
            .catch((err) => {
                setErrorMessage('Server error. Please try again later.');
                console.error(err);
            });
    };

    return (
        <div className="auth-screen register-screen">
            <div className="caution-tape"></div>
            <h1>Register</h1> 
            <form onSubmit={handleRegister}>
                 {/* Username field */}
                <div>  
                    <label>Username</label> 
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state on change
                        placeholder="Enter username" />
                </div>
                 {/* Password field */}
                <div>
                    <label>Password</label> 
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"/>
                </div>
                <div>
                    <label>Confirm Password</label> 
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"/>
                </div>
                 {/* Terms and conditions checkbox */}
                <div className="terms-container">
                    <input 
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        required />
                    <label>
                        I agree to the terms and conditions and privacy policy
                    </label>
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Register</button> 
            </form>
        </div>
    );
};

export default Register;
