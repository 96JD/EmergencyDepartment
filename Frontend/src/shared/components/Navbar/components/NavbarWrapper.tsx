import { ReactNode } from "react";

import { alpha, Box, lighten, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function NavbarWrapper({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			position="fixed"
			right={0}
			p={theme.spacing(0, 2)}
			width="100%"
			height={theme.header.height}
			color={theme.header.textColor}
			bgcolor={alpha(theme.palette.background.default, 0.95)}
			zIndex={6}
			boxShadow={`0 1px 0 ${alpha(
				lighten(theme.colors.primary.main, 0.7),
				0.15
			)}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`}
			sx={{
				backdropFilter: "blur(3px)",
				[theme.breakpoints.up("lg")]: {
					left: theme.sidebar.width,
					width: "auto"
				}
			}}
		>
			{children}
		</Box>
	);
}
