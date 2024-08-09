import { Navigate, RouteObject } from "react-router-dom";

import AppLayout from "./AppLayout";
import {
	FaqFormPage,
	FaqListPage,
	InquiryAnalyticsPage,
	InquiryChatPage,
	InquiryFormPage,
	InquiryItemPage,
	InquiryListPage,
	LoginPage,
	UserFormPage,
	UserListPage
} from "./AppPages";

export const APP_ROUTES = {
	DEFAULT: "",
	LOGIN: "/",
	PAGE_NOT_FOUND: "*",
	INQUIRY_FORM: "inquiry-form",
	INQUIRY_ANALYTICS: "inquiry-analytics",
	INQUIRY_LIST: "inquiry-list",
	INQUIRY_ITEM: "inquiry-item",
	INQUIRY_CHAT: "inquiry-chat",
	FAQ_LIST: "faq-list",
	FAQ_FORM: "faq-form",
	USER_LIST: "user-list",
	USER_FORM: "user-form"
};

export const AppRoutes: RouteObject[] = [
	{
		path: APP_ROUTES.DEFAULT,
		element: <AppLayout />,
		children: [
			{
				path: APP_ROUTES.PAGE_NOT_FOUND,
				element: <Navigate to={APP_ROUTES.DEFAULT} replace />
			},
			{
				path: APP_ROUTES.LOGIN,
				element: <LoginPage />
			},
			{
				path: APP_ROUTES.INQUIRY_FORM,
				element: <InquiryFormPage />
			},
			{
				path: APP_ROUTES.INQUIRY_ANALYTICS,
				element: <InquiryAnalyticsPage />
			},
			{
				path: APP_ROUTES.INQUIRY_LIST,
				element: <InquiryListPage />
			},
			{
				path: `${APP_ROUTES.INQUIRY_ITEM}/:id?`,
				element: <InquiryItemPage />
			},
			{
				path: `${APP_ROUTES.INQUIRY_CHAT}/:id?`,
				element: <InquiryChatPage />
			},
			{
				path: APP_ROUTES.FAQ_LIST,
				element: <FaqListPage />
			},
			{
				path: `${APP_ROUTES.FAQ_FORM}/:id?`,
				element: <FaqFormPage />
			},
			{
				path: APP_ROUTES.USER_LIST,
				element: <UserListPage />
			},
			{
				path: `${APP_ROUTES.USER_FORM}/:personNumber?`,
				element: <UserFormPage />
			}
		]
	}
];
