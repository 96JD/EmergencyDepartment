import { Typography } from "@mui/material";

interface Props {
	label: string;
}

export default function FormTitle({ label }: Readonly<Props>) {
	return (
		<Typography variant="h2" fontSize={25} mb={4}>
			{label} Form
		</Typography>
	);
}
