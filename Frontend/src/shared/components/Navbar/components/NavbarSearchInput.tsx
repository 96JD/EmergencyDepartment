import { ChangeEvent } from "react";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { InputAdornment, TextField, useTheme } from "@mui/material";

interface Props {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NavbarSearchInput({ value, onChange }: Readonly<Props>) {
	const theme = useTheme();
	return (
		<TextField
			label="Search"
			placeholder="Search inquiry by Id, Title or Description ..."
			autoFocus
			fullWidth
			sx={{
				bgcolor: theme.colors.alpha.white[100],
				"& .MuiInputBase-input": {
					fontSize: 18
				}
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchTwoToneIcon />
					</InputAdornment>
				)
			}}
			value={value}
			onChange={onChange}
		/>
	);
}
