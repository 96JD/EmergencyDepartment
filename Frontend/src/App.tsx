import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { APP_LOCAL_STORAGE } from "./AppLocalStorage";
import { APP_ROUTES, AppRoutes } from "./AppRoutes";
import { themeCreator } from "./AppTheme";
import { UserUtils } from "./shared/functions/UserUtils";

export default function App() {
	const navigate = useNavigate();
	const routes = useRoutes(AppRoutes);

	useEffect(() => {
		const isUserLoggedIn = UserUtils.isUserLoggedIn();

		if (!isUserLoggedIn) {
			navigate(APP_ROUTES.LOGIN);
		}

		if (location.pathname !== APP_ROUTES.LOGIN) {
			localStorage.setItem(APP_LOCAL_STORAGE.REQUESTED_URL, location.pathname);
		}
	}, [navigate]);

	return (
		<ThemeProvider theme={themeCreator()}>
			<CssBaseline />
			<ToastContainer />
			{routes}
		</ThemeProvider>
	);
}
