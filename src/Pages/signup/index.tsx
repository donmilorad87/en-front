import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useState, useRef } from 'react'
import axios from 'axios'
import { usernameChecker, passwordChecker, emailChecker, confirmPasswordChecker, /* iAgreeChecker */ } from '../../utility/auth'

import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        usernameLabel: '',
        email: '',
        emailLabel: '',
        password: '',
        passowrdLabel: '',
        confirmPassword: '',
        confirmPasswordLabel: '',
        iAgreeCheckbox: '',
        iAgreeCheckboxLabel: '',
        buttonText: 'Submit',
        buttonState: true
    })
    const { username, usernameLabel, email, emailLabel, password, passowrdLabel, confirmPassword, confirmPasswordLabel, /* iAgreeCheckbox,  */iAgreeCheckboxLabel, buttonText, buttonState } = values


    const acceptTerms = useRef<HTMLInputElement>(null)

    const handleChangeUsername = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {


        let userCheck = usernameChecker(event.target.value)

        let usernameError
        let formErrors = []

        if (acceptTerms.current) {

            if (!acceptTerms.current.checked) {
                formErrors.push('Therms and coditions must be aggreed.')
            }

            if (userCheck.length > 0 || formErrors.length > 0 || userCheck.length > 0 && formErrors.length > 0) {
                usernameError = true
                acceptTerms.current.checked = false

            } else {
                usernameError = false
            }
        } else {
            usernameError = true
        }

        setValues({ ...values, usernameLabel: userCheck.toString(), iAgreeCheckboxLabel: formErrors.toString(), buttonState: usernameError, [name]: event.target.value })


    }

    const handleChangeEmail = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let emaiCheck = emailChecker(event.target.value)

        let emailError
        let formErrors = []
        if (acceptTerms.current) {

            if (!acceptTerms.current.checked) {
                formErrors.push('Therms and coditions must be aggreed.')
            }

            if (emaiCheck.length > 0 || formErrors.length > 0 || emaiCheck.length > 0 && formErrors.length > 0) {
                emailError = true
                acceptTerms.current.checked = false

            } else {
                emailError = false
            }
        } else {
            emailError = true
        }
        setValues({ ...values, emailLabel: emaiCheck.toString(), iAgreeCheckboxLabel: formErrors.toString(), buttonState: emailError, [name]: event.target.value })


    }

    const handleChangePassword = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

        let passwordCheck = passwordChecker(event.target.value)

        let passwordError
        let formErrors = []
        if (acceptTerms.current) {
            if (!acceptTerms.current.checked) {
                formErrors.push('Therms and coditions must be aggreed.')
            }

            if (passwordCheck.length > 0 || formErrors.length > 0 || passwordCheck.length > 0 && formErrors.length > 0) {
                passwordError = true
                acceptTerms.current.checked = false

            } else {
                console.log('ovdesmo')


                passwordError = false
                console.log('ovdesmo2')

            }
        } else {
            passwordError = true
        }
        let confirmPasswordLabel = ''
        if (event.target.value !== confirmPassword) {
            confirmPasswordLabel = 'Password does not match.'
        }
        setValues({ ...values, passowrdLabel: passwordCheck.toString(), confirmPasswordLabel, iAgreeCheckboxLabel: formErrors.toString(), buttonState: passwordError, [name]: event.target.value })



    }
    const handleChangeConfirmPassword = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)


        let confirmPasswordCheck = confirmPasswordChecker(event.target.value, password)


        let confirmPasswordError
        let formErrors = []
        if (acceptTerms.current) {


            if (!acceptTerms.current.checked) {
                formErrors.push('Therms and coditions must be aggreed.')
            }

            if (confirmPasswordCheck.length > 0 || formErrors.length > 0 || confirmPasswordCheck.length > 0 && formErrors.length > 0) {
                confirmPasswordError = true
                acceptTerms.current.checked = false

            } else {
                console.log('ovdesmo')


                confirmPasswordError = false

            }
        } else {
            confirmPasswordError = true
        }



        setValues({ ...values, confirmPasswordLabel: confirmPasswordCheck.toString(), iAgreeCheckboxLabel: formErrors.toString(), buttonState: confirmPasswordError, [name]: event.target.value })


    }

    const handleChangeIAgree = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {



        let iAgreeError
        let usernameError = []
        let emailError = []
        let passwordErrors = []
        let confirmPasswordErrors = []
        let iAgreeErrors = []

        let formErrors = []

        if (!username || usernameChecker(username).length > 0) {

            if (usernameChecker(username).length > 0) {
                usernameError.push(usernameChecker(username).toString())
                formErrors.push(usernameChecker(username).toString())
            } else {
                usernameError.push('Username is required.')
                formErrors.push('Username is required.')
            }
        }
        if (!email || emailChecker(email).length > 0) {
            if (emailChecker(email).length > 0) {
                emailError.push(emailChecker(email).toString())
                formErrors.push(emailChecker(email).toString())
            } else {
                emailError.push('Email is required.')
                formErrors.push('Email is required.')
            }
        }
        if (!password || passwordChecker(password).length > 0) {
            if (passwordChecker(password).length > 0) {
                passwordErrors.push(passwordChecker(password).toString())
                formErrors.push(passwordChecker(password).toString())
            } else {
                passwordErrors.push('Password is required.')
                formErrors.push('Password is required.')
            }
        }
        if (!confirmPassword || confirmPasswordChecker(confirmPassword, password)) {
            if (confirmPasswordChecker(confirmPassword, password).length > 0) {
                confirmPasswordErrors.push(confirmPasswordChecker(confirmPassword, password).toString())
                formErrors.push(confirmPasswordChecker(confirmPassword, password).toString())
            }
        }

        if (acceptTerms.current) {
            if (!acceptTerms.current.checked) {

                iAgreeErrors.push('Therms and coditions must be aggreed.')
                formErrors.push('Therms and coditions must be aggreed.')
            }

            if (formErrors.length > 0) {
                iAgreeError = true
                acceptTerms.current.checked = false
            } else {
                iAgreeError = false

            }
        } else {
            iAgreeError = true
        }

        setValues({
            ...values,
            usernameLabel: usernameError.toString(),
            emailLabel: emailError.toString(),
            passowrdLabel: passwordErrors.toString(),
            confirmPasswordLabel: confirmPasswordErrors.toString(),
            iAgreeCheckboxLabel: iAgreeError ? 'Therms and coditions must be aggreed.' : '',
            buttonState: iAgreeError,
            [name]: event.target.value
        })




    }



    const clickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })

        axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_API_URL}/singup`,
            data: { username, email, password, confirmPassword }
        })
            .then(response => {
                console.log('SINGUP SUCCESS', response)
                setValues({ ...values, buttonText: 'Submitted' })


                navigate('/activate-account', {
                    state: {
                        email, // Replace with the actual username
                        username
                    },
                });

                toast.success(response.data.message)

            })
            .catch(error => {
                console.log('SIGN UP error', error.response)
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })

    }

    return (
        <>
            <form>
                <div className="form-group">
                    <label className="text-muted"> Username </label>
                    <input pattern=".{8,}" title="Username must be at least 8 characters long" onChange={handleChangeUsername('username')} id="chUsername" value={username} type="text" className="form-control" required />
                    <label className=" awrp"> {usernameLabel} </label>
                </div>

                <div className="form-group">
                    <label className="text-muted"> Email </label>
                    <input onChange={handleChangeEmail('email')} title="Username must be at least 8 characters long" id="chEmail" value={email} type="email" className="form-control" required />
                    <label className=" awrp"> {emailLabel} </label>
                </div>

                <div className="form-group">
                    <label className="text-muted"> Password </label>
                    <input pattern=".{8,}" title="Password must be at least 8 characters long" onChange={handleChangePassword('password')} id="chPassword" value={password} type="password" className="form-control" required />
                    <label className=" awrp"> {passowrdLabel} </label>

                </div>

                <div className="form-group">
                    <label className="text-muted"> Confirm Password </label>
                    <input pattern=".{8,}" title="Confirm password must be at least 8 characters long" onChange={handleChangeConfirmPassword('confirmPassword')} id="chConfirmPassword" value={confirmPassword} type="password" className="form-control" required />

                    <label className=" awrp">  {confirmPasswordLabel}  </label>
                </div>


                <div className="form-group">
                    <label className="text-muted float-left"> I Agree. Terms and Conditions </label>
                    <input ref={acceptTerms} required onChange={handleChangeIAgree('iAgreeCheckbox')} type="checkbox" id="chBox" className="form-control float-left" style={{
                        width: '38px',
                        margin: '-8px 8px 0px 8px'
                    }} />
                    <label className="float-left awrp"> {iAgreeCheckboxLabel}</label>
                </div>

                <div className="pt-4 p-0" style={{ width: '100%', float: 'left' }}>
                    <button className="btn btn-primary" type="submit" onClick={clickSubmit} disabled={buttonState}> {buttonText} </button>
                </div>
            </form>
            <ToastContainer />
        </>

    )
}

export default SignUp