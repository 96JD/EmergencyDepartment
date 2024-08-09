import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { APP_LOCAL_STORAGE } from "../../AppLocalStorage";
import FormWrapper from "../../shared/components/FormWrapper";
import { UserUtils } from "../../shared/functions/UserUtils";
import LoginForm from "./components/LoginForm";
import LoginFormHeader from "./components/LoginFormHeader";

export default function LoginPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const isUserLoggedIn = UserUtils.isUserLoggedIn();
		if (isUserLoggedIn) {
			const requestedURL = localStorage.getItem(APP_LOCAL_STORAGE.REQUESTED_URL);
			if (requestedURL) {
				navigate(requestedURL);
			}
		}
	}, [navigate]);

	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<FormWrapper>
				<LoginFormHeader />
				<LoginForm />
			</FormWrapper>
		</>
	);
}
