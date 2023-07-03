import { Fragment, useContext, useEffect } from "react"
import { FirstContext } from "../components/Context/FirstContext";
import LoginRegister from "../components/LoginButton/LoginRegister";


const Login = () => {

    const context = useContext(FirstContext);
    useEffect(() => {
        console.log(context);
    }, [context])

    return (
        <Fragment>
            <LoginRegister />
        </Fragment>
    )
}
export default Login;