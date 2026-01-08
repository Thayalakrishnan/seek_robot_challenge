export const GAME_STATES = {
  IDLE: 'IDLE',
  ACTIVE: 'ACTIVE',
  DEFAULT: 'DEFAULT',
} as const;


//export interface DIRECTION {
//  name: string,
//  value: number,
//};
//export type DirectionType = Record<string, DIRECTION>;

export enum DIRECTIONS {
  EAST,
  NORTH,
  WEST,
  SOUTH,
};

export const DIRECTION_KEYS = {
  EAST: "EAST",
  NORTH: "NORTH",
  WEST: "WEST",
  SOUTH: "SOUTH",
} as const;

export const VALID_DIRECTIONS = Object.keys(DIRECTION_KEYS)

export const MOVEMENT_CONF = {
  STEP_SIZE_ROTATION: 1,
  STEP_SIZE_TRANSLATION: 1,
  NUM_DIRECTIONS: VALID_DIRECTIONS.length,
} as const;


//export const DIRECTIONS = {
//  EAST: {name: DIRECTION_KEYS.EAST, value: DIRECTION_VALUES.EAST},
//  NORTH: {name: "NORTH", value: 1},
//  WEST: {name: "WEST", value: 2},
//  SOUTH: {name: "SOUTH", value: 3},
//} as const;



export const ROTATIONS = {
  RIGHT: -1,
  LEFT: 1,
} as const;


//export const DIRECTION_VALUES = {
//  EAST: 0,
//  NORTH: 1,
//  WEST: 2,
//  SOUTH: 3,
//} as const;