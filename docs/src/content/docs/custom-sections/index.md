---
title: "Custom Sections"
date: 2023-07-12
lastmod: 2023-07-12
draft: true
tags: []
description: "Custom Sections"
---

The WASM Analyzer *Custom Sections* page is accessible as a navigation item in the WASM Analyzer navigation menu. The navigation item is only clickable if the *.wasm* file or package contains one or more Custom Section. The Custom Sections list displays a representation of the available *Custom Sections* in a given *.wasm* file, or package. You can read more about custom sections in the [Custom sections](/wasm/building-blocks/7-custom-sections/) part of our WebAssembly overview documentation.

<br/>

![Custom Sections view](../images/placeholder.png)
*The Custom Sections view*

<br/>

<br/>

---

<br />

## Custom Sections search function

<br />

Above the Custom Sections list, you'll find the search bar:

<br />

![Search bar](../images/placeholder.png)
*The Custom Sections search bar*

<br />

<br />

---

<br />

### Basic Search

<br />

To run a basic search for Custom Section names matching a specific name search query, click on the *search field*. Type in a search word and press the `enter` key, `tab` out of the search field, or click elsewhere on the page. After you initiate a search, the list will update with a set of search results matching your query. If no matches are available, the list will be emtpy.

<br />

<br />

---

##  The Custom Sections list

<br/>

In the *Custom sections* list, you'll find a list of custom sections.

The *Custom sections* list has the following columns:

| name                          | purpose                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| *Name*<sup>1</sup>            | Custom section name in `string` format                                                 |
| *Description*<sup>2</sup>     | A description of the purpose of the Custom Section, for *known* custom sections only   |
| *Size*<sup>3</sup>            | Size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate                   |

<br/>

![Custom Sections](../images/webassembly_inspector_18.png)
*The Custom Sections list*.

<br/>

<br/>

The list can by sorted by clicking on the *Name*, or *Size* column headers. One click sorts the list in in descending order on the selected column. Clicking the same column again sorts the list according to ascending order. A third click on the same column clears the current sort order and returns the list to its original unsorted state.

<br/>

<br/>

---

<br />

## Summary

<br />

- The *Custom Sections* page can be accessed by clicking the *Custom Sections* `navigation item` in the WASM Analyzer sidebar.
- The *Custom Sections* page shows a list of *Custom Sections* inside of a WebAssembly file, or package.
- The *Custom Sections* list is searchable and sortable.

<br />

<br />

### **Additional reading**

- [Nor<sup>2</sup> on _WebAssembly_](/wasm/)