import { ElementType, Suspense } from "react";

import Spinner from "./components/Spinner";

export const Loader = (Component: ElementType) => {
	const LoaderComponent = () => (
		<Suspense fallback={<Spinner />}>
			<Component />
		</Suspense>
	);
	return LoaderComponent;
};
