import { ReactNode } from "react";

import { Box, Grid, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function InquiryChatInputWrapper({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			position="fixed"
			top="auto"
			bottom={0}
			width={{ xs: "100%", lg: `calc(100% - ${theme.sidebar.width})` }}
		>
			<Grid container p={theme.spacing(2)} bgcolor={theme.colors.alpha.white[100]}>
				{children}
			</Grid>
		</Box>
	);
}
