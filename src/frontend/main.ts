import { MainApp } from "@/ui/blocks";
import { CreateApp, render, router, tsx } from "iares";
import type { Application, ContextElement } from "iares";
import { routes } from "./routes";

const App: Application = CreateApp();

export const HostApp = {
	init() {
		App.setup(() => document.body);
		App.mount((context: ContextElement) => {
			render(tsx`<${MainApp} />`, context);
			router({ routes, context }).init();
			return context;
		});
	},
};
