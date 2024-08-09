import { ChatMessage } from "./ChatMessage";
import { Inquiry } from "./Inquiry";
import { UserRole } from "./UserRole";

export interface User {
	personNumber: number;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	password: string;
	confirmPassword?: string;
	createdDate?: string;
	updatedDate?: string;
	userRoleId: number;
	userRole?: UserRole;
	patientInquiries?: Inquiry[];
	nurseInquiries?: Inquiry[];
	senderChatMessages?: ChatMessage[];
	receiverChatMessages?: ChatMessage[];
}

export interface LoginCredentials {
	personNumber: string;
	password: string;
}

export const USER_CONSTANTS = {
	TEST_USER: {
		personNumber: "12345678910",
		password: "EmergencyDepartment#96"
	},

	INITIAL_USER: {
		personNumber: 0,
		firstName: "",
		lastName: "",
		phoneNumber: "",
		address: "",
		password: "",
		userRoleId: 0
	},

	PERSON_NUMBER_VALID_LENGTH: 11,
	FIRST_NAME_MAXIMUM_VALID_LENGTH: 25,
	LAST_NAME_MAXIMUM_VALID_LENGTH: 25,
	PHONE_NUMBER_MINIMUM_VALID_LENGTH: 8,
	PHONE_NUMBER_MAXIMUM_VALID_LENGTH: 25,
	ADDRESS_MINIMUM_VALID_LENGTH: 5,
	ADDRESS_MAXIMUM_VALID_LENGTH: 50,
	PASSWORD_VALID_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
	PASSWORD_VALID_PATTERN_ERROR:
		"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
};
