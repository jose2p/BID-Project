import { useContext, useEffect } from "react";
import { FirstContext } from "../components/Context/FirstContext";
import Navbar from "../components/NavBar/Navbar";

const WelcomePage = () => {

    const { user, admin, validateAdmin } = useContext(FirstContext);

    useEffect(() => {
        validateAdmin();
        if (admin === false) {
            console.log("no admin");
        }
        console.log(user);
    }, [user]);

    return (
        <>
            <Navbar />
            {admin ?
                <h1 className="my-5">
                    WELCOME PAGE
                </h1>
                : <h2 className="my-5">"Debes ser admin para ver esta pagina"</h2>
            }
        </>
    )
}

export default WelcomePage;