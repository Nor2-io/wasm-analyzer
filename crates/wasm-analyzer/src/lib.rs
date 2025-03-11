#[allow(warnings)]
mod bindings;

mod parse;

use crate::bindings::{
    exports::nornor::wasm_analyzer::reader::{self, Guest, GuestComponent, GuestWasmReader},
    nornor::wasm_analyzer::{
        core_export::CoreExports,
        core_import::CoreImports,
        types::{CustomSection, MetadataInformation, WasmModuleType},
    },
};
use parse::parse_wasm;
use wasmparser::Parser;

struct Component;

#[derive(Clone)]
struct WasmComponent {
    bytes: Vec<u8>,
    ty: WasmModuleType,
    metadata: MetadataInformation,
    core_imports: CoreImports,
    core_exports: CoreExports,
    custom_sections: Vec<CustomSection>,
    dependencies: Vec<WasmComponent>,
}

struct WasmReader {
    bytes: Vec<u8>,
}

impl GuestComponent for WasmComponent {
    fn new(bytes: Vec<u8>) -> Self {
        let parser = Parser::new(0);

        let component = parse_wasm(parser, &bytes).unwrap();

        WasmComponent {
            bytes,
            ty: component.ty,
            metadata: MetadataInformation {
                name: component.name,
                size: component.size as u64,
                human_size: component.human_size,
                sha256: component.sha256,
                languages: component.languages,
                tools: component.tools,
                sdks: component.sdks,
                unknow_metadata: component.unknow_metadata,
                num_custom_sections: component.custom_sections.len() as u32,
                num_core_imports: component.imports.functions.len() as u32,
                num_core_export: component.exports.functions.len() as u32,
            },
            core_imports: component.imports,
            core_exports: component.exports,
            custom_sections: component.custom_sections,
            dependencies: component.children,
        }
    }

    fn get_type(&self) -> WasmModuleType {
        self.ty
    }

    fn get_module_information(&self) -> MetadataInformation {
        self.metadata.clone()
    }

    fn get_core_imports(&self) -> CoreImports {
        self.core_imports.clone()
    }

    fn get_core_exports(&self) -> CoreExports {
        self.core_exports.clone()
    }

    fn get_custom_sections(&self) -> Vec<CustomSection> {
        self.custom_sections.clone()
    }

    fn get_child_components(&self) -> Vec<reader::Component> {
        self.dependencies
            .clone()
            .into_iter()
            .map(|dependency| reader::Component::new(dependency))
            .collect()
    }
    fn get_wit(&self) -> Option<String> {
        let decoded = wit_component::decode(&self.bytes).unwrap();
        let mut printer = wit_component::WitPrinter::default();
        match printer.print(decoded.resolve(), decoded.package(), &[]) {
            Ok(_) => Some(printer.output.to_string()),
            Err(_) => None,
        }
    }
    fn get_wat(&self) -> String {
        if self.bytes.len() > 75000000 {
            "The WASM file is to large to view it's WAT in the browser.\nPlease use the desktop version to view the WAT of this file.".to_owned()
        } else {
            wasmprinter::print_bytes(&self.bytes).ok().unwrap()
        }
    }
}

impl GuestWasmReader for WasmReader {
    fn new(bytes: Vec<u8>) -> Self {
        WasmReader { bytes }
    }

    fn get_root_component(&self) -> reader::Component {
        reader::Component::new(WasmComponent::new(self.bytes.clone()))
    }
}

impl Guest for Component {
    type Component = WasmComponent;
    type WasmReader = WasmReader;
}

bindings::export!(Component with_types_in bindings);
