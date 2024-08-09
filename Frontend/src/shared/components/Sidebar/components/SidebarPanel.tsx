import { Divider, useTheme } from "@mui/material";

import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarScrollbar from "./SidebarScrollbar";
import SidebarWrapper from "./SidebarWrapper";

interface Props {
	xs?: string;
}

export default function SidebarPanel({ xs }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<SidebarWrapper xs={xs}>
			<SidebarScrollbar>
				<SidebarLogo />
				<Divider
					sx={{ mt: theme.spacing(3), mx: theme.spacing(2), bgcolor: theme.colors.alpha.trueWhite[10] }}
				/>
				<SidebarMenu />
			</SidebarScrollbar>
			<Divider sx={{ bgcolor: theme.colors.alpha.trueWhite[10] }} />
		</SidebarWrapper>
	);
}
