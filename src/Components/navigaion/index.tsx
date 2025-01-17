import { Link, useMatch } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import './index.scss'

const Navigation = () => {
    const homeMatch = useMatch('/');
    const signinMatch = useMatch('/signin');
    const signupMatch = useMatch('/signup');
    const activateAccountMatch = useMatch('/activate-account');

    const secretMatch = useMatch('/secret');
    const secretAdminMatch = useMatch('/secret-admin');

    const settingsMatch = useMatch('/dashboard/settings');
    const profileMatch = useMatch('/dashboard/profile');
    const twoFactorAuthMatch = useMatch('/verify-2fa');

    const providerMatch = useMatch('/provider');
    const notProviderMatch = useMatch('/not-provider');

    const adminMatch = useMatch('/admin');
    const notAdminMatch = useMatch('/not-admin');
    const forgotPasswordMatch = useMatch('/forgot-password');
    const resetPasswordMatch = useMatch('/reset-password');
    const resetPasswordActivationMatch = useMatch('/reset-password-activation');
    const { user, logout } = useAuth();
    console.log(user);


    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <nav className="navigation">
                {
                    !user?.isAuth &&
                    <>
                        <Link className={homeMatch ? 'active' : ''} to="/">Home</Link>
                        <Link className={signupMatch ? 'active' : ''} to="/signup">Signup</Link>
                        <Link className={activateAccountMatch ? 'active' : ''} to="/activate-account">Activate Account</Link>
                        <Link className={signinMatch ? 'active' : ''} to="/signin">Signin</Link>
                        <Link className={forgotPasswordMatch ? 'active' : ''} to="/forgot-password">Forgot Password</Link>
                        <Link className={resetPasswordActivationMatch ? 'active' : ''} to="/reset-password-activation">Reset Password Actiovation</Link>
                        <Link className={resetPasswordMatch ? 'active' : ''} to="/reset-password">Reset Password</Link>
                    </>
                }
                {
                    user?.isAuth &&
                    <>
                        <Link className={settingsMatch ? 'active' : ''} to="/settings">Settings</Link>
                        <Link className={profileMatch ? 'active' : ''} to="/profile">Profile</Link>
                        <Link className={secretMatch ? 'active' : ''} to="/secret">Secret</Link>
                        <Link className={twoFactorAuthMatch ? 'active' : ''} to="/verify-2fa">Two Factor Authentication</Link>
                        <Link className={secretAdminMatch ? 'active' : ''} to="/secret-admin">Secret Admin</Link>

                        <Link className={providerMatch ? 'active' : ''} to="/provider">Provider</Link>
                        <Link className={notProviderMatch ? 'active' : ''} to="/not-provider">Not Provider</Link>

                        <Link className={adminMatch ? 'active' : ''} to="/admin">Admin</Link>
                        <Link className={notAdminMatch ? 'active' : ''} to="/not-admin">Not Provider</Link>


                    </>

                }

            </nav>
            {
                user?.isAuth && (<div>

                    <button onClick={handleLogout}>Logout</button>
                </div>)
            }
        </>

    )
}

export default Navigation