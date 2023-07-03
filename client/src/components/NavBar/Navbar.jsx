import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import Profile from '../Profile/Profile';
import { useCart } from "../Context/DataContext";
import logo from '../../assets/tiendaDojo.jpg';
import { FirstContext } from '../Context/FirstContext';
const NavBar = () => {
    const [user, setUser] = useState(null);
    const { totalItems } = useCart();
    const { admin, validateAdmin } = useContext(FirstContext);

    useEffect(() => {
        validateAdmin();
        if (admin === false) {
            console.log("no admin");
        }
        console.log(user);
    }, [user]);

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
    }, []);
    

    return (
        <>
            <AppBar className='appBar' color="inherit">
                <Toolbar className="d-flex justify-content-between">
                    <Typography component={Link} to="/" variant="h6" className="logo d-flex align-items-center" color="inherit">
                        <img src={logo} alt="logo" height="30px" />
                    </Typography>

                    <div className="buttons d-flex align-items-center">
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="primary" className="mx-2">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {user || admin ?
                            (<>
                                <LogoutButton className="mx-2" />
                            </>) :
                            (
                                <LoginButton className="mx-2" />
                            )}
                        {admin ?
                        <Button component={Link} to="/admin" className="admin">
                            admin
                        </Button> : ""}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;