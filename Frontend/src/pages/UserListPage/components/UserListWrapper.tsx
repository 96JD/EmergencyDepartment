import { ReactNode } from "react";

import { Grid } from "@mui/material";

import MainWrapper from "../../../shared/components/MainWrapper";

interface Props {
	children: ReactNode;
}

export default function UserListWrapper({ children }: Readonly<Props>) {
	return (
		<MainWrapper>
			<Grid container>{children}</Grid>
		</MainWrapper>
	);
}
