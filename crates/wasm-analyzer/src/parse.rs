use std::collections::HashMap;
use std::convert::TryFrom;

use base64::{engine::general_purpose, Engine as _};
use human_bytes::human_bytes;
use sha2::{Digest, Sha256};
use wasmparser::InstanceTypeDeclaration;
use wasmparser::{Parser, Payload};

use crate::bindings::exports::nornor::wasm_analyzer::reader::GuestComponent;
use crate::bindings::nornor::wasm_analyzer::core_export;
use crate::bindings::nornor::wasm_analyzer::core_import;
use crate::bindings::nornor::wasm_analyzer::types::UnkownField;
use crate::bindings::nornor::wasm_analyzer::types::WasmType;
use crate::bindings::nornor::wasm_analyzer::types::{CustomSection, Metadata};
use crate::bindings::nornor::wasm_analyzer::types::{RefType, WasmModuleType};
use crate::WasmComponent;

pub const WASM_PAGE_SIZE: usize = 65536;

impl From<wasmparser::RefType> for WasmType {
    fn from(value: wasmparser::RefType) -> Self {
        WasmType::RefType(value.into())
    }
}

//TODO: Figure out how and if we need to display this in a good way.
impl From<wasmparser::RefType> for RefType {
    fn from(value: wasmparser::RefType) -> Self {
        match value.heap_type() {
            wasmparser::HeapType::Abstract { shared: _, ty } => match ty {
                wasmparser::AbstractHeapType::Func => RefType::Func,
                wasmparser::AbstractHeapType::Extern => RefType::Extern,
                wasmparser::AbstractHeapType::Any => RefType::Any,
                wasmparser::AbstractHeapType::None => RefType::None,
                wasmparser::AbstractHeapType::NoExtern => RefType::NoExtern,
                wasmparser::AbstractHeapType::NoFunc => RefType::NoFunc,
                wasmparser::AbstractHeapType::Eq => RefType::Eq,
                wasmparser::AbstractHeapType::Struct => RefType::Struct,
                wasmparser::AbstractHeapType::Array => RefType::Array,
                wasmparser::AbstractHeapType::I31 => RefType::I31,
                wasmparser::AbstractHeapType::Exn => RefType::Exn,
                wasmparser::AbstractHeapType::NoExn => RefType::NoExn,
                wasmparser::AbstractHeapType::Cont => RefType::Cont,
                wasmparser::AbstractHeapType::NoCont => RefType::NoCont,
            },
            wasmparser::HeapType::Concrete(unpacked_index) => RefType::Indexed(0),
        }
    }
}

impl From<wasmparser::ValType> for WasmType {
    fn from(value: wasmparser::ValType) -> Self {
        match value {
            wasmparser::ValType::I32 => WasmType::I32,
            wasmparser::ValType::I64 => WasmType::I64,
            wasmparser::ValType::F32 => WasmType::F32,
            wasmparser::ValType::F64 => WasmType::F64,
            wasmparser::ValType::V128 => WasmType::V128,
            wasmparser::ValType::Ref(ref_type) => ref_type.into(),
        }
    }
}

pub struct ComponentInformation {
    pub ty: WasmModuleType,
    //pub env: Option<Vec<EnvInterop>>,
    pub name: String,
    pub size: usize,
    pub human_size: String,
    pub sha256: String,
    pub imports: core_import::CoreImports,
    pub exports: core_export::CoreExports,
    pub languages: Vec<Metadata>,
    pub tools: Vec<Metadata>,
    pub sdks: Vec<Metadata>,
    pub unknow_metadata: Vec<UnkownField>,
    pub custom_sections: Vec<CustomSection>,
    //pub registry_metadata: Option<RegistryMetadata>,
    pub children: Vec<WasmComponent>,
}

pub fn parse_wasm(parser: Parser, buffer: &[u8]) -> anyhow::Result<ComponentInformation> {
    let mut languages = vec![];
    let mut tools = vec![];
    let mut sdks = vec![];
    let mut unknown_fields = vec![];
    //let mut registry_metadata = None;
    let module_name = "TODO".to_owned();
    let mut contains_implementation = false;

    const CUSTOM_ENGINE: base64::engine::GeneralPurpose =
        base64::engine::GeneralPurpose::new(&base64::alphabet::URL_SAFE, general_purpose::NO_PAD);

    let mut hasher = Sha256::new();
    hasher.update(&buffer);
    let sha256 = CUSTOM_ENGINE.encode(hasher.finalize());

    let size = buffer.len();
    let human_size = human_bytes(buffer.len() as f64);

    let mut custom_sections = Vec::new();
    let mut imports = core_import::CoreImports {
        functions: vec![],
        tables: vec![],
        memories: vec![],
        globals: vec![],
    };
    let mut exports = core_export::CoreExports {
        functions: vec![],
        tables: vec![],
        memories: vec![],
        globals: vec![],
    };

    let mut typess = Vec::new();

    let mut function_types = Vec::new();

    let mut functions: Vec<FunctionType> = Vec::new();
    let mut globals = HashMap::new();
    let mut tables = HashMap::new();
    let mut memories = HashMap::new();

    //let mut function_namings = HashMap::new();
    //let mut code_sections = HashMap::new();
    let mut children = Vec::new();

    //let mut next_code_index = 0;

    //let mut env = None;

    //let mut component_function_ty = Vec::new();
    let mut component_functions = Vec::new();
    let mut component_exports = Vec::new();

    for payload in parser.parse_all(buffer) {
        match payload.expect("Unable to parse binary") {
            Payload::Version { num, encoding, range } => {
                //println!("Version: {num}, Encoding: {encoding:?}, Range: {range:?}");
            }
            Payload::TypeSection(reader) => {
                for types in reader.into_iter() {
                    let types = types?;

                    for ty in types.types() {
                        match &ty.composite_type.inner {
                            wasmparser::CompositeInnerType::Func(func) => {
                                //let supertype_idx = match ty.supertype_idx {
                                //    Some(id) => match id.unpack() {
                                //        wasmparser::UnpackedIndex::Module(id) => id,
                                //        wasmparser::UnpackedIndex::RecGroup(id) => id,
                                //        wasmparser::UnpackedIndex::Id(id) => id.index() as u32,
                                //    },
                                //    None => 0,
                                //};

                                //println!("SUPER TYPE: {supertype_idx}");
                                //let values = types.is_final;
                                let parameters =
                                    func.params().to_vec().iter().map(|v| (*v).into()).collect();
                                let results = func
                                    .results()
                                    .to_vec()
                                    .iter()
                                    .map(|v| (*v).into())
                                    .collect();

                                functions.push(FunctionType {
                                    parameters,
                                    results,
                                });
                            }
                            wasmparser::CompositeInnerType::Array(_array) => {
                                functions.push(FunctionType {
                                    parameters: Vec::new(),
                                    results: Vec::new(),
                                });
                            }
                            wasmparser::CompositeInnerType::Struct(_s) => {
                                functions.push(FunctionType {
                                    parameters: Vec::new(),
                                    results: Vec::new(),
                                });
                            }
                            wasmparser::CompositeInnerType::Cont(cont_type) => {
                                functions.push(FunctionType {
                                    parameters: Vec::new(),
                                    results: Vec::new(),
                                });
                            }
                        }
                        typess.push(ty.clone());
                    }

                    //types.is_final
                }
            }
            Payload::ImportSection(reader) => {
                contains_implementation = true;

                for import in reader {
                    let import = import?;
                    //println!(
                    //    "Import Module: {}, Name: {}, Type: {:?}",
                    //    import.module, import.name, import.ty
                    //);

                    match import.ty {
                        wasmparser::TypeRef::Func(index) => {
                            // Push typeref that can be referenced by export functions
                            let index = usize::try_from(index)?;
                            function_types.push(index);
                            let Some(func) = functions.get(index) else {
                                println!("ERROR: no function with index {index}");
                                continue;
                            };
                            //let func = functions.get(index as usize).unwrap().clone();

                            imports.functions.push(core_import::Function {
                                module: import.module.to_owned(),
                                field: import.name.to_owned(),
                                index: index as u32,
                                params: func.parameters.clone(),
                                results: func.results.clone(),
                            });
                        }
                        wasmparser::TypeRef::Table(table) => {
                            imports.tables.push(core_import::Table {
                                module: import.module.to_owned(),
                                field: import.name.to_owned(),
                                index: 0,
                                ty: table.element_type.into(),
                                minimum: table.initial,
                                maximum: table.maximum,
                            });
                        }
                        wasmparser::TypeRef::Memory(memory) => {
                            imports.memories.push(core_import::Memory {
                                module: import.module.to_owned(),
                                field: import.name.to_owned(),
                                index: 0,
                                minimum_pages: memory.initial,
                                maximum_pages: memory.maximum,
                                human_minimum_size: human_bytes(
                                    (memory.initial as usize * WASM_PAGE_SIZE) as f64,
                                ),
                                human_maximum_size: memory
                                    .maximum
                                    .map(|max| human_bytes((max as usize * WASM_PAGE_SIZE) as f64)),
                                shared: memory.shared,
                                memory64: memory.memory64,
                            })
                        }
                        wasmparser::TypeRef::Global(global) => {
                            imports.globals.push(core_import::Global {
                                module: import.module.to_owned(),
                                field: import.name.to_owned(),
                                index: 0,
                                ty: global.content_type.into(),
                                mutable: global.mutable,
                            })
                        }
                        wasmparser::TypeRef::Tag(tag) => {
                            //tag.func_type_idx
                            match tag.kind {
                                wasmparser::TagKind::Exception => {}
                            }
                        }
                    }
                }
            }
            // https://github.com/WebAssembly/design/blob/main/BinaryEncoding.md#function-section
            Payload::FunctionSection(reader) => {
                contains_implementation = true;

                for index in reader {
                    function_types.push(usize::try_from(index?)?);
                    //let index = index?;
                    //let func_ty = functions.get(&index).unwrap();
                    //code_sections.insert(
                    //    next_code_index,
                    //    core_export::Function {
                    //        field: format!("{index}"),
                    //        index: index,
                    //        params: func_ty.params.clone(),
                    //        results: func_ty.results.clone(),
                    //    },
                    //);
                    //next_code_index += 1;
                }
            }
            Payload::TableSection(reader) => {
                contains_implementation = true;

                for (i, table) in reader.into_iter().enumerate() {
                    let table = table?;
                    tables.insert(
                        i,
                        core_import::Table {
                            module: String::new(),
                            field: String::new(),
                            index: i as u32,
                            ty: table.ty.element_type.into(),
                            minimum: table.ty.initial,
                            maximum: table.ty.maximum,
                        },
                    );

                    //println!("Table Init: {:?}, Type: {:?}", table.init, table.ty);
                }
            }
            Payload::MemorySection(reader) => {
                contains_implementation = true;

                for (i, memory) in reader.into_iter().enumerate() {
                    let memory = memory?;

                    memories.insert(
                        i,
                        core_import::Memory {
                            module: String::new(),
                            field: String::new(),
                            index: i as u32,
                            minimum_pages: memory.initial,
                            maximum_pages: memory.maximum,
                            human_minimum_size: human_bytes(
                                (memory.initial as usize * WASM_PAGE_SIZE) as f64,
                            ),
                            human_maximum_size: memory
                                .maximum
                                .map(|max| human_bytes((max as usize * WASM_PAGE_SIZE) as f64)),
                            shared: memory.shared,
                            memory64: memory.memory64,
                        },
                    );

                    //println!(
                    //    "Memory Initial: {:?}, Maximum: {:?}, Shared: {}, 64 bit: {}",
                    //    memory.initial, memory.maximum, memory.shared, memory.memory64
                    //);
                }
            }
            Payload::TagSection(reader) => {
                contains_implementation = true;

                for tag in reader {
                    let _tag = tag?;

                    //println!(
                    //    "Tag Function Type Idx: {}, Kind: {:?}",
                    //    tag.func_type_idx, tag.kind
                    //);
                }
            }
            Payload::GlobalSection(reader) => {
                contains_implementation = true;

                for (i, global) in reader.into_iter().enumerate() {
                    let global = global?;
                    let ty: WasmType = global.ty.content_type.into();
                    let mutable = global.ty.mutable;

                    globals.insert(
                        i,
                        core_import::Global {
                            module: String::new(),
                            field: String::new(),
                            index: i as u32,
                            ty,
                            mutable,
                        },
                    );
                    //println!("Init Expr: {:?}, Type: {:?}", global.init_expr, global.ty);
                }
            }
            Payload::ExportSection(reader) => {
                contains_implementation = true;

                for export in reader.into_iter() {
                    let export: wasmparser::Export<'_> = export?;

                    match export.kind {
                        wasmparser::ExternalKind::Func => {
                            //let func: &Naming = function_namings.get(&export.index)?;
                            //func.name
                            let Some(index) = function_types.get(usize::try_from(export.index)?)
                            else {
                                println!("ERROR: no function with index {}", export.index);
                                continue;
                            };
                            let Some(function) = functions.get(*index) else {
                                println!("ERROR: no function with index {index}");
                                continue;
                            };
                            exports.functions.push(core_export::Function {
                                field: export.name.to_owned(),
                                index: *index as u32,
                                params: function.parameters.clone(),
                                results: function.results.clone(),
                            });
                        }
                        wasmparser::ExternalKind::Table => {
                            exports.tables.push(core_export::Table {
                                field: export.name.to_owned(),
                                index: export.index,
                                ty: WasmType::I32,
                                minimum: 0,
                                maximum: None,
                            });
                        }
                        wasmparser::ExternalKind::Memory => {
                            exports.memories.push(core_export::Memory {
                                field: export.name.to_owned(),
                                index: export.index,
                                minimum_pages: 0,
                                maximum_pages: None,
                                human_minimum_size: String::new(),
                                human_maximum_size: None,
                                shared: false,
                                memory64: false,
                            });
                        }
                        wasmparser::ExternalKind::Global => {
                            exports.globals.push(core_export::Global {
                                field: export.name.to_owned(),
                                index: export.index,
                                ty: WasmType::I32,
                                mutable: false,
                            })
                        }
                        wasmparser::ExternalKind::Tag => {}
                    }
                }
            }
            Payload::StartSection { .. } => {
                //println!("Start: {func}, Range: {:?}", range);
            }
            Payload::ElementSection(reader) => {
                for element in reader {
                    let element = element?;

                    let _kind = match element.kind {
                        wasmparser::ElementKind::Passive => "Passive".to_owned(),
                        wasmparser::ElementKind::Active {
                            table_index,
                            offset_expr,
                        } => format!(
                            "Active, Table Index: {:?}, Offset Expression: {:?}",
                            table_index, offset_expr
                        ),
                        wasmparser::ElementKind::Declared => "Declared".to_owned(),
                    };

                    let _items = match element.items {
                        wasmparser::ElementItems::Functions(reader) => {
                            let mut functions = String::default();
                            for function in reader {
                                let function = function?;
                                functions.push_str(&format!("{function}, "));
                            }

                            functions
                        }
                        wasmparser::ElementItems::Expressions(ref_ty, reader) => {
                            let mut expressions = format!("RefType: {ref_ty}, ");
                            for expression in reader {
                                let expression = expression?;
                                expressions.push_str(&format!("{expression:?}, "));
                            }

                            expressions
                        }
                    };

                    //println!(
                    //    "Element Kind: {kind}, Items {items}, Range: {:?}",
                    //    element.range
                    //);
                }
            }
            Payload::DataCountSection { .. } => {
                //println!("Data Count Section, Count: {count}, Range: {range:?}");
            }
            Payload::DataSection(_reader) => {
                //for data in reader {
                //    let data = data?;
                //    match data.kind {
                //        wasmparser::DataKind::Passive => {}
                //        wasmparser::DataKind::Active {
                //            memory_index,
                //            offset_expr,
                //        } => {}
                //    }
                //    //println!("Data: {:?}, Range: {:?}", data.kind, data.range);
                //}
            }
            Payload::CodeSectionStart { .. } => {
                //println!("Code Start Section, Count: {count}, Range: {range:?}, Size: {size}");
            }
            Payload::CodeSectionEntry(_func) => {
                contains_implementation = true;

                //let reader = func.get_locals_reader()?;
                //let mut locals = Vec::new();
                //for ty in reader {
                //    let (num_local, ty) = ty?;
                //    dbg!(num_local);
                //    let ty: WasmType = ty.into();
                //    for _ in [0..num_local] {
                //        locals.push(ty);
                //    }
                //}

                //code_sections.insert(
                //    next_code_index as u32,
                //    core_export::Function {
                //        field: "".to_owned(),
                //        index: next_code_index as u32,
                //        params: Vec::new(),
                //        results: Vec::new(),
                //    },
                //);
                //
                //next_code_index += 1;
            }
            //Payload::ModuleSection { parser, unchecked_range }
            Payload::ModuleSection {
                parser: _,
                unchecked_range,
            } => {
                //children.push(parse_wasm(parser, &buffer[unchecked_range])?);
                children.push(WasmComponent::new(buffer[unchecked_range].to_vec()));
            }
            Payload::ComponentSection {
                parser: _,
                unchecked_range,
            } => {
                children.push(WasmComponent::new(buffer[unchecked_range].to_vec()));
            }
            Payload::InstanceSection(_reader) => {
                contains_implementation = true;

                //for instance in reader {
                //    let instance = instance?;
                //println!("Instance: {:?}", instance);
                //}
            }
            Payload::CoreTypeSection(_reader) => {
                //for (i, core_ty) in reader.into_iter().enumerate() {
                //    let core_ty = core_ty?;
                //    match &core_ty {
                //        wasmparser::CoreType::Sub(sub_type) => match &sub_type.composite_type {
                //            wasmparser::CompositeType::Func(func) => {
                //                let params =
                //                    func.params().to_vec().iter().map(|v| (*v).into()).collect();
                //                let results = func
                //                    .results()
                //                    .to_vec()
                //                    .iter()
                //                    .map(|v| (*v).into())
                //                    .collect();
                //
                //                functions.push(core_import::Function {
                //                    module: "".to_owned(),
                //                    field: "".to_owned(),
                //                    index: i as u32,
                //                    params,
                //                    results,
                //                });
                //            }
                //            wasmparser::CompositeType::Array(_) => {
                //                functions.push(core_import::Function {
                //                    module: "".to_owned(),
                //                    field: "".to_owned(),
                //                    index: i as u32,
                //                    params: Vec::new(),
                //                    results: Vec::new(),
                //                });
                //            }
                //            wasmparser::CompositeType::Struct(_) => {
                //                functions.push(core_import::Function {
                //                    module: "".to_owned(),
                //                    field: "".to_owned(),
                //                    index: i as u32,
                //                    params: Vec::new(),
                //                    results: Vec::new(),
                //                });
                //            }
                //        },
                //        wasmparser::CoreType::Module(_module) => {}
                //    }
                //    //println!("Core Type: {:?}", core_ty);
                //}
            }
            Payload::ComponentInstanceSection(_reader) => {
                contains_implementation = true;

                //for component_instance in reader {
                //    let component_instance = component_instance?;
                //println!("Component Type: {:?}", component_instance);
                //}
            }
            Payload::ComponentAliasSection(_reader) => {
                //for alias in reader {
                //    let alias = alias?;
                //println!("Component Alias: {:?}", alias);
                //}
            }
            Payload::ComponentTypeSection(reader) => {
                for component_ty in reader {
                    let component_ty = component_ty?;

                    match component_ty {
                        wasmparser::ComponentType::Defined(_def) => {
                            //println!("Defined: {:?}", def);
                            //match def {
                            //    wasmparser::ComponentDefinedType::Primitive(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Record(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Variant(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::List(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Tuple(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Flags(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Enum(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Option(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Result { ok, err } => todo!(),
                            //    wasmparser::ComponentDefinedType::Own(_) => todo!(),
                            //    wasmparser::ComponentDefinedType::Borrow(_) => todo!(),
                            //}
                        }
                        wasmparser::ComponentType::Func(_func) => {
                            //println!("Component Type Func: {:?}", func);

                            //let params = func
                            //    .params
                            //    .iter()
                            //    .map(|(name, val)| {
                            //        let ty = match val {
                            //            wasmparser::ComponentValType::Primitive(primitive) => {
                            //                ComponentType::Primitive(primitive.clone())
                            //            }
                            //            wasmparser::ComponentValType::Type(_) => todo!(),
                            //        };
                            //        ((*name).to_owned(), ty)
                            //    })
                            //    .collect();
                            //
                            //let results = func
                            //    .results
                            //    .iter()
                            //    .map(|(name, val)| {
                            //        let ty = match val {
                            //            wasmparser::ComponentValType::Primitive(primitive) => {
                            //                ComponentType::Primitive(primitive.clone())
                            //            }
                            //            wasmparser::ComponentValType::Type(_) => {
                            //                ComponentType::Type
                            //            }
                            //        };
                            //
                            //        match name {
                            //            Some(name) => {
                            //                ComponentTypeArg::Named((name.to_owned(), ty))
                            //            }
                            //            None => ComponentTypeArg::Unnamed(ty),
                            //        }
                            //    })
                            //    .collect();
                            //
                            //component_function_ty.push(ComponentTypeFunc { params, results });
                        }
                        wasmparser::ComponentType::Component(_component) => {
                            //println!("Component: {:?}", component);
                        }
                        wasmparser::ComponentType::Instance(instances) => {
                            for instance in instances.iter() {
                                match instance {
                                    wasmparser::InstanceTypeDeclaration::CoreType(_core_ty) => {
                                        //println!("Core Type: {core_ty:?}");
                                        //match core_ty {
                                        //    wasmparser::CoreType::Func(func) => {
                                        //        println!("Core Type Func: {func:?}");
                                        //    }
                                        //    wasmparser::CoreType::Module(m) => todo!(),
                                        //}
                                    }

                                    InstanceTypeDeclaration::Type(ty) => {
                                        //println!("Instance Type: {ty:?}");

                                        match ty {
                                            //wasmparser::ComponentType::Defined(_) => todo!(),
                                            wasmparser::ComponentType::Func(_func) => {
                                                //    let params = func
                                                //    .params
                                                //    .iter()
                                                //    .map(|(name, val)| {
                                                //        let ty = match val {
                                                //            wasmparser::ComponentValType::Primitive(primitive) => {
                                                //                ComponentType::Primitive(primitive.clone())
                                                //            }
                                                //            wasmparser::ComponentValType::Type(_) => ComponentType::Type,
                                                //        };
                                                //        ((*name).to_owned(), ty)
                                                //    })
                                                //    .collect();
                                                //
                                                //let results = func
                                                //    .results
                                                //    .iter()
                                                //    .map(|(name, val)| {
                                                //        let ty = match val {
                                                //            wasmparser::ComponentValType::Primitive(primitive) => {
                                                //                ComponentType::Primitive(primitive.clone())
                                                //            }
                                                //            wasmparser::ComponentValType::Type(_) => {
                                                //                ComponentType::Type
                                                //            }
                                                //        };
                                                //
                                                //        match name {
                                                //            Some(name) => {
                                                //                ComponentTypeArg::Named((name.to_owned(), ty))
                                                //            }
                                                //            None => ComponentTypeArg::Unnamed(ty),
                                                //        }
                                                //    })
                                                //    .collect();
                                                //
                                                //component_function_ty.push(ComponentTypeFunc { params, results });
                                            }
                                            //wasmparser::ComponentType::Component(_) => todo!(),
                                            //wasmparser::ComponentType::Instance(_) => todo!(),
                                            //::ComponentType::Resource { rep, dtor } => todo!(),
                                            _ => {}
                                        }
                                    }

                                    InstanceTypeDeclaration::Alias(_alias) => {
                                        //println!("Instance Alias: {alias:?}");
                                    }

                                    InstanceTypeDeclaration::Export { name, ty } => match ty {
                                        //wasmparser::ComponentTypeRef::Module(_) => todo!(),
                                        wasmparser::ComponentTypeRef::Func(i) => {
                                            component_functions.push((name.clone(), *i))
                                        }
                                        //wasmparser::ComponentTypeRef::Value(_) => todo!(),
                                        //wasmparser::ComponentTypeRef::Type(_) => todo!(),
                                        //wasmparser::ComponentTypeRef::Instance(_) => todo!(),
                                        //wasmparser::ComponentTypeRef::Component(_) => todo!(),
                                        _ => {}
                                    },
                                }
                            }
                        }
                        wasmparser::ComponentType::Resource { rep, dtor } => {
                            println!("Resource: rep: {rep} dtor: {dtor:?}");
                        }
                    }
                    //for (i, func) in component_function_ty.iter().enumerate() {
                    //    println!("Func({i}): {:?}", func);
                    //}
                    //println!("Component Type: {:?}", component_ty);
                }
            }
            Payload::ComponentCanonicalSection(_reader) => {
                //for canonical_func in reader {
                //    let canonical_func = canonical_func?;
                //println!("Canonical Function: {:?}", canonical_func);
                //}
            }
            Payload::ComponentStartSection { .. } => {
                //println!(
                //    "Component Start Index: {}, Arguments: {:?}, Result: {}, Range: {:?}",
                //    start.func_index, start.arguments, start.results, range
                //);
            }
            Payload::ComponentImportSection(_reader) => {
                //for import in reader {
                //    let import = import?;
                //println!("Name: {:?}, Type: {:?}", import.name, import.ty);
                //}
            }
            Payload::ComponentExportSection(reader) => {
                for export in reader {
                    let export = export?;
                    component_exports.push(export);
                }
            }
            // Ignore any error associated with the name sections.
            //Payload::CustomSection(c) if c.name() == "name" => {
            //    let reader = wasmparser::NameSectionReader::new(c.data(), c.data_offset());
            //
            //    for section in reader {
            //        match section? {
            //            wasmparser::Name::Module { .. } => {
            //                //let name = wasmparser::Naming::new(name, 0, "module", None);
            //                //state.name = Some(name);
            //            }
            //            wasmparser::Name::Function(..) => {
            //                //name_map(&mut function_namings, n, "func")?;
            //            }
            //            wasmparser::Name::Local(..) => {
            //                //indirect_name_map(&mut state.core.local_names, n, "local")?
            //            }
            //            wasmparser::Name::Label(..) => {
            //                //indirect_name_map(&mut state.core.label_names, n, "label")?
            //            }
            //            wasmparser::Name::Type(..) => {} //name_map(&mut state.core.type_names, n, "type")?,
            //            wasmparser::Name::Table(..) => {} //name_map(&mut state.core.table_names, n, "table")?,
            //            wasmparser::Name::Memory(..) => {} //name_map(&mut state.core.memory_names, n, "memory")?,
            //            wasmparser::Name::Global(..) => {} //name_map(&mut state.core.global_names, n, "global")?,
            //            wasmparser::Name::Element(..) => {} //name_map(&mut state.core.element_names, n, "elem")?,
            //            wasmparser::Name::Data(..) => {} //name_map(&mut state.core.data_names, n, "data")?,
            //            wasmparser::Name::Unknown { .. } => (),
            //        }
            //    }
            //    //drop(self.register_names(state, reader));
            //}
            //Payload::CustomSection(c) if c.name() == "component-name" => {
            //    let _reader =
            //        wasmparser::ComponentNameSectionReader::new(c.data(), c.data_offset());
            //    //drop(self.register_component_names(state, reader));
            //}
            Payload::CustomSection(reader) => {
                custom_sections.push(CustomSection {
                    name: reader.name().to_owned(),
                    human_size: human_bytes(reader.data().len() as f64),
                    size: reader.data().len() as u64,
                });

                //if reader.name() == "nor2_env" {
                //    let environment: Option<Env> = serde_json::from_slice(reader.data())?;
                //
                //    env = environment.map(|envs| {
                //        envs.envs
                //            .into_iter()
                //            .map(|(name, value)| EnvInterop { name, value })
                //            .collect()
                //    });
                //}
            }
            Payload::UnknownSection { .. } => {
                //println!("Unknown Section Id: {id}, Range: {range:?}, Contents: {contents:?}");
            }
            Payload::End(_end) => {
                //println!("End: {end}");
                break;
            }
            _ => todo!(),
        }
    }

    //for export in &exports.functions {
    //    println!("EXPORT: {export:?}");
    //}
    //
    //for import in &imports.functions {
    //    println!("IMPORT: {import:?}");
    //}

    for global in &mut exports.globals.iter_mut() {
        let index = usize::try_from(global.index)?;
        if let Some(other) = globals.get(&index) {
            global.index = other.index;
            global.ty = other.ty.clone();
            global.mutable = other.mutable;
        }
    }

    for table in &mut exports.tables.iter_mut() {
        let index = usize::try_from(table.index)?;
        if let Some(other) = tables.get(&index) {
            table.index = other.index;
            table.ty = other.ty.clone();
            table.minimum = other.minimum;
            table.maximum = other.maximum;
        }
    }

    for memory in &mut exports.memories.iter_mut() {
        let index = usize::try_from(memory.index)?;
        if let Some(other) = memories.get(&index) {
            memory.index = other.index;
            memory.minimum_pages = other.minimum_pages;
            memory.maximum_pages = other.maximum_pages;
            memory.human_minimum_size = other.human_minimum_size.clone();
            memory.human_maximum_size = other.human_maximum_size.clone();
            memory.shared = other.shared;
            memory.memory64 = other.memory64;
        }
    }

    //for ((name, index), export) in component_functions.into_iter().zip(component_exports) {
    //    let fi = match export.ty {
    //        Some(ty) => match ty {
    //            wasmparser::ComponentTypeRef::Func(i) => i,
    //            wasmparser::ComponentTypeRef::Value(_) => todo!(),
    //            wasmparser::ComponentTypeRef::Type(_) => todo!(),
    //            wasmparser::ComponentTypeRef::Instance(_) => todo!(),
    //            wasmparser::ComponentTypeRef::Component(_) => todo!(),
    //            wasmparser::ComponentTypeRef::Module(_) => todo!(),
    //        },
    //        None => 0,
    //    };
    //    let fi = test.get(&export.index);
    //    match component_function_ty.get(index as usize) {
    //        Some(func) => {
    //            println!(
    //                "Func {:?}({:?}) -> {:?}; EXPORT: {export:?} CORE: {:?}",
    //                name,
    //                func.params,
    //                func.results,
    //                fi //exports.functions.get(export.index as usize).unwrap()
    //            )
    //        }
    //        None => println!("ERRROR: Unkown Func {:?}({index})", name),
    //    }
    //}

    //for export in component_exports {
    //    match component_function_ty.get(export.index as usize) {
    //        Some(func) => {
    //            println!(
    //                "Index: {}, Kind: {:?}, Name: {:?}, Type: {:?}",
    //                export.index, export.kind, export.name, func
    //            );
    //        }
    //        None => println!("ERRROR: Unkown Func {export:?}"),
    //    }
    //}

    let ty = match (children.is_empty(), contains_implementation) {
        (false, false) | (true, false) => WasmModuleType::Interface,
        (true, true) => WasmModuleType::Core,
        (false, true) => WasmModuleType::Component,
    };

    let info = ComponentInformation {
        ty: ty,
        custom_sections: custom_sections,
        //env: env,
        name: module_name,
        sha256: sha256,
        size: size,
        human_size: human_size,
        imports: imports,
        exports: exports,
        languages,
        tools,
        sdks,
        unknow_metadata: unknown_fields,
        //registry_metadata,
        children,
    };

    Ok(info)
}

//#[derive(Debug)]
//struct ComponentTypeFunc {
//    params: Vec<(String, ComponentType)>,
//    results: Vec<ComponentTypeArg>,
//}

//#[derive(Debug)]
//enum ComponentTypeArg {
//    Named((String, ComponentType)),
//    Unnamed(ComponentType),
//}
//
//#[derive(Debug)]
//enum ComponentType {
//    Primitive(wasmparser::PrimitiveValType),
//    Type,
//}

#[derive(Debug, Clone)]
pub struct FunctionType {
    pub parameters: Vec<WasmType>,
    pub results: Vec<WasmType>,
}
