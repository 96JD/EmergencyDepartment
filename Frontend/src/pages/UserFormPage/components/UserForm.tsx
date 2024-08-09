import { formHasErrors } from "96jd-error-handler-utils";
import { FormApi } from "final-form";
import _ from "lodash";
import { useCallback } from "react";
import { Form } from "react-final-form";

import { Grid } from "@mui/material";

import { User } from "../../../models/User";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { userSelectors } from "../../../redux/user/selectors";
import { userThunks } from "../../../redux/user/thunks";
import { userRoleSelectors } from "../../../redux/userRole/selectors";
import FormField from "../../../shared/components/FormField";
import FormTitle from "../../../shared/components/FormTitle";
import SubmitButton from "../../../shared/components/SubmitButton";
import { validateUserForm } from "../functions";
import UserRolesDropdown from "./UserRolesDropdown";

interface Props {
	isUpdateForm?: boolean;
}

export default function UserForm({ isUpdateForm }: Readonly<Props>) {
	const dispatch = useAppDispatch();

	const selectedUser = useAppSelector(userSelectors.selectedUser);

	const selectedUserRoleId = useAppSelector(userRoleSelectors.selectedUserRoleId);

	const validate = useCallback(
		(user: User) => validateUserForm(user, _.isBoolean(isUpdateForm) && isUpdateForm),
		[isUpdateForm]
	);

	const onSubmit = useCallback(
		async (user: User, form: FormApi<User, User>) => {
			await dispatch(
				!isUpdateForm
					? userThunks.createUserRequest({ ...user, userRoleId: selectedUserRoleId })
					: userThunks.updateUserRequest(user)
			);
			if (!isUpdateForm) {
				form.restart();
			}
		},
		[dispatch, isUpdateForm, selectedUserRoleId]
	);

	return (
		<Form initialValues={isUpdateForm ? selectedUser : undefined} validate={validate} onSubmit={onSubmit}>
			{({ handleSubmit, pristine, submitting, values }) => (
				<>
					<FormTitle label={!isUpdateForm ? "User" : "Update User"} />
					{!isUpdateForm && (
						<>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<FormField type="number" name="personNumber" label="Person Number" autoFocus />
								</Grid>
								<Grid item xs={6}>
									<UserRolesDropdown />
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<FormField name="firstName" label="First Name" />
								</Grid>
								<Grid item xs={6}>
									<FormField name="lastName" label="Last Name" />
								</Grid>
							</Grid>
						</>
					)}
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormField name="phoneNumber" label="Phone Number" />
						</Grid>
						<Grid item xs={6}>
							<FormField name="address" label="Address" />
						</Grid>
					</Grid>
					{!isUpdateForm && (
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<FormField type="password" name="password" label="Password" />
							</Grid>
							<Grid item xs={6}>
								<FormField type="password" name="confirmPassword" label="Confirm Password" />
							</Grid>
						</Grid>
					)}
					<SubmitButton
						label={submitting ? "Submitting..." : "Submit"}
						disabled={formHasErrors(validate(values)) || pristine || submitting}
						onClick={() => {
							const handleAsyncSubmit = async () => {
								await handleSubmit();
							};
							void handleAsyncSubmit();
						}}
					/>
				</>
			)}
		</Form>
	);
}
