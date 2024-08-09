import { formHasErrors } from "96jd-error-handler-utils";
import { FormApi } from "final-form";
import { useCallback } from "react";
import { Form } from "react-final-form";

import { Faq } from "../../../models/Faq";
import { faqSelectors } from "../../../redux/faq/selectors";
import { faqThunks } from "../../../redux/faq/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import FormField from "../../../shared/components/FormField";
import FormTitle from "../../../shared/components/FormTitle";
import SubmitButton from "../../../shared/components/SubmitButton";
import { validateFaqForm } from "../functions";

interface Props {
	isUpdateForm?: boolean;
}

export default function FaqForm({ isUpdateForm }: Readonly<Props>) {
	const dispatch = useAppDispatch();

	const selectedFaq = useAppSelector(faqSelectors.selectedFaq);

	const validate = useCallback((faq: Faq) => validateFaqForm(faq), []);

	const onSubmit = useCallback(
		async (faq: Faq, form: FormApi<Faq, Faq>) => {
			await dispatch(!isUpdateForm ? faqThunks.createFaqRequest(faq) : faqThunks.updateFaqRequest(faq));
			if (!isUpdateForm) {
				form.restart();
			}
		},
		[dispatch, isUpdateForm]
	);

	return (
		<Form initialValues={isUpdateForm ? selectedFaq : undefined} validate={validate} onSubmit={onSubmit}>
			{({ handleSubmit, pristine, submitting, values }) => (
				<>
					<FormTitle label={!isUpdateForm ? "FAQ" : "Update FAQ"} />
					<FormField name="question" label="Question" autoFocus />
					<FormField name="answer" label="Answer" multiline />
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
