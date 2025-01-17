
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'



const Homepage = () => {
    const location = useLocation();
    const { unseccesfulActivationTry, unseccesfulPasswordActivationTry, unseccesfullPaswordChangeTry } = location.state || { unseccesfulActivationTry: false };

    useEffect(() => {
        if (unseccesfulActivationTry === true) {
            toast.error('Unautorized Activation Try');
        } else if (unseccesfulPasswordActivationTry === true) {
            toast.error('Unautorized Password Activation Try');
        } else if (unseccesfullPaswordChangeTry === true) {
            toast.error('Unautorized Password Change Try');

        }
    }, []);

    return (
        <>
            Homepage
            <ToastContainer />
        </>
    );
};

export default Homepage;