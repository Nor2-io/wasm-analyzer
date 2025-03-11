/** @module Interface wasi:clocks/wall-clock@0.2.0 **/
export interface Datetime {
  seconds: bigint,
  nanoseconds: number,
}
