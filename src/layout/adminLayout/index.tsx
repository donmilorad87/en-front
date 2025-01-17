import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

export const AdminLayout = () => {
    const { user } = useAuth();

    if (!user.isAuth || user.user.role !== 10) {
        return <Navigate to="/not-admin" />;
    }

    return (
        <div>
            <Header />
            admin layout
            <Outlet />
            <Footer />
        </div>
    );
};