import SidebarDrawer from "./components/SidebarDrawer";
import SidebarPanel from "./components/SidebarPanel";

export default function Sidebar() {
	return (
		<>
			<SidebarPanel xs="none" />
			<SidebarDrawer>
				<SidebarPanel />
			</SidebarDrawer>
		</>
	);
}
