import { ElementType, useCallback, useState } from "react";
import { Field } from "react-final-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, FormGroup, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

interface Props {
	component?: ElementType;
	type?: string;
	id?: string;
	name: string;
	label?: string;
	required?: boolean;
	autoFocus?: boolean;
	multiline?: boolean;
}

export default function FormField({
	component: Component = TextField,
	type,
	id,
	name,
	label,
	required,
	autoFocus,
	multiline
}: Readonly<Props>) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<FormGroup sx={{ mb: 2, textAlign: "start" }}>
			<Field name={name} autoComplete={name}>
				{(field) => {
					const { input } = field;
					return (
						<Box className="input-row">
							{type === "file" ? (
								<input
									hidden
									type="file"
									id={id}
									accept="image/*"
									multiple
									onChange={(e) => {
										input.onChange(e.target.files);
									}}
								/>
							) : (
								<Component
									{...input}
									fullWidth
									label={label}
									type={showPassword ? "text" : type}
									required={required}
									autoFocus={autoFocus}
									multiline={multiline}
									rows={multiline ? 5 : undefined}
									InputProps={{
										endAdornment: type === "password" && (
											<InputAdornment position="end">
												<IconButton
													edge="end"
													aria-label={label}
													onClick={handleClickShowPassword}
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							)}
							{field.meta.touched && field.meta.error && <Box color="error.dark">{field.meta.error}</Box>}
						</Box>
					);
				}}
			</Field>
		</FormGroup>
	);
}
