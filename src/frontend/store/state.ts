import { createState } from "iares";
import type { Model } from "./types";

export const state = createState<Model>({
	round: {
		playerName: "",
		score: 0,
	},
	record: {
		playerName: "",
		score: 0,
	},
	running: false,
});
