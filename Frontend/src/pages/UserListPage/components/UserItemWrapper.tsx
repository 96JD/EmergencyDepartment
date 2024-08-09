import { ReactNode } from "react";

import { Grid, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function UserItemWrapper({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			p={2}
			borderRadius={theme.general.borderRadius}
			tabIndex={0}
			sx={{
				cursor: "pointer",
				":focus, :hover": {
					outline: 0,
					bgcolor: theme.colors.primary.light
				}
			}}
		>
			{children}
		</Grid>
	);
}
