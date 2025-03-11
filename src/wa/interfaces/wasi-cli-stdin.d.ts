/** @module Interface wasi:cli/stdin@0.2.0 **/
export function getStdin(): InputStream;
export type InputStream = import('./wasi-io-streams.js').InputStream;
