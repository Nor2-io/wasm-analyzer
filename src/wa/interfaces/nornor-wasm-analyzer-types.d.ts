/** @module Interface nornor:wasm-analyzer/types@0.1.0 **/
export type RefType = RefTypeAny | RefTypeNone | RefTypeNoExtern | RefTypeNoFunc | RefTypeEq | RefTypeStruct | RefTypeArray | RefTypeI31 | RefTypeExtern | RefTypeFunc | RefTypeExn | RefTypeNoExn | RefTypeCont | RefTypeNoCont | RefTypeIndexed;
export interface RefTypeAny {
  tag: 'any',
}
export interface RefTypeNone {
  tag: 'none',
}
export interface RefTypeNoExtern {
  tag: 'no-extern',
}
export interface RefTypeNoFunc {
  tag: 'no-func',
}
export interface RefTypeEq {
  tag: 'eq',
}
export interface RefTypeStruct {
  tag: 'struct',
}
export interface RefTypeArray {
  tag: 'array',
}
export interface RefTypeI31 {
  tag: 'i31',
}
export interface RefTypeExtern {
  tag: 'extern',
}
export interface RefTypeFunc {
  tag: 'func',
}
export interface RefTypeExn {
  tag: 'exn',
}
export interface RefTypeNoExn {
  tag: 'no-exn',
}
export interface RefTypeCont {
  tag: 'cont',
}
export interface RefTypeNoCont {
  tag: 'no-cont',
}
export interface RefTypeIndexed {
  tag: 'indexed',
  val: number,
}
export type WasmType = WasmTypeI32 | WasmTypeI64 | WasmTypeF32 | WasmTypeF64 | WasmTypeV128 | WasmTypeRefType;
export interface WasmTypeI32 {
  tag: 'i32',
}
export interface WasmTypeI64 {
  tag: 'i64',
}
export interface WasmTypeF32 {
  tag: 'f32',
}
export interface WasmTypeF64 {
  tag: 'f64',
}
export interface WasmTypeV128 {
  tag: 'v128',
}
export interface WasmTypeRefType {
  tag: 'ref-type',
  val: RefType,
}
/**
 * # Variants
 * 
 * ## `"core"`
 * 
 * ## `"component"`
 * 
 * ## `"interface"`
 */
export type WasmModuleType = 'core' | 'component' | 'interface';
export interface Metadata {
  field: string,
  version?: string,
}
export interface UnkownField {
  field: string,
  metadata: Metadata,
}
export interface MetadataInformation {
  name: string,
  size: bigint,
  humanSize: string,
  sha256: string,
  languages: Array<Metadata>,
  tools: Array<Metadata>,
  sdks: Array<Metadata>,
  unknowMetadata: Array<UnkownField>,
  numCustomSections: number,
  numCoreImports: number,
  numCoreExport: number,
}
export interface CustomSection {
  name: string,
  humanSize: string,
  size: bigint,
}
