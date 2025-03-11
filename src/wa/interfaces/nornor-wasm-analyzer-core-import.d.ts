/** @module Interface nornor:wasm-analyzer/core-import@0.1.0 **/
export type WasmType = import('./nornor-wasm-analyzer-types.js').WasmType;
export interface Function {
  module: string,
  field: string,
  index: number,
  params: Array<WasmType>,
  results: Array<WasmType>,
}
export interface Table {
  module: string,
  field: string,
  index: number,
  ty: WasmType,
  minimum: bigint,
  maximum?: bigint,
}
export interface Memory {
  module: string,
  field: string,
  index: number,
  minimumPages: bigint,
  maximumPages?: bigint,
  humanMinimumSize: string,
  humanMaximumSize?: string,
  shared: boolean,
  memory64: boolean,
}
export interface Global {
  module: string,
  field: string,
  index: number,
  ty: WasmType,
  mutable: boolean,
}
export interface CoreImports {
  functions: Array<Function>,
  tables: Array<Table>,
  memories: Array<Memory>,
  globals: Array<Global>,
}
