import { useContext } from "react";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { Box, IconButton, Tooltip } from "@mui/material";

import { SidebarContext } from "./SidebarContext";

export default function SidebarMenuButton() {
	const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
	return (
		<Box component="span" ml={2} display={{ xs: "inline-block", lg: "none" }}>
			<Tooltip arrow title="Toggle Menu">
				<IconButton color="primary" onClick={toggleSidebar}>
					{!sidebarToggle ? <MenuTwoToneIcon fontSize="small" /> : <CloseTwoToneIcon fontSize="small" />}
				</IconButton>
			</Tooltip>
		</Box>
	);
}
