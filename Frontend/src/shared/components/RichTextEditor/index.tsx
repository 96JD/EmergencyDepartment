import { Editor, EditorState } from "react-draft-wysiwyg";

import { SHARED_CONSTANTS } from "../../constants";

interface Props {
	readOnly?: boolean;
	editorState?: EditorState;
	onEditorStateChange?: (editorState: EditorState) => void;
}

export default function RichTextEditor({ readOnly, editorState, onEditorStateChange }: Readonly<Props>) {
	return (
		<Editor
			readOnly={readOnly}
			toolbarHidden={readOnly}
			toolbar={{
				options: SHARED_CONSTANTS.TEXT_EDITOR.TOOLBAR_OPTIONS,
				inline: {
					options: SHARED_CONSTANTS.TEXT_EDITOR.INLINE_OPTIONS
				}
			}}
			wrapperStyle={{
				minHeight: 250,
				background: "white",
				borderRadius: 10,
				color: "black"
			}}
			toolbarStyle={{ borderRadius: 10 }}
			editorStyle={{ padding: 20 }}
			editorState={editorState}
			onEditorStateChange={onEditorStateChange}
		/>
	);
}
