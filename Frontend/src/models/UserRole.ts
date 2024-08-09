import { User } from "./User";

export interface UserRole {
	id: number;
	name: string;
	users?: User[];
}

export const USER_ROLES_CONSTANTS = {
	ADMIN: 1,
	NURSE: 2,
	PATIENT: 3
};
