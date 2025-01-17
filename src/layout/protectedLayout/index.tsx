import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

export const ProtectedLayout = () => {
    const { user } = useAuth();

    if (!user.isAuth) {
        return <Navigate to="/not-logged-in" />;
    }

    return (
        <div>
            <Header />
            protected layouyt
            <Outlet />
            <Footer />
        </div>
    );
};