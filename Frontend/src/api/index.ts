import { getErrorMessageByHttpStatus } from "96jd-error-handler-utils";
import axios, { AxiosError } from "axios";
import _ from "lodash";

import { APP_LOCAL_STORAGE } from "../AppLocalStorage";
import { AppToaster } from "../AppToaster";
import { Faq } from "../models/Faq";
import { Inquiry } from "../models/Inquiry";
import { LoginCredentials, User } from "../models/User";

export const BACKEND_API_URL = import.meta.env.DEV
	? "https://localhost:7227"
	: "https://jacob-dolorzo-emergency-department.onrender.com";

export const SIGNAL_R_HUB_URL = `${BACKEND_API_URL}/signal-r-hub`;

const API_VERSION_1 = "api/v1";

export const API_URLS = {
	FAQ: `${BACKEND_API_URL}/${API_VERSION_1}/faq`,
	INQUIRY_STATUS: `${BACKEND_API_URL}/${API_VERSION_1}/inquiryStatus`,
	INQUIRY: `${BACKEND_API_URL}/${API_VERSION_1}/inquiry`,
	USER: `${BACKEND_API_URL}/${API_VERSION_1}/user`,
	USER_ROLE: `${BACKEND_API_URL}/${API_VERSION_1}/userRole`
};

export async function axiosRequest(
	url: string,
	method = "GET",
	body?: Faq | Inquiry | User | LoginCredentials | FormData
) {
	try {
		const response = await axios({
			method: method,
			url: url,
			headers: {
				Authorization: `Bearer ${_.toString(localStorage.getItem(APP_LOCAL_STORAGE.JWT))}`
			},
			data: body
		});
		return response.data as unknown;
	} catch (error) {
		const errorStatus = (error as AxiosError).response?.status;
		if (errorStatus) {
			AppToaster.error(getErrorMessageByHttpStatus(errorStatus));
		}
	}
}
