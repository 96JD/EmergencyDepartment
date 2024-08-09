import { formHasErrors } from "96jd-error-handler-utils";
import _ from "lodash";
import { useCallback } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

import { Divider } from "@mui/material";

import { APP_LOCAL_STORAGE } from "../../../AppLocalStorage";
import { APP_ROUTES } from "../../../AppRoutes";
import { LoginCredentials, USER_CONSTANTS } from "../../../models/User";
import { useAppDispatch } from "../../../redux/store";
import { userThunks } from "../../../redux/user/thunks";
import FormField from "../../../shared/components/FormField";
import FormTitle from "../../../shared/components/FormTitle";
import SubmitButton from "../../../shared/components/SubmitButton";
import { validateLoginForm } from "../functions";

export default function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const validate = useCallback((loginCredentials: LoginCredentials) => validateLoginForm(loginCredentials), []);

	const onSubmit = useCallback(
		async (loginCredentials: LoginCredentials) => {
			await dispatch(
				userThunks.loginUserRequest(import.meta.env.PROD ? USER_CONSTANTS.TEST_USER : loginCredentials)
			);
			navigate(localStorage.getItem(APP_LOCAL_STORAGE.REQUESTED_URL) ?? APP_ROUTES.FAQ_LIST);
		},
		[dispatch, navigate]
	);

	return (
		<Form validate={validate} onSubmit={onSubmit}>
			{({ handleSubmit, pristine, submitting, values }) => (
				<>
					<FormTitle label="Login" />
					<FormField type="number" name="personNumber" label="Person Number" autoFocus />
					<FormField type="password" name="password" label="Password" />
					<SubmitButton
						label={!_.isEmpty(values) && submitting ? "Logging..." : "Login"}
						disabled={formHasErrors(validate(values)) || pristine || submitting}
						onClick={() => {
							const handleAsyncSubmit = async () => {
								await handleSubmit();
							};
							void handleAsyncSubmit();
						}}
					/>
					{import.meta.env.PROD && (
						<>
							<Divider sx={{ mt: 2 }} />
							<SubmitButton
								label={_.isEmpty(values) && submitting ? "Logging..." : "Login as Test User"}
								disabled={submitting}
								onClick={() => {
									const handleAsyncSubmit = async () => {
										await handleSubmit();
									};
									void handleAsyncSubmit();
								}}
							/>
						</>
					)}
				</>
			)}
		</Form>
	);
}
