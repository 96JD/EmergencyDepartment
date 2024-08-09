import { createContext, ReactNode, useCallback, useMemo, useState } from "react";

interface SidebarContextType {
	sidebarToggle: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType);

interface Props {
	children: ReactNode;
}

export default function SidebarProvider({ children }: Readonly<Props>) {
	const [sidebarToggle, setSidebarToggle] = useState(false);

	const toggleSidebar = useCallback(() => {
		setSidebarToggle(!sidebarToggle);
	}, [sidebarToggle]);
	const closeSidebar = useCallback(() => {
		setSidebarToggle(false);
	}, []);

	const sidebarValue = useMemo(
		() => ({ sidebarToggle, toggleSidebar, closeSidebar }),
		[sidebarToggle, toggleSidebar, closeSidebar]
	);

	return <SidebarContext.Provider value={sidebarValue}>{children}</SidebarContext.Provider>;
}
