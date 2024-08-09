import { forwardRef, ReactElement, Ref } from "react";

import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export default forwardRef(function NavbarTransition(
	props: TransitionProps & { children: ReactElement },
	ref: Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});
