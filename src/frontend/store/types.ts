import type { State } from "iares";

export type GameRound = {
	playerName: string;
	score: number;
};

export type GameStatus = boolean;

export type Game = {
	round: GameRound;
	record: GameRound;
	running: GameStatus;
};

export type Model = State<Game>;
