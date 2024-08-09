import { ReactNode, useContext } from "react";

import { Drawer } from "@mui/material";

import { SidebarContext } from "./SidebarContext";

interface Props {
	children: ReactNode;
}

export default function SidebarDrawer({ children }: Readonly<Props>) {
	const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
	return (
		<Drawer anchor="left" open={sidebarToggle} onClose={toggleSidebar}>
			{children}
		</Drawer>
	);
}
