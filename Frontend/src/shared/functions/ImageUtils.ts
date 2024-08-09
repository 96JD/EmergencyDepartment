import { BACKEND_API_URL } from "../../api";

export const ImageUtils = {
	getImageUrl(imageUrl: string) {
		return import.meta.env.DEV ? `${BACKEND_API_URL}/${imageUrl}` : imageUrl;
	}
};
