import { useEffect } from "react"
import Loader from "../loader"
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
const GoogleLoginCodeExcange = () => {
    const location = useLocation();
    const { login } = useAuth();
    useEffect(() => {

        const params = new URLSearchParams(location.search);

        // Extract individual parameters
        const code = params.get('code');
        const scope = params.get('scope');
        const authuser = params.get('authuser');
        const prompt = params.get('prompt');
        console.log("code:", code);
        console.log("scope:", scope);
        console.log("authuser:", authuser);
        console.log("prompt:", prompt);

        let obj = { code, scope, authuser, prompt }

        axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_API_URL}/google-login`,
            data: obj
        })
            .then(async response => {
                console.log('SIGN IN SUCCESS', response)
                await login(response.data)
            })
            .catch(error => {
                console.log('SIGN IN error', error.response.data)
            })

    }, [])



    return (
        <>

            <Loader />

        </>
    )
}

export default GoogleLoginCodeExcange