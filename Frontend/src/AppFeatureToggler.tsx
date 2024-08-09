import { createInstance } from "@optimizely/react-sdk";

import { UserUtils } from "./shared/functions/UserUtils";

export const OPTIMIZELY_FEATURE_TOGGLE = {
	ON: "on",
	ANALYTICS_PAID: "analytics-paid"
};

export const AppFeatureToggler = {
	optimizely: createInstance({
		sdkKey: import.meta.env.DEV ? "Jrk8yUkfm8SyVqadMWE1w" : "AsvduY1P8UpBDKvRGWUxn",
		datafileOptions: {
			autoUpdate: true
		}
	}),
	user: {
		id: UserUtils.getLoggedInUser().phoneNumber
	}
};
