import { formatDistance } from "date-fns";

export const DateUtils = {
	formatTimestampDistance(timestamp: string) {
		return formatDistance(new Date(timestamp), new Date(), {
			addSuffix: true
		});
	}
};
