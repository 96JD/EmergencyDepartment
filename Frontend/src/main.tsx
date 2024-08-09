import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";

import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { OptimizelyProvider } from "@optimizely/react-sdk";

import App from "./App";
import { AppFeatureToggler } from "./AppFeatureToggler";
import { reduxStore } from "./redux/store";
import SidebarProvider from "./shared/components/Sidebar/components/SidebarContext";

const root = document.getElementById("root");

if (root) {
	ReactDOM.createRoot(root).render(
		<OptimizelyProvider optimizely={AppFeatureToggler.optimizely} user={AppFeatureToggler.user}>
			<Provider store={reduxStore}>
				<HelmetProvider>
					<SidebarProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</SidebarProvider>
				</HelmetProvider>
			</Provider>
		</OptimizelyProvider>
	);
}
