import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "../../AppRoutes";
import { USER_ROLES_CONSTANTS } from "../../models/UserRole";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userSelectors } from "../../redux/user/selectors";
import { userThunks } from "../../redux/user/thunks";
import Spinner from "../../shared/components/Loader/components/Spinner";
import PageTitleWrapper from "../../shared/components/PageTitleWrapper";
import { UserUtils } from "../../shared/functions/UserUtils";
import UserList from "./components/UserList";
import UserListWrapper from "./components/UserListWrapper";

export default function UserListPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const loadingAllUsers = useAppSelector(userSelectors.loadingAllUsers);

	const fetchAllUsers = useCallback(async () => {
		await dispatch(userThunks.getAllUsersRequest());
	}, [dispatch]);

	useEffect(() => {
		const loggedInUser = UserUtils.getLoggedInUser();
		switch (loggedInUser.userRoleId) {
			case USER_ROLES_CONSTANTS.PATIENT:
				navigate(`/${APP_ROUTES.INQUIRY_FORM}`);
				break;
			case USER_ROLES_CONSTANTS.NURSE:
				navigate(`/${APP_ROUTES.INQUIRY_LIST}`);
				break;
			case USER_ROLES_CONSTANTS.ADMIN:
				void fetchAllUsers();
				break;
		}
	}, [fetchAllUsers, navigate]);

	return (
		<>
			<Helmet>
				<title>User List</title>
			</Helmet>
			<PageTitleWrapper route={`/${APP_ROUTES.USER_FORM}`} heading="Users" subHeading="All nurses" />
			{loadingAllUsers ? (
				<Spinner />
			) : (
				<UserListWrapper>
					<UserList />
				</UserListWrapper>
			)}
		</>
	);
}
