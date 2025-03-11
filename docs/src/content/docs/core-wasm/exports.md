---
title: "Exports"
date: 2023-07-12
lastmod: 2023-07-12
draft: true
tags: []
description: "Exports inspection"
---

You'll reach the *Exports* page by clicking the *Exports* navigation item on the WASM Analyzer sidebar. On the Exports page, you find information about exports the WebAssembly file exposes, if any. At the top of the Exports page, you find a summary of the following:

* Exported Functions<sup>1</sup>
* Exported Tables<sup>2</sup>
* Exported Memories<sup>3</sup>
* Exported Globals<sup>4</sup>

<br/>

![The WASM Analyzer exports page](../images/webassembly_inspector_13.png)
*The summary section*.

<br/>

Clicking one of the summary items above takes you to the top of the related table.

<br/>

You can read more about WebAssembly exports in the [Exports section](/wasm/building-blocks/2-exports) of our WebAssembly overview.

Below the summary, you find lists in sections representing those export statements that are present in the *.wasm* file, or package.

<br/>

<br/>

---

<br />

## Exports search function

<br />

Above the Export lists, you'll find the search bar:

<br />

![Search bar](../images/placeholder.png)
*The Exports search bar*

<br />

Read on for information about how to run a search.

<br />

<br />

---

<br />

### Basic Search

<br />

To run a basic search for Export names, or Module names matching a specific name search query, click on the *search field*. Type in a search word and press the `enter` key, `tab` out of the search field, or click elsewhere on the page. After you initiate a search, the list will update with a set of search results matching your query. If no matches are available, the list will be emtpy.

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

You can read more about the functions in the export *Functions* list, in the [Functions section](/wasm/building-blocks/3-functions) of our WebAssembly overview.

<br/>

Columns of the export *Functions* list:

| name                          | purpose                                                                   |
| ----------------------------- | ------------------------------------------------------------------------- |
| *Export*<sup>1</sup>          | Function name in `string` format                                          |
| *Parameters*<sup>2</sup>      | [Typed](/wasm/concepts-and-features/1-types) parameters required by *function*    |
| *Result*<sup>3</sup>          | [Typed](/wasm/concepts-and-features/1-types) *function* output                    |

<br/>

![The WASM Analyzer functions exports](../images/webassembly_inspector_14.png)
*The exported functions list*

<br/>

The list can by sorted by clicking on the *Export* column header. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

### **Tables**

<br/>

You can read more about the tables in the export *Tables* list, in the [Tables section](/wasm/building-blocks/4-tables) of our WebAssembly overview.

<br/>

Columns of the exports *Tables* list:

| name                     | purpose                                                                     |
| ------------------------ | --------------------------------------------------------------------------- |
| *Export*<sup>1</sup>     | *Table* name in `string` format                                             |
| *Type*<sup>2</sup>       | Function type in *table*, possible values: `anyfunc` and `externalref`      |
| *Minimum*<sup>3</sup>    | Initial `number` of items, and minimum `number` of items in *table*         |
| *Maximum*<sup>4</sup>    | Maximum `number` of items in *table*                                        |

<br/>

![The WASM Analyzer tables exports](../images/webassembly_inspector_15.png)
*The exported tables tab*

<br/>

The list can by sorted by clicking on the *Export*, or *Type* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

### **Memories**

<br/>

You can read more about the memories in the export *Memories* list, in the [Memories section](/wasm/building-blocks/5-memories) segment of this documentation.

<br/>

Colummns of the export *Memories* list:

| name                          | purpose                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| *Export*<sup>1</sup>          | *Memory* field name in `string` format                                                                     |
| *Thread Sharing*<sup>2</sup>  | If shared *memory* (a `SharedArrayBuffer`) or not (an `ArrayBuffer`), possible values: `true` and `false`  |
| *Minimum*<sup>3</sup>         | Minimum memory size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate                        |
| *Maximum*<sup>4</sup>         | Maximum memory size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate                        |

<br/>

![The WASM Analyzer memories exports](../images/webassembly_inspector_16.png)
*The exported memories list*

<br/>

The list can by sorted by clicking on the *Export* column header. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

### **Globals**

<br/>

You can read more about the globals in the export *Globals* list, in the [Globals section](/wasm/building-blocks/6-globals) segment of this documentation.

<br/>

Columns of the export *Globals* list:

| name                          | purpose                                                             |
| ----------------------------- | ------------------------------------------------------------------- |
| *Export*<sup>1</sup>          | *Global* variable field name in `string` format                     |
| *Type*<sup>2</sup>            | [Type](/wasm/concepts-and-features/1-types) of the *global* variable            |
| *Mutable*<sup>3</sup>         | If *global* is **mutable**, possible values are `true` and `false`  |

<br/>

![The WASM Analyzer globals exports](../images/webassembly_inspector_17.png)
*The export globals list*.

<br/>

The list can by sorted by clicking on the *Export*, or *Type* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

---

<br />

## Summary

- The *Exports* page can be accessed by clicking the *Exports* `navigation item` in the WASM Analyzer sidebar.
- The *Exports* page shows information about imported *functions*, *tables*, *memories* and *globals*.
- The *Exports* lists are searchable and sortable.


<br />

<br />

### **Additional reading**

- [Nor<sup>2</sup> on _WebAssembly_](/wasm/)



