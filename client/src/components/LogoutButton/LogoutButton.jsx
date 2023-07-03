import axios from 'axios';
import React from 'react';
import { useCart } from '../Context/DataContext';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const LogoutButton = () => {
    const { clearCart } = useCart();
    
    const navigate = useNavigate();

    const handleLogout = () => {
        clearCart();
        axios.get('http://localhost:8000/api/logout')
            .then(res=>{
                console.log(res);            
                Cookies.remove('usertoken');
                sessionStorage.clear();
                alert('sesion cerrada');
                navigate('/login');
                window.location.reload(true);
        });
    }

    return (
        <Button onClick={handleLogout}>
            Cerrar sesion
        </Button>
    )
}

export default LogoutButton