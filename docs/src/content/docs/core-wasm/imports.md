---
title: "Imports"
date: 2023-07-12
lastmod: 2023-07-12
draft: true
tags: []
description: "Imports inspection"
---

You'll reach the *Imports* page by clicking the *Imports* navigation item on the WASM Analyzer sidebar. On the Imports page, you find information about imports the WebAssembly file requires, if any. At the top of the Imports page, you find a summary of the following:

* Imported Functions<sup>1</sup>
* Imported Tables<sup>2</sup>
* Imported Memories<sup>3</sup>
* Imported Globals<sup>4</sup>

<br/>

Clicking one of the summary items above takes you to the top of the related table.

<br/>

![The WASM Analyzer imports page](../images/webassembly_inspector_8.png)
*The summary section*.

<br/>

You can read more about WebAssembly imports in the [Imports section](/wasm/building-blocks/1-imports) of our WebAssembly overview.

Below the summary, you find lists in sections representing those import statements that are present in the *.wasm* file, or package.

<br/>

<br/>

---

<br />

## Imports search function

<br />

Above the Imports list, you'll find the search bar:

<br />

![Search bar](../images/placeholder.png)
*The Imports search bar*

<br />

<br />

---

<br />

### Basic Search

<br />

To run a basic search for Import names, or Module names matching a specific name search query, click on the *search field*. Type in a search word and press the `enter` key, `tab` out of the search field, or click elsewhere on the page. After you initiate a search, the list will update with a set of search results matching your query. If no matches are available, the list will be emtpy.

<br />

<br />

---

<br /> 

## Lists

The Exports page gives you information about four WebAssembly sections:

* Functions
* Tables
* Memories
* Globals

<br />

<br />

### **Functions**

<br/>

You can read more about the functions in the import *Functions* list, in the [Functions section](/wasm/building-blocks/3-functions) of our WebAssembly overview.

<br/>

Columns of the import *Functions* list:

| name                     | purpose                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------- |
| *Import*<sup>1</sup>     | *Function* name in `string` format                                                  |
| *Module*<sup>2</sup>     | Module the *function* is imported from, `Link` to *Metadata overview* for Module    |
| *Parameters*<sup>3</sup> | [Typed](/wasm/concepts-and-features/1-types) parameters required by *function*      |
| *Result*<sup>4</sup>     | [Typed](/wasm/concepts-and-features/1-types) *function* output                      |

<br/>

![The WASM Analyzer function imports](../images/webassembly_inspector_9.png)
*The imported functions list*

<br/>

The list can by sorted by clicking on the *Import*, or *Module* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

### **Tables**

<br/>

You can read more about the tables in the import *Tables* list, in the [Tables section](/wasm/building-blocks/4-tables) of our WebAssembly overview.

<br/>

Columns of the import *Tables* list:

| name                     | purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| *Import*<sup>1</sup>     | *Table* name in `string` format                                          |
| *Module*<sup>2</sup>     | Module *table* is imported from, `Link` to Module *Metadata overview*    |
| *Type*<sup>3</sup><br/>  | Function type in *table*, possible values: `anyfunc` and `externalref`   |
| *Minimum*<sup>4</sup>    | Initial `number` of items, and minimum `number` of items in *table*      |
| *Maximum*<sup>5</sup>    | Maximum `number` of items in *table*                                     |

<br/>

![The WASM Analyzer table imports](../images/webassembly_inspector_10.png)
*The imported tables list*

<br/>

The list can by sorted by clicking on the *Import*, *Module*, or *Type* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

### **Memories**

<br/>

You can read more about the memories in the import *Memories* list, in the [Memories section](/wasm/building-blocks/5-memories) of our WebAssembly overview.

<br/>

Colummns of the import *Memories* list:

| name                          | purpose                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| *Import*<sup>1</sup>          | *Memory* field name in `string` format                                                                     |
| *Module*<sup>2</sup>          | Module the *memory* is imported from, `Link` to *Metadata overview* for Module                             |
| *Thread Sharing*<sup>3</sup>  | If shared *memory* (a `SharedArrayBuffer`) or not (an `ArrayBuffer`), possible values: `true` and `false`  |
| *Minimum*<sup>4</sup>         | Minimum memory size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate                        |
| *Maximum*<sup>5</sup>         | Maximum memory size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate                        |

<br/>

![The WASM Analyzer memories imports](../images/webassembly_inspector_11.png)
*The imported memories list*

<br/>

The list can by sorted by clicking on the *Import*, or *Module* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

### **Globals**

<br/>

You can read more about the globals in the import *Globals* list, in the [Globals section](/wasm/building-blocks/6-globals) of our WebAssembly overview.

<br/>

Columns of the import *Globals* list:

| name                          | purpose                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------- |
| *Import*<sup>1</sup>          | *Global* variable field name in `string` format                                  |
| *Module*<sup>2</sup>          | Module the *global* is imported from, `Link` to *Metadata overview* for Module   |
| *Type*<sup>3</sup>            | [Type](/wasm/concepts-and-features/1-types) of the *global* variable             |
| *Mutable*<sup>4</sup>         | If *global* is **mutable**, possible values: `true` and `false`                  |

<br/>

![The WASM Analyzer globals imports](../images/webassembly_inspector_12.png)
*The imported globals list*

<br/>

The list can by sorted by clicking on the *Import*, *Module*, or *Type* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

---

<br />

## Summary

- The *Imports* page can be accessed by clicking the *Imports* `navigation item` in the WASM Analyzer sidebar.
- The *Imports* page shows information about imported *functions*, *tables*, *memories* and *globals*.
- The *Imports* lists are searchable and sortable.

<br />

<br />

### **Additional reading**

- [Nor<sup>2</sup> on _WebAssembly_](/wasm/)
