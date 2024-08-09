import _ from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import { APP_ROUTES } from "../../../AppRoutes";
import { User } from "../../../models/User";
import { UserUtils } from "../../../shared/functions/UserUtils";
import UserItemWrapper from "./UserItemWrapper";

interface Props {
	nurse: User;
}

export default function UserItem({ nurse }: Readonly<Props>) {
	const navigate = useNavigate();

	const onUserClick = useCallback(() => {
		navigate(`/${APP_ROUTES.USER_FORM}/${_.toString(nurse.personNumber)}`);
	}, [navigate, nurse.personNumber]);

	return (
		<UserItemWrapper>
			<List>
				<ListItem onClick={onUserClick}>
					<ListItemAvatar>
						<Avatar>{UserUtils.getFirstTwoLetters(nurse)}</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={UserUtils.getFullName(nurse)}
						primaryTypographyProps={{ color: "primary" }}
						secondary={nurse.phoneNumber}
					/>
				</ListItem>
			</List>
		</UserItemWrapper>
	);
}
