import { GAME_STATES, ROTATIONS, DIRECTION_KEYS } from "./core.constants.js";

export type DirectionType = typeof DIRECTION_KEYS[keyof typeof DIRECTION_KEYS];
export type GameStateType = typeof GAME_STATES[keyof typeof GAME_STATES];
export type RotationType = typeof ROTATIONS[keyof typeof ROTATIONS];
