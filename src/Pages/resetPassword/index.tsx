import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordChecker, passwordChecker } from '../../utility/auth';

const ResetPassword = () => {

    const location = useLocation();

    const { unseccesfullPaswordChangeTry, user, code, message } = location.state || {};

    const navigate = useNavigate();

    useEffect(() => {

        if (!unseccesfullPaswordChangeTry || !user) {
            navigate('/',
                {
                    state: {
                        unseccesfullPaswordChangeTry: true
                    },
                }
            )
        } else {
            toast.success(`${message}`)
        }

    }, [])

    const [values, setValues] = useState({
        username: user ? user.username : "",
        token: code,
        newPassword: '',
        newPasswordLabel: '',
        confirmNewPassword: '',
        confirmNewPasswordLabel: '',
        buttonState: false,
        buttonText: 'Reset password'
    })




    const { username, token, newPassword, newPasswordLabel, confirmNewPassword, confirmNewPasswordLabel, buttonState, buttonText } = values

    const handleChangePassword = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

        let newPasswordCheck = passwordChecker(event.target.value)

        let newPasswordError
        let formErrors = []



        if (newPasswordCheck.length > 0 || formErrors.length > 0 || newPasswordCheck.length > 0 && formErrors.length > 0) {
            newPasswordError = true


        } else {


            newPasswordError = false

        }

        let confirmPasswordLabel = ''
        if (event.target.value !== confirmNewPassword) {
            confirmPasswordLabel = 'Password does not match.'
        }
        setValues({ ...values, newPasswordLabel: newPasswordCheck.toString(), confirmNewPasswordLabel: confirmPasswordLabel, buttonState: newPasswordError, [name]: event.target.value })



    }
    const handleChangeConfirmPassword = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

        let confirmNewPasswordCheck = confirmPasswordChecker(event.target.value, newPassword)


        let confirmNewPasswordError
        let formErrors = []


        if (confirmNewPasswordCheck.length > 0 || formErrors.length > 0 || confirmNewPasswordCheck.length > 0 && formErrors.length > 0) {
            confirmNewPasswordError = true

        } else {
            console.log('ovdesmo')


            confirmNewPasswordError = false

        }




        setValues({ ...values, confirmNewPasswordLabel: confirmNewPasswordCheck.toString(), buttonState: confirmNewPasswordError, [name]: event.target.value })


    }

    const clickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(newPassword, confirmNewPassword, code);

        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'PUT',
            url: `${import.meta.env.VITE_APP_API_URL}/reset-password`,
            data: { newPassword, confirmNewPassword, code }
        })
            .then(response => {
                console.log('Reset PASSWORD SUCCESS', response)


                navigate('/signin', {
                    state: {
                        pass: newPassword,
                        user: response.data.username,
                        message: response.data.message
                    },
                });


            })
            .catch(error => {
                console.log('Reset PASSWORD error', error.response.data)
                setValues({ ...values, buttonText: 'Reset password' })
                toast.error(error.response.data.error)
            })
    }



    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> New Password</label>
                <input onChange={handleChangePassword('newPassword')} value={newPassword} type="password" className="form-control" placeholder="Type new password" required />
                <label className=" awrp"> {newPasswordLabel} </label>
            </div>
            <div className="form-group">
                <label className="text-muted"> Confirm New Password</label>
                <input onChange={handleChangeConfirmPassword('confirmNewPassword')} value={confirmNewPassword} type="password" className="form-control" placeholder="Confirm new password" required />
                <label className=" awrp"> {confirmNewPasswordLabel} </label>
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit} disabled={buttonState}> {buttonText} </button>
            </div>
        </form>
    )

    return (
        <>

            <div className="mm0 mt-4 mb-4 colinz6 signup">
                <ToastContainer />

                <h1 className="p-5 text-center">Hello {username}, type your new password </h1>
                {resetPasswordForm()}
            </div>

        </>
    )

}


export default ResetPassword