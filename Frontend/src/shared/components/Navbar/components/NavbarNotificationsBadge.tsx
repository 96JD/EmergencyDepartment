import { ReactNode } from "react";

import { alpha, Badge, useTheme } from "@mui/material";

import { inquirySelectors } from "../../../../redux/inquiry/selectors";
import { useAppSelector } from "../../../../redux/store";

interface Props {
	children: ReactNode;
}

export default function NavbarNotificationsBadge({ children }: Readonly<Props>) {
	const theme = useTheme();
	const activeInquiriesCount = useAppSelector(inquirySelectors.activeInquiriesCount);
	return (
		<Badge
			badgeContent={activeInquiriesCount}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			color="error"
			sx={{
				"& .MuiBadge-badge": {
					bgcolor: alpha(theme.palette.error.main, 0.1),
					color: theme.palette.error.main,
					minWidth: "16px",
					height: "16px",
					p: 0,
					"&::after": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						borderRadius: "50%",
						boxShadow: `0 0 0 1px ${alpha(theme.palette.error.main, 0.3)}`
					}
				}
			}}
		>
			{children}
		</Badge>
	);
}
