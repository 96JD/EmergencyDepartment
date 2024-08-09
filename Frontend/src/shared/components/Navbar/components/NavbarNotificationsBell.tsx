import { MouseEvent, useCallback, useEffect, useState } from "react";

import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import { IconButton, Tooltip } from "@mui/material";

import { inquiryThunks } from "../../../../redux/inquiry/thunks";
import { useAppDispatch } from "../../../../redux/store";
import NavbarNotificationsBadge from "./NavbarNotificationsBadge";
import NavbarNotificationsPopup from "./NavbarNotificationsPopup";

export default function NavbarNotificationsBell() {
	const dispatch = useAppDispatch();

	const fetchActiveInquiriesCount = useCallback(async () => {
		await dispatch(inquiryThunks.getActiveInquiriesCountRequest());
	}, [dispatch]);

	useEffect(() => {
		void fetchActiveInquiriesCount();
	}, [fetchActiveInquiriesCount]);

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
	const open = Boolean(anchorEl);

	const openNotificationsPopup = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	}, []);
	const closeNotificationsPopup = useCallback(() => {
		setAnchorEl(undefined);
	}, []);

	return (
		<>
			<Tooltip arrow title="Notifications">
				<IconButton color="primary" onClick={openNotificationsPopup}>
					<NavbarNotificationsBadge>
						<NotificationsActiveTwoToneIcon />
					</NavbarNotificationsBadge>
				</IconButton>
			</Tooltip>
			{open && <NavbarNotificationsPopup anchorEl={anchorEl} onClose={closeNotificationsPopup} />}
		</>
	);
}
