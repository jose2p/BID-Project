import React, { useContext } from 'react'
import { FirstContext } from "../Context/FirstContext";
const Profile = () => {
    const { user } = useContext(FirstContext);
    console.log(user)
    return(
        <p> Hello, {user.firstName} </p>
    )
}
export default Profile