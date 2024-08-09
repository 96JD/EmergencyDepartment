import { ReactNode } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import { Box, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function SidebarScrollbar({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Scrollbars
			autoHide
			renderThumbVertical={() => (
				<Box
					width={5}
					borderRadius={theme.general.borderRadiusLg}
					bgcolor={theme.colors.alpha.black[10]}
					sx={{
						transition: theme.transitions.create(["background"]),
						"&:hover": {
							bgcolor: theme.colors.alpha.black[30]
						}
					}}
				/>
			)}
		>
			{children}
		</Scrollbars>
	);
}
