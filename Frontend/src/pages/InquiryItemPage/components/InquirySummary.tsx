import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from "draft-js";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { INQUIRY_STATUS_CONSTANTS } from "../../../models/InquiryStatus";
import { inquirySelectors } from "../../../redux/inquiry/selectors";
import { inquiryThunks } from "../../../redux/inquiry/thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import RichTextEditor from "../../../shared/components/RichTextEditor";
import SubmitButton from "../../../shared/components/SubmitButton";
import InquiryItemCardWrapper from "./InquiryItemCardWrapper";

export default function InquirySummary() {
	const dispatch = useAppDispatch();

	const selectedInquiry = useAppSelector(inquirySelectors.selectedInquiry);

	const [editorState, setEditorState] = useState<EditorState>();
	const [submitting, setSubmitting] = useState<boolean>(false);

	useEffect(() => {
		if (!_.isNil(selectedInquiry.summary)) {
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(JSON.parse(selectedInquiry.summary) as RawDraftContentState)
				)
			);
		}
	}, [selectedInquiry.summary]);

	const onEditorStateChange = useCallback((editorState: EditorState) => {
		setEditorState(editorState);
	}, []);

	const submitSummary = useCallback(async () => {
		setSubmitting(true);
		const contentState = editorState?.getCurrentContent();
		if (contentState) {
			await dispatch(
				inquiryThunks.updateInquiryRequest({
					...selectedInquiry,
					inquiryStatusId: INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED,
					summary: JSON.stringify(convertToRaw(contentState))
				})
			);
			setSubmitting(false);
			await dispatch(inquiryThunks.getSelectedInquiryRequest(selectedInquiry.id));
		}
	}, [dispatch, editorState, selectedInquiry]);

	return (
		<InquiryItemCardWrapper>
			{(selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.IN_SUMMARY ||
				selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED) && (
				<Box textAlign="center">
					<Typography fontSize={14} color="secondary" my={1}>
						Summary
					</Typography>
					{selectedInquiry.inquiryStatusId === INQUIRY_STATUS_CONSTANTS.STATUSES.FINISHED ? (
						<RichTextEditor readOnly editorState={editorState} />
					) : (
						<>
							<RichTextEditor editorState={editorState} onEditorStateChange={onEditorStateChange} />
							<SubmitButton
								label={submitting ? "Submitting..." : "Submit"}
								disabled={!editorState?.getCurrentContent().hasText()}
								onClick={() => {
									void submitSummary();
								}}
							/>
						</>
					)}
				</Box>
			)}
		</InquiryItemCardWrapper>
	);
}
