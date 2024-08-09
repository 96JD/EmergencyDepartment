import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { ListItemButton, useTheme } from "@mui/material";

import { APP_ROUTES } from "../../../../AppRoutes";
import { useAppDispatch } from "../../../../redux/store";
import { userThunks } from "../../../../redux/user/thunks";

export default function NavbarLogoutButton() {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = useCallback(async () => {
		await dispatch(userThunks.logoutUserRequest());
		navigate(APP_ROUTES.LOGIN);
	}, [dispatch, navigate]);

	return (
		<ListItemButton
			sx={{
				mt: 1,
				color: theme.colors.primary.main,
				":hover": {
					bgcolor: "rgba(140, 124, 240, 0.1)"
				}
			}}
			onClick={() => {
				void handleLogout();
			}}
		>
			<LockOpenTwoToneIcon sx={{ mr: 1 }} />
			Log Out
		</ListItemButton>
	);
}
