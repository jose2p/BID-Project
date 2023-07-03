import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from "react-router-dom";


const LoginButton = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }
    return (
        <Button onClick={routeChange}>Login</Button>
    )
}

export default LoginButton;