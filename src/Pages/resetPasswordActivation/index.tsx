import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const ResetPasswordActivation = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const { email, message, unseccesfulPasswordActivationTry } = location.state || {};

    useEffect(() => {

        if (!unseccesfulPasswordActivationTry) {
            navigate('/',
                {
                    state: {
                        unseccesfulPasswordActivationTry: true
                    },
                }
            )
        } else {
            toast.success(`${message}`)
        }

    }, [])

    const [values, setValues] = useState({
        code: ''
    })

    const { code } = values

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }


    const clickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault()

        if (code) {
            setValues({ ...values })
        }
        axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_API_URL}/reset-password-activation`,
            data: { code }
        })
            .then(response => {
                console.log('Acount Activation Success', response)
                setValues({ ...values })


                navigate('/reset-password', {
                    state: {
                        unseccesfullPaswordChangeTry: true,
                        code: response.data.code,
                        user: {
                            username: response.data.user.username,
                            email: response.data.user.email
                        },
                        message: 'You have successfully requested password reset. Please type new password and confirm new password.'
                    },
                });


            })
            .catch(error => {
                console.log('Acount Activation Error', error.response.data)
                toast.error(error.response.data.error)
            })
    }

    return (
        <>



            <form>
                <div className="text-center">
                    <h1>Request password reset</h1>
                    <h2 className="p-5 text-center">Hello {email}.</h2>
                    <p>Please input code from email.</p>

                </div>
                <div className="form-group">
                    <label className="text-muted"> Code </label>
                    <input onChange={handleChange('code')} value={code} type="password" className="form-control" required />

                    <button className="btn btn-outline-primary" onClick={clickSubmit}> Request password reset</button>

                </div>

            </form>

            <ToastContainer />
        </>
    )
}

export default ResetPasswordActivation