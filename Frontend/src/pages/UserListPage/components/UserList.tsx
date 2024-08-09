import _ from "lodash";

import { Grid } from "@mui/material";

import { User } from "../../../models/User";
import { useAppSelector } from "../../../redux/store";
import { userSelectors } from "../../../redux/user/selectors";
import NoDataFound from "../../../shared/components/NoDataFound";
import UserItem from "./UserItem";

export default function UserList() {
	const allNurses = useAppSelector(userSelectors.allNurses);
	return _.isEmpty(allNurses) ? (
		<Grid item m="auto" p={2}>
			<NoDataFound data="Nurses" />
		</Grid>
	) : (
		_.map(allNurses, (nurse: User) => <UserItem key={nurse.personNumber} nurse={nurse} />)
	);
}
