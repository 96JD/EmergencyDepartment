import { lazy } from "react";

import { Loader } from "./shared/components/Loader";

export const LoginPage = Loader(lazy(() => import("./pages/LoginPage")));
export const FaqFormPage = Loader(lazy(() => import("./pages/FaqFormPage")));
export const FaqListPage = Loader(lazy(() => import("./pages/FaqListPage")));
export const InquiryAnalyticsPage = Loader(lazy(() => import("./pages/InquiryAnalyticsPage")));
export const InquiryChatPage = Loader(lazy(() => import("./pages/InquiryChatPage")));
export const InquiryItemPage = Loader(lazy(() => import("./pages/InquiryItemPage")));
export const InquiryFormPage = Loader(lazy(() => import("./pages/InquiryFormPage")));
export const InquiryListPage = Loader(lazy(() => import("./pages/InquiryListPage")));
export const UserFormPage = Loader(lazy(() => import("./pages/UserFormPage")));
export const UserListPage = Loader(lazy(() => import("./pages/UserListPage")));
