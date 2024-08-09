import { ReactNode } from "react";

import { alpha, Box, lighten, useTheme } from "@mui/material";

interface Props {
	xs?: string;
	children: ReactNode;
}

export default function SidebarWrapper({ xs, children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Box
			display={{
				xs: xs,
				lg: "inline-block"
			}}
			position={xs ? "fixed" : "relative"}
			top={0}
			left={0}
			pb={9.5}
			minWidth={theme.sidebar.width}
			width={theme.sidebar.width}
			height="100%"
			boxShadow={theme.sidebar.boxShadow}
			color={theme.colors.alpha.trueWhite[70]}
			bgcolor={alpha(lighten(theme.header.background as string, 0.1), 0.5)}
			zIndex={7}
		>
			{children}
		</Box>
	);
}
