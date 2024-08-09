import { Typography } from "@mui/material";

interface Props {
	data: string;
}

export default function NoDataFound({ data }: Readonly<Props>) {
	return (
		<Typography align="center" fontSize={16}>
			No {data} Found!
		</Typography>
	);
}
