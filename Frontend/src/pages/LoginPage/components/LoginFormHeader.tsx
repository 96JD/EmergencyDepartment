import { Typography } from "@mui/material";

export default function LoginFormHeader() {
	return (
		<>
			<Typography variant="h1" color="primary" mb={2}>
				Emergency Department
			</Typography>
			<Typography color="secondary" mb={4}>
				The emergency department is open 24/7 for treatment of urgent illness and injury that cannot or should
				not wait until the general practitioner is available.
			</Typography>
		</>
	);
}
