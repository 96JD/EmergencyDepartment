import { formHasErrors } from "96jd-error-handler-utils";
import { FormApi } from "final-form";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Form } from "react-final-form";

import { Inquiry } from "../../../models/Inquiry";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch } from "../../../redux/store";
import FormField from "../../../shared/components/FormField";
import FormTitle from "../../../shared/components/FormTitle";
import SubmitButton from "../../../shared/components/SubmitButton";
import { UserUtils } from "../../../shared/functions/UserUtils";
import { validateInquiryForm } from "../functions";
import InquiryImageUpload from "./InquiryImageUpload";

export default function InquiryForm() {
	const dispatch = useAppDispatch();

	const [totalImages, setTotalImages] = useState<number>(0);
	const inquiryImageUploadId = "inquiry-image-upload";

	const validate = useCallback((inquiry: Inquiry) => {
		setTotalImages(_.size(inquiry.inquiryImages));
		return validateInquiryForm(inquiry);
	}, []);

	const onSubmit = useCallback(
		async (inquiry: Inquiry, form: FormApi<Inquiry, Inquiry>) => {
			const loggedInUser = UserUtils.getLoggedInUser();

			const formData = new FormData();
			formData.append("title", inquiry.title);
			formData.append("description", inquiry.description);
			formData.append("generalPractitioner", inquiry.generalPractitioner);
			formData.append("patientPersonNumber", _.toString(loggedInUser.personNumber));

			const inquiryImages = inquiry.inquiryImages;
			if (inquiryImages) {
				_.forEach(inquiryImages, (image, i) => {
					if (image instanceof File) {
						formData.append(`image-${_.toString(i)}`, image);
					}
				});
			}

			await dispatch(inquiryThunks.createInquiryRequest(formData));
			form.restart();
		},
		[dispatch]
	);

	return (
		<Form validate={validate} onSubmit={onSubmit}>
			{({ handleSubmit, pristine, submitting, values }) => {
				return (
					<>
						<FormTitle label="Inquiry" />
						<FormField name="title" label="Title" autoFocus />
						<FormField name="description" label="Description" />
						<FormField name="generalPractitioner" label="General Practitioner" />
						<FormField type="file" name="inquiryImages" id={inquiryImageUploadId} />
						<InquiryImageUpload imageUploadId={inquiryImageUploadId} totalImages={totalImages} />
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
				);
			}}
		</Form>
	);
}
