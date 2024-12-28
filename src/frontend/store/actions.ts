import { state } from "./state";

export const getState = () => state.get();

export const updateScore = () => {
	const { round } = state.get();
	const score = round.score + 1;
	state.set({ ...state.get(), round: { ...round, score } });
};

export const updateRecord = () => {
	const { round, record } = state.get();

	if (record.score > round.score) return;

	state.set({ ...state.get(), record: round });
};

export const toggleStatus = () => {
	const { running } = state.get();
	state.set({ ...state.get(), running: !running });
};
