import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Google from '../../Components/googleLogin'
import { /* authenticate, */ isAuth, usernameChecker, passwordChecker } from '../../utility/auth'

import { useAuth } from "../../hooks/useAuth";

import { useDispatch, useSelector } from "react-redux";
import {
    setUser
} from "../../store/reducer";
import { RootState } from "../../store/store";

interface ValuesProps {
    username: string
    usernameLabel: string
    password: string
    passwordLabel: string
    buttonText: string
    buttonState: boolean
}
const Signin = () => {
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email, message, user, pass } = location.state || { email: null, message: null };

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, []);

    const [values, setValues] = useState<ValuesProps>({
        username: email ? email : user ? user : '',
        usernameLabel: '',
        password: pass ?? '',
        passwordLabel: '',
        buttonText: 'Submit',
        buttonState: true
    })

    const { username, usernameLabel, password, passwordLabel, buttonText, buttonState } = values

    const handleChangeUsername = (name: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {


        let userCheck = usernameChecker(event.target.value)


        let xe
        if (userCheck.length > 0) {
            xe = true
        } else {
            xe = false
        }

        setValues({ ...values, usernameLabel: userCheck.toString(), buttonState: xe, [name]: event.target.value })

    }

    const handleChangePassword = (name: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {

        let userCheck = passwordChecker(event.target.value)


        let xe
        if (userCheck.length > 0) {
            xe = true
        } else {
            xe = false
        }

        setValues({ ...values, passwordLabel: userCheck.toString(), buttonState: xe, [name]: event.target.value })

    }

    const clickSubmit = (event: React.MouseEvent<HTMLElement>): void => {

        event.preventDefault()


        if (username !== '' && password !== '') {


            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(String(username).toLowerCase())) {
                let email = username;
                setValues({ ...values, buttonText: 'Loading...' })

                signiner({ email, password })

            } else {


                setValues({ ...values, buttonText: 'Loading...' })
                signiner({ username, password })


            }
        }


    }

    const signiner = (obj: { username: string, password: string } | { email: string, password: string }) => {
        axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_API_URL}/signin`,
            data: obj
        })
            .then(async response => {
                console.log('SIGN IN SUCCESS', response)
                await login(response.data)
                /* authenticate(response, () => {

                    setValues({ ...values, username: '', password: '' })

                    console.log(`Hello ${response.data.user.username}! You are seccesefly loggioned.`)

                    if (isAuth() && isAuth().role === 'admin') {
                        navigate('/admin')
                    } else if (isAuth() && isAuth().role === 'moderator') {
                        navigate('/moderator')
                    } else {
                        navigate('/private')
                    }

                }) */
                toast.success(`Hello ${response.data.user.username}! You are seccesefly loggioned.`)
            })
            .catch(error => {
                console.log('SIGN IN error', error.response.data)
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })

    }

    return (
        <>
            <Google />

            <form>
                <div className="form-group">
                    <label className="text-muted"> Username or email</label>
                    <input pattern=".{8,}" title="Username must be at least 8 characters long" onChange={handleChangeUsername('username')} value={username} name="username" type="text" className="form-control" required />
                    <label className="awrp"> {usernameLabel} </label>
                </div>

                <div className="form-group">
                    <label className="text-muted"> Password </label>
                    <input pattern=".{8,}" title="Username must be at least 8 characters long" onChange={handleChangePassword('password')} value={password} name="password" type="password" className="form-control" required />
                    <label className="awrp"> {passwordLabel} </label>
                </div>
                <div>
                    <button className="btn btn-primary float-right ml-2" onClick={clickSubmit} disabled={buttonState}> {buttonText} </button>
                    <Link to="/forgot-password" className="btn btn-outline-danger float-right">
                        Forgot Password
                    </Link>
                </div>

            </form>
            <ToastContainer />
        </>
    )
}

export default Signin