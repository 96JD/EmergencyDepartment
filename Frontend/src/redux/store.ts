import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, UnknownAction } from "redux";

import { configureStore } from "@reduxjs/toolkit";

import { FaqInitialState, faqReducer } from "./faq/reducer";
import { InquiryInitialState, inquiryReducer } from "./inquiry/reducer";
import { InquiryStatusInitialState, inquiryStatusReducer } from "./inquiryStatus/reducer";
import { USER_ACTIONS_TYPES } from "./user/actions";
import { UserInitialState, userReducer } from "./user/reducer";
import { UserRoleInitialState, userRoleReducer } from "./userRole/reducer";

export interface RootState {
	faqReducer: FaqInitialState;
	inquiryReducer: InquiryInitialState;
	inquiryStatusReducer: InquiryStatusInitialState;
	userReducer: UserInitialState;
	userRoleReducer: UserRoleInitialState;
}
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

const rootReducer = (state: RootState | undefined, action: UnknownAction) => {
	if (action.type === USER_ACTIONS_TYPES.LOGOUT_USER) {
		state = undefined;
	}
	const reducer = combineReducers({
		faqReducer,
		inquiryStatusReducer,
		inquiryReducer,
		userRoleReducer,
		userReducer
	});
	return reducer(state, action);
};

export const reduxStore = configureStore({
	reducer: rootReducer,
	middleware: (gDM) =>
		gDM({
			serializableCheck: false
		}),
	devTools: import.meta.env.DEV
});
