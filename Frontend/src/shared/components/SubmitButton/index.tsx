import { Button } from "@mui/material";

interface Props {
	label: string;
	disabled?: boolean;
	onClick: () => void;
}

export default function SubmitButton({ label, disabled, onClick }: Readonly<Props>) {
	return (
		<Button
			variant="contained"
			size="medium"
			sx={{
				mt: 2,
				":focus": {
					bgcolor: "rgb(112, 99, 192)"
				}
			}}
			type="submit"
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</Button>
	);
}
