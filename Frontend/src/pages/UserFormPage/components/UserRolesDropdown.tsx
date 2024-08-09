import _ from "lodash";
import { useCallback } from "react";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { userRoleSelectors } from "../../../redux/userRole/selectors";
import { userRoleThunks } from "../../../redux/userRole/thunks";
import Spinner from "../../../shared/components/Loader/components/Spinner";
import NoDataFound from "../../../shared/components/NoDataFound";

export default function UserRolesDropdown() {
	const dispatch = useAppDispatch();
	const loadingAllUserRoles = useAppSelector(userRoleSelectors.loadingAllUserRoles);
	const allUserRoles = useAppSelector(userRoleSelectors.allUserRoles);
	const selectedUserRoleId = useAppSelector(userRoleSelectors.selectedUserRoleId);
	const defaultUserRoleId = !_.isEmpty(allUserRoles) ? selectedUserRoleId : "";

	const openUserRolesMenu = useCallback(async () => {
		if (_.isEmpty(allUserRoles)) {
			await dispatch(userRoleThunks.getAllUserRolesRequest());
		}
	}, [allUserRoles, dispatch]);

	const allUserRolesOptions = _.isEmpty(allUserRoles) ? (
		<NoDataFound data="User Roles" />
	) : (
		_.map(allUserRoles, (userRole) => (
			<MenuItem key={userRole.id} value={userRole.id}>
				{userRole.name}
			</MenuItem>
		))
	);

	const onUserRoleChange = useCallback(
		(e: SelectChangeEvent<number>) => {
			const selectedUserRoleId = _.toNumber(e.target.value);
			dispatch(userRoleThunks.setSelectedUserRoleId(selectedUserRoleId));
		},
		[dispatch]
	);

	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel>Role</InputLabel>
			<Select
				label="Role"
				inputProps={{ "aria-label": "Role" }}
				autoComplete="Role"
				value={defaultUserRoleId}
				onOpen={() => {
					void openUserRolesMenu();
				}}
				onChange={onUserRoleChange}
			>
				{loadingAllUserRoles ? <Spinner /> : allUserRolesOptions}
			</Select>
		</FormControl>
	);
}
