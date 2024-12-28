import { DefaultApp, HomeApp } from "@/ui/pages";
import { type Route, html, render } from "iares";

export const routes: Route[] = [
	{
		regex: /^\/404$/,
		default: "#/404",
		mount: ({ context }) => {
			render(html`<${DefaultApp} />`, context);
		},
	},
	{
		regex: /^#\/$/,
		start: "#/",
		mount: ({ context }) => {
			render(html`<${HomeApp}/>`, context);
		},
	},
];
