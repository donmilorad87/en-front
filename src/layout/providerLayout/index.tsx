import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

export const ProviderLayout = () => {
    const { user } = useAuth();

    if (!user.isAuth || user.user.role !== 2) {
        return <Navigate to="/not-provider" />;
    }

    return (
        <div>
            <Header />
            provider layout
            <Outlet />
            <Footer />
        </div>
    );
};