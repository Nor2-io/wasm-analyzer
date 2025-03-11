---
title: "Metadata"
date: 2023-07-12
lastmod: 2023-07-12
draft: true
tags: []
description: "Metadata inspection"
---

The WASM Analyzer *Metadata Overview* is accessible via clicking on the name of a package in the *Package Registry* package list<sup>1</sup>, and as a navigation item<sup>2</sup> in the main WASM Analyzer interface. The Metadata Overview displays a representation of the available *metadata* for a given package. Read more about packages in our [WebAssembly documentation](/wasm/), [here](/wasm/concepts-and-features/4-wit#wit-packages).

<br/>

![Clickable card name in the Package Registry list](./images/placeholder.png)
*A clickable package name on a package card in the Package registry list*

![Metadata navigation item on the WASM Analyzer siderbar](./images/placeholder.png)
*The Metadata navigation item on the WASM Analyzer sidebar*

<br />

<br />

---

<br />

## Metadata overview

<br />

The main Metadata overview section contains the following metadata for a given package, when such information is available:

| name                            | explanation                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------|
| *Name*<sup>1</sup>              | Name defined in the names section or if not present the published name of the package                                                                                   |
| *Languages*<sup>2</sup>         | One or more programming language used to produce the source code for the *.wasm* file or package                |
| *Hash*<sup>3</sup>              | `sha256` of the *.wasm* file, or *package*              |
| *Type*<sup>4</sup>              | *Type* of the package, or contents of the *.wasm* file; Possible values: `Component`, `Interface`, or `Module`  |
| *Tools*<sup>5</sup>             | *Tools* used to produce the *.wasm* file, or package                                                            |
| *Size*<sup>6</sup>              | Package size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate                                    |
| *SDK*<sup>7</sup>               | *SDK* the *.wasm* file, or package was built on                                                                 |
| *Version*<sup>8</sup>           | Latest published *version* of the package                                                                       |


<br />

![Main Metadata section](./images/placeholder.png)
*The main Metadata section*

<br />

In addition, the Metadata overview may contain the following:

| name                            | explanation                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| *Component type*<sup>1</sup>    | Content type of the package, possible values: `Component` or `Module`                                       |
| *WASM Version*<sup>2</sup>      | *WebAssembly version* the package was created for, displayed for *Modules*                                  |
| *Component Version*<sup>3</sup> | Component Model version* the package was created for, displayed for *Components*                            |
| *Encoding*<sup>4</sup>          | Shows whether is a `Component`, or a `Module` according to the WebAssembly Component Module.                |
| **padlock symbol**<sup>5</sup>  | Displays for *locked* packages; Shown if the package requires specific versions of its dependencies.        |
| **box symbol**<sup>6</sup>      | Displays for packages with *bundled* dependencies; Shown if the package includes its own dependencies.      |

<br />

![Metadata overview for Component](./images/placeholder.png)
*The Metadata overview displayed for a Component*

![Metadata overview for Module](./images/placeholder.png)
*The Metadata overview displayed for a Module*

<br />

<br />

---

<br />

## Registry Metadata

<br />

Below the main Metadata overview, the *Registry Metadata* section displays additional Metadata, when available:

| name                         | explanation                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| *License*<sup>1</sup>        | Representation of the license, or licenses, the package falls under                                            |
| *Authors*<sup>2</sup>        | List of one or more package authors, including email address where available                                   |
| *Homepage*<sup>3</sup>       | Homepage `link`, when appropriate URL is included in the metadata of the *.wasm* file or package               |
| *Documentation*<sup>4</sup>  | Documentation `link`, when appropriate URL is included in the metadata of the *.wasm* file or package          |
| *Repository*<sup>5</sup>     | Repository `link`, when appropriate URL is included in the metadata of the *.wasm* file or package             |
| *Categories*<sup>6</sup>     | List of meta categories; A `tag` list                                                                          |

<br />

![Metadata Registry section](./images/placeholder.png)
*The Metadata Registry section*

<br />

<br />

The Metadata Registry section may also include the *Fund this package* button. If present, this button will redirect you to an external page where you have the option of sending money in support of the package author:

![Metadata Registry section funding button](./images/placeholder.png)
*The **Fund this package** button*

<br />

<br />

---

<br />

## Summary

- The *Metadata overview* can be accessed by opening a *.wasm* file from the *WASM Analyzer* start page, or by clicking the name of a package in the *Package Registry* list pf packages.
- The *Metadata overview* gives you a detailed view of various *metadata* attributes of a *.wasm* file or package.

<br />

<br />

### **Additional reading**

- [Nor<sup>2</sup> on _WebAssembly_](/wasm/)