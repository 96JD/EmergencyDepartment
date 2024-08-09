import { MouseEvent, ReactNode } from "react";

import { Avatar, Box, ListItemButton, Typography, useTheme } from "@mui/material";

import { UserUtils } from "../../../functions/UserUtils";

interface Props {
	hideUserNameOnSmallScreen?: boolean;
	onClick?: (event: MouseEvent) => void;
	children?: ReactNode;
}

export default function NavbarUserBoxButton({ hideUserNameOnSmallScreen, onClick, children }: Readonly<Props>) {
	const theme = useTheme();
	const loggedInUser = UserUtils.getLoggedInUser();
	return (
		<ListItemButton
			sx={{
				":hover": {
					bgcolor: "rgba(140, 124, 240, 0.1)"
				}
			}}
			onClick={onClick}
		>
			<Avatar>{UserUtils.getFirstTwoLetters(loggedInUser)}</Avatar>
			<Box
				sx={{
					display: {
						xs: hideUserNameOnSmallScreen ? "none" : "block",
						sm: "block"
					}
				}}
			>
				<Box textAlign="left" pl={theme.spacing(1)}>
					<Typography variant="body1" display="block" color="secondary">
						{UserUtils.getFullName(loggedInUser)}
					</Typography>
				</Box>
			</Box>
			{children}
		</ListItemButton>
	);
}
