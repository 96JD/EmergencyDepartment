import { Box, Typography } from "@mui/material";

interface Props {
	searchValue: string;
}

export default function NavbarSearchResultHeader({ searchValue }: Readonly<Props>) {
	return (
		<Box display="flex" justifyContent="space-between" pt={0} pb={1}>
			<Typography component="span" variant="body2">
				Search results for
				<Typography component="span" variant="body1" fontWeight="bold">
					{` "${searchValue}"`}
				</Typography>
			</Typography>
		</Box>
	);
}
