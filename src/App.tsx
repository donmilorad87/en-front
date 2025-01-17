
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,

} from "react-router-dom";

import { isObjectEmpty } from "./utility/json";


import "./App.scss";
import { HomeLayout } from "./layout/homeLayout";
import { User } from "./hooks/useAuth";
import { AuthLayout } from "./layout/authLayout";
import Signin from "./Pages/signin";
import SignUp from "./Pages/signup";
import ActivateAccount from "./Pages/activateAccount";
import Homepage from "./Pages/Homepage";
import { ProtectedLayout } from "./layout/protectedLayout";
import ProfilePage from "./Pages/profilePage";
import SettingsPage from "./Pages/settingsPage";
import NotLoggedIn from "./Pages/notLoggedIn";
import NotProvider from "./Pages/notProvider";
import { ProviderLayout } from "./layout/providerLayout";
import Provider from "./Pages/provider";
import Admin from "./Pages/admin";
import { AdminLayout } from "./layout/adminLayout";
import NotAdmin from "./Pages/notAdmin";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";
import ResetPasswordActivation from "./Pages/resetPasswordActivation";
import GoogleLoginCodeExcange from "./Components/googleLoginCodeExcange";


const getUserData = async (): Promise<User> => {
	return new Promise((resolve) => {
		let user: User = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).reducer).user : JSON.parse("{}");

		if (isObjectEmpty(user)) {
			user = {
				token: "",
				isAuth: false,
				user: {
					username: "guest",
					email: "guest",
					role: 0,
					twofactorauth: false

				}

			}
		}

		resolve(user);
	});
}


export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => getUserData()}
		>

			<Route element={<HomeLayout />}>
				<Route path="/" index element={<Homepage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/activate-account" element={<ActivateAccount />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/auth/google/google-callback/oauth/login" element={<GoogleLoginCodeExcange />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password-activation" element={<ResetPasswordActivation />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/not-logged-in" element={<NotLoggedIn />} />
				<Route path="/not-provider" element={<NotProvider />} />
				<Route path="/not-admin" element={<NotAdmin />} />
				<Route path="*" element={<h1>404</h1>} />
			</Route>

			<Route element={<ProtectedLayout />}>
				<Route path="profile" element={<ProfilePage />} />
				<Route path="settings" element={<SettingsPage />} />

			</Route>

			<Route element={<ProviderLayout />}>
				<Route path="provider" element={<Provider />} />
			</Route>

			<Route element={<AdminLayout />}>
				<Route path="admin" element={<Admin />} />
			</Route>
		</Route>
	)
);