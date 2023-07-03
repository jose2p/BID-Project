import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Manager from "../pages/Admin/Manager";
import ShoppingCart from "../pages/ShoppingCart";
import ManagerEdit from "../pages/Admin/ManagerEdit";
import ItemDetails from "../pages/ItemDetails";
import { FirstContext } from "../components/Context/FirstContext";
import { useContext, useEffect } from "react";

export default function App() {
    // variable booleana que indica si el usuario tiene permisos de administrador o no
    const { user, admin, validateAdmin, setUser } = useContext(FirstContext);

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
        <BrowserRouter>
            <NavBar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<ShoppingCart />} />

                {/* Rutas de administrador protegidas */}
                {admin ? (
                    <>
                        <Route path="/admin" element={<Manager />} />
                        <Route path="/edit/:id" element={<ItemDetails />} />
                        <Route path="/item/:id/edit" element={<ManagerEdit />} />
                    </>
                ) : (
                    <Route path="/admin" element={<Login />} />
                )}

            </Routes>
        </BrowserRouter>
    );
}

