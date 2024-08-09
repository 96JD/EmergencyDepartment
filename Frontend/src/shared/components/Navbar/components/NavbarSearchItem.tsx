import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import {
	Avatar,
	Box,
	Divider,
	lighten,
	Link,
	ListItemAvatar,
	ListItemButton,
	Typography,
	useTheme
} from "@mui/material";

import { Inquiry } from "../../../../models/Inquiry";

interface Props {
	filteredInquiry: Inquiry;
	onClick: () => void;
}

export default function NavbarSearchItem({ filteredInquiry, onClick }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<Box key={filteredInquiry.id} onClick={onClick}>
			<ListItemButton>
				<Box
					sx={{
						display: {
							xs: "none",
							sm: "block"
						}
					}}
				>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
							<FindInPageTwoToneIcon />
						</Avatar>
					</ListItemAvatar>
				</Box>
				<Box flex="1">
					<Box display="flex" justifyContent="space-between">
						<Link variant="body2" href="#" fontWeight="bold" underline="hover">
							#{filteredInquiry.id} {filteredInquiry.title}
						</Link>
					</Box>
					<Typography component="span" variant="body2" color={lighten(theme.palette.secondary.main, 0.5)}>
						{filteredInquiry.description}
					</Typography>
				</Box>
				<ChevronRightTwoToneIcon />
			</ListItemButton>
			<Divider component="li" sx={{ my: 1 }} />
		</Box>
	);
}
