
import { Outlet } from "react-router-dom";

import Navigation from "../../Components/navigaion";

import './index.scss'
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


export const HomeLayout = () => {



    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
};