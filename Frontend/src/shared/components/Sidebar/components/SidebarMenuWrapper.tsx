import { ReactNode } from "react";

import { Box, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function SidebarMenuWrapper({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				"& .MuiList-root": {
					p: theme.spacing(1),
					"& > .MuiList-root": {
						p: `0 ${theme.spacing(0)} ${theme.spacing(1)}`
					}
				},
				"& .MuiListSubheader-root": {
					lineHeight: 1.4,
					p: theme.spacing(0, 2.5),
					textTransform: "uppercase",
					fontWeight: "bold",
					fontSize: 12,
					color: theme.colors.alpha.trueWhite[50]
				}
			}}
		>
			{children}
		</Box>
	);
}
