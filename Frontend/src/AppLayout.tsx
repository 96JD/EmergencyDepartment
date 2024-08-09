import _ from "lodash";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { HubConnectionBuilder } from "@microsoft/signalr";
import { Box, useTheme } from "@mui/material";

import { SIGNAL_R_HUB_URL } from "./api";
import Navbar from "./shared/components/Navbar";
import Sidebar from "./shared/components/Sidebar";
import { UserUtils } from "./shared/functions/UserUtils";

export default function AppLayout() {
	const theme = useTheme();
	const signalRConnection = new HubConnectionBuilder().withUrl(SIGNAL_R_HUB_URL).withAutomaticReconnect().build();
	const isUserLoggedIn = UserUtils.isUserLoggedIn();

	useEffect(() => {
		if (isUserLoggedIn) {
			signalRConnection.start().catch((e: unknown) => {
				console.error(`WebSocket Connection failed: ${_.toString(e)}`);
			});
		}
		return () => {
			void signalRConnection.stop();
		};
	}, [isUserLoggedIn, signalRConnection]);

	return isUserLoggedIn ? (
		<>
			<Navbar />
			<Sidebar />
			<Box
				pt={theme.header.height}
				zIndex={5}
				sx={{
					[theme.breakpoints.up("lg")]: {
						ml: theme.sidebar.width
					}
				}}
			>
				<Outlet context={signalRConnection} />
			</Box>
		</>
	) : (
		<Box py={2.5}>
			<Outlet />
		</Box>
	);
}
