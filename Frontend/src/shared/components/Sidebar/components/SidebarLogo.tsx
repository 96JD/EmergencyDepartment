import { Box, Tooltip } from "@mui/material";

export default function SidebarLogo() {
	const imgSrc = "/assets/images/logo.png";
	return (
		<Box width={5} my={3} mx={3}>
			<Tooltip title="Emergency Department" arrow>
				<img src={imgSrc} alt={imgSrc} height={100} />
			</Tooltip>
		</Box>
	);
}
