/** @module Interface nornor:wasm-analyzer/reader@0.1.0 **/
export type CoreImports = import('./nornor-wasm-analyzer-core-import.js').CoreImports;
export type CoreExports = import('./nornor-wasm-analyzer-core-export.js').CoreExports;
export type WasmModuleType = import('./nornor-wasm-analyzer-types.js').WasmModuleType;
export type MetadataInformation = import('./nornor-wasm-analyzer-types.js').MetadataInformation;
export type CustomSection = import('./nornor-wasm-analyzer-types.js').CustomSection;

export class Component {
  constructor(bytes: Uint8Array)
  getType(): WasmModuleType;
  getModuleInformation(): MetadataInformation;
  getCoreImports(): CoreImports;
  getCoreExports(): CoreExports;
  getCustomSections(): Array<CustomSection>;
  getChildComponents(): Array<Component>;
  getWit(): string | undefined;
  getWat(): string;
}

export class WasmReader {
  constructor(bytes: Uint8Array)
  getRootComponent(): Component;
}
