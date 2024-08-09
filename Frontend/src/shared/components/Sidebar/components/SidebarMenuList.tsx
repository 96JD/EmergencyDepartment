import _ from "lodash";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Box, ListItemButton } from "@mui/material";

import { SidebarContext } from "./SidebarContext";
import { SidebarItem } from "./SidebarMenu";

interface Props {
	sidebarItems: SidebarItem[];
}

export default function SidebarMenuList({ sidebarItems }: Readonly<Props>) {
	const { closeSidebar } = useContext(SidebarContext);
	return (
		<Box py={1}>
			{_.map(sidebarItems, (item) => {
				return (
					item.visible && (
						<ListItemButton
							key={item.label}
							component={NavLink}
							to={item.link}
							sx={{
								":hover": {
									bgcolor: "rgba(140, 124, 240, 0.1)"
								}
							}}
							onClick={closeSidebar}
						>
							<Box px={2}>{item.icon}</Box>
							{item.label}
						</ListItemButton>
					)
				);
			})}
		</Box>
	);
}
