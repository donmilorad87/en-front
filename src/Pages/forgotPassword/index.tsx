import { useState } from 'react'

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request password reset link'
    })

    const { email, buttonText } = values

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.value)

        setValues({ ...values, [name]: event.target.value })

    }

    const clickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'PUT',
            url: `${import.meta.env.VITE_APP_API_URL}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('Forgot PASSWORD SUCCESS', response)

                toast.success(response.data.message)

                navigate('/reset-password-activation', {
                    state: {
                        email, // Replace with the actual username
                        message: response.data.message,
                        unseccesfulPasswordActivationTry: true
                    },
                })

                setValues({ ...values, buttonText: 'Requested' })

            })
            .catch(error => {
                console.log('Forgot PASSWORD error', error.response.data)
                setValues({ ...values, buttonText: 'Request password reset link' })
                toast.error(error.response.data.error)
            })
    }



    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange('email')} value={email} type="text" className="form-control" />
            </div>


            <div>
                <button className="btn btn-primary" onClick={clickSubmit}> {buttonText} </button>
            </div>
        </form>
    )

    return (
        <>
            <div className="mm0 mt-4 mb-4 colinz3"></div>
            <div className="mm0 mt-4 mb-4 colinz6 signup">
                <ToastContainer />
                <h1 className="p-4 text-center">Forgot Password</h1>
                {forgotPasswordForm()}
            </div>
            <div className="mm0 mt-4 mb-4 colinz3"></div>
        </>
    )

}


export default ForgotPassword