import { ReactNode } from "react";

import { alpha, Box, useTheme } from "@mui/material";

interface Props {
	children: ReactNode;
}

export default function SidebarMenuListWrapper({ children }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				"& .MuiList-root": {
					"& .MuiListItem-root": {
						p: "1px 0",
						"& .MuiBadge-root": {
							position: "absolute",
							right: theme.spacing(3.2),
							"& .MuiBadge-standard": {
								fontSize: 10,
								fontWeight: "bold",
								textTransform: "uppercase",
								color: theme.palette.primary.contrastText,
								bgcolor: "primary.main"
							}
						},
						"& .MuiButton-root": {
							display: "flex",
							width: "100%",
							justifyContent: "flex-start",
							p: `${theme.spacing(1.2)} ${theme.spacing(3)}`,
							color: theme.colors.alpha.trueWhite[70],
							bgcolor: "transparent",
							"& .MuiButton-startIcon, & .MuiButton-endIcon": {
								transition: theme.transitions.create(["color"]),
								"& .MuiSvgIcon-root": {
									fontSize: "inherit",
									transition: "none"
								}
							},
							"& .MuiButton-startIcon": {
								color: theme.colors.alpha.trueWhite[30],
								fontSize: 20,
								mr: theme.spacing(1)
							},
							"& .MuiButton-endIcon": {
								color: theme.colors.alpha.trueWhite[50],
								ml: "auto",
								opacity: 0.8,
								fontSize: 20
							},
							"&.active, &:hover": {
								bgcolor: alpha(theme.colors.alpha.trueWhite[100], 0.06),
								color: theme.colors.alpha.trueWhite[100],
								"& .MuiButton-startIcon, & .MuiButton-endIcon": {
									color: theme.colors.alpha.trueWhite[100]
								}
							}
						},
						"&.Mui-children": {
							flexDirection: "column",
							"& .MuiBadge-root": {
								position: "absolute",
								right: theme.spacing(7)
							}
						},
						"& .MuiCollapse-root": {
							width: "100%",
							"& .MuiList-root": {
								p: `${theme.spacing(1)} 0`,
								"& .MuiListItem-root": {
									p: "1px 0",
									"& .MuiButton-root": {
										p: `${theme.spacing(0.8)} ${theme.spacing(3)}`,
										"& .MuiBadge-root": {
											right: theme.spacing(3.2)
										},
										"&:before": {
											content: '""',
											bgcolor: theme.colors.alpha.trueWhite[100],
											opacity: 0,
											transition: theme.transitions.create(["transform", "opacity"]),
											width: "6px",
											height: "6px",
											transform: "scale(0)",
											transformOrigin: "center",
											borderRadius: "20px",
											mr: theme.spacing(1.8)
										},
										"&.active, &:hover": {
											"&:before": {
												transform: "scale(1)",
												opacity: 1
											}
										}
									}
								}
							}
						}
					}
				}
			}}
		>
			{children}
		</Box>
	);
}
