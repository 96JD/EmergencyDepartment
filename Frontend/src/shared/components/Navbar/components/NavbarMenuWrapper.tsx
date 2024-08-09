import { ReactNode } from "react";

import { Box, Divider, Stack, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function NavbarMenuWrapper({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Stack direction="row" divider={<Divider orientation="vertical" flexItem />} alignItems="center" spacing={2}>
			<Box
				display={{
					xs: "none",
					md: "block"
				}}
				sx={{
					"& .MuiTouchRipple-root": {
						display: "none"
					},
					"& .MuiListItemButton-root": {
						transition: theme.transitions.create(["color", "fill"]),
						"&.MuiListItem-indicators": {
							p: `${theme.spacing(1)} ${theme.spacing(2)}`,
							"& .MuiListItemText-root": {
								"& .MuiTypography-root": {
									"&:before": {
										content: '""',
										height: "4px",
										width: "22px",
										opacity: 0,
										visibility: "hidden",
										display: "block",
										position: "absolute",
										bottom: "-10px",
										transition: "all .2s",
										borderRadius: theme.general.borderRadiusLg,
										bgcolor: "primary.main"
									}
								}
							},
							"&.active, &:active, &:hover": {
								"& .MuiListItemText-root": {
									"& .MuiTypography-root": {
										"&:before": {
											opacity: 1,
											visibility: "visible",
											bottom: "0px"
										}
									}
								},
								":hover": {
									bgcolor: "transparent"
								}
							}
						}
					}
				}}
			>
				{children}
			</Box>
		</Stack>
	);
}
