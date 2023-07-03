import React, { useContext, useState } from "react";

import { Button, TextField } from '@mui/material'

import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FirstContext } from "../Context/FirstContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const { setUser } = useContext(FirstContext);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        // Here you would typically make a network request to authenticate the user
        // and handle any validation errors that may be returned.
        const data = { email, password };

        axios.post("http://localhost:8000/api/login", data, { withCredentials: true })
            .then((result) => result.data)
            .then((response) => {
                console.log(response);
                setFormErrors({});
                setUser(response);
                navigate("/");
                sessionStorage.setItem("user", JSON.stringify(response));                
                document.cookie = `usertoken=${response.cookies.usertoken}; sameSite=strict`;
                
            })
            .catch((errors) => {
                console.log(errors.response.data);
                setFormErrors(errors.response.data);
            })
    };

    return (
        <form className='margen my-5' onSubmit={handleLoginSubmit}>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                fullWidth
                type="email"
                required
                error={formErrors.email != null}
                helperText={formErrors.email?.message}
            />
            <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                type="password"
                required
                error={formErrors.password != null}
                helperText={formErrors.password?.message}
            />
            <Button variant="contained" type="submit" color="primary">
                Login
            </Button>
        </form>
    );
};


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`Confirm Password: ${confirmPassword}`);
        navigate('/')
        // Here you would typically make a network request to create a new user
        // and handle any validation errors that may be returned.

        let data = { firstName, lastName, email, password, confirmPassword };

        axios.post("http://localhost:8000/api/register", data, { withCredentials: true })
            .then((result) => result.data)
            .then((response) => {
                console.log(response);
                setFormErrors({});                
                document.cookie = `usertoken=${response.cookies.usertoken}`;
                navigate('/');
            })
            .catch((errors) => {
                console.log(errors);
                console.log(errors.response.data.errors);
                if (errors.response.data.code) {
                    setFormErrors({ email: { message: "email already taken" } })
                }
                else {
                    setFormErrors(errors.response.data.errors);
                }
            })
    };

    return (
        <form className='margen my-5' onSubmit={handleRegisterSubmit}>
            <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameChange}
                margin="normal"
                fullWidth
                required
                error={formErrors.firstName != null}
                helperText={formErrors.firstName?.message}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={handleLastNameChange}
                margin="normal"
                fullWidth
                required
                error={formErrors.lastName != null}
                helperText={formErrors.lastName?.message}
            />
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                fullWidth
                type="email"

                error={formErrors.email != null}
                helperText={formErrors.email?.message}
            />
            <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                margin="normal"
                fullWidth
                type="password"
                required
                error={formErrors.password != null}
                helperText={formErrors.password?.message}
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                margin="normal"
                fullWidth
                type="password"
                required
                error={formErrors.confirmPassword != null}
                helperText={formErrors.confirmPassword?.message}
            />
            <Button variant="contained" type="submit" color="primary">
                Register
            </Button>
        </form>
    );
};

const LoginRegister = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleToggleClick = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {showLogin ? <Login /> : <Register />}
            <Button onClick={handleToggleClick}>
                {showLogin ? "Create an account" : "Already have an account?"}
            </Button>
        </div>
    );
};

export default LoginRegister;