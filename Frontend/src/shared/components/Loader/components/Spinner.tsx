import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
	return (
		<Box display="flex" alignItems="center" justifyContent="center" width="100%" mt={2}>
			<CircularProgress size={50} disableShrink thickness={3} />
		</Box>
	);
}
