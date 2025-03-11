---
title: "Package Registry"
date: 2023-07-12
lastmod: 2023-07-12
draft: true
tags: []
description: "Package Registry viewer"
---

The WASM Analyzer *Package Registry* is accessible via the *Open Package Registry* button<sup>1</sup> on the start page, and as a navigation item<sup>2</sup> in the main WASM Analyzer interface sidebar. The Package Registry displays a list of WebAssembly *packages* from a given *repository*. Read more about packages in our [WebAssembly documentation](/wasm/), [here](/wasm/concepts-and-features/4-wit#wit-packages).

<br/>

![The Open Package Registry button on the WASM Analyzer start page](../images/placeholder.png)
*The Open Package Registry button*

![The Package Registry tab on the WASM Analyzer main page](../images/placeholder.png)
*The Package Registry*

<br />

<br />

---

<br />

## Package Registry address field 

<br />

In the Package Registry header section, you'll find an address field:

![Address field](../images/placeholder.png)
*The Package Registry address field*

<br />

The default address for this field is:

`https://preview-registry.bytecodealliance.org`

<br />

:::note[The Bytecode Alliance]

The preset repository address goes to the [ByteCode Alliance](https://bytecodealliance.org/) package preview repository.

:::

<br />

<br />

To fetch a list of packages from a different repository, enter the address of a valid WebAssembly package repository into the address field and press the `enter` key, `tab` out of the address field, or click somewhere else on the page.

If you've entered a valid address to a WASM package repository, the page will update with a the package list from your selected repository. You may empty the address field to reload a list from the ByteCode Alliance package preview repository.

<br />

<br />

---

<br />

## Package Registry search function

<br />

Above the package list, you'll find the search bar:

<br />

![Search bar](../images/placeholder.png)
*The Package Registry search bar*

<br />

The search bar contains a *search filter* button<sup>1</sup>, and a *search field*<sup>2</sup>: 

<br />

![Filter button and search bar](../images/placeholder.png)
*The Package Registry filter button and search field*

<br />

<br />

---

<br />

### Basic search

<br />

To run a basic search for package names matching a specific package name search query, click on the search field. Type in a search word and press the `enter` key, `tab` out of the search field, or click elsewhere on the page. After you initiate a search, the list will update with a set of search results matching your query. If no matches are available, the list will be emtpy.

<br />

<br />

---

<br />

### Filter list

<br />

To filter the package list by various package attributes, you can click the *filter* button to access a dropdown with the filter menu:

<br />

![Filter menu](../images/placeholder.png)
*The Package Registry search filter*

<br />

The search filter has three tabs. The tabs are *By category*, *By license*, and *By author*.

<br />

<br />


#### By category tab

<br />

The *By category* tab contains settings for filtering the package list by *Category*:

<br />

![*By category* tab](../images/placeholder.png)
*The Package Registry search filter `By category` tab*

<br />

Enter a valid category name into the *category* field, and press the `enter` key, to add that category to a list of one or more category *tags*.

<br />

![Category *tag* list]../images/(placeholder.png)
*The Package Registry search filter category tag list*

<br />

<br />

#### By license tab

<br />

The *By license* tab contains settings for filtering the package list by *License*:

<br />

![*By license* tab](../images/placeholder.png)
*The Package Registry search filter `By license` tab*

<br />

Select one or more licenses from the *license* checklist:

<br />

![License checklist](../images/placeholder.png)
*The Package Registry search filter license checklist*

<br />

<br />

#### By owner tab

<br />

The *By author* tab contains settings for filtering the package list by *Author*:

<br />

![*By author* tab](../images/placeholder.png)
*The Package Registry search filter `By author` tab*

<br />

Select one or more authors from the *Author* checklist:

<br />

![Author checklist](../images/placeholder.png)
*The Package Registry search filter Author checklist*

<br />

<br />

#### Loading the Search filter results

<br />

Once you've completed your search filter settings, press the *Apply*<sup>1</sup> button to update the Package Registry list as per your search filter settings. Use the *Cancel*<sup>2</sup> button to unset the filter and keep the currently loaded package list:

<br />

![Search filter buttons](../images/placeholder.png)
*The Package Registry search filter buttons*

<br />

<br />

---

<br />

## Package Registry list items

<br />

Each package in the list is represented by a *card*:

<br />

![Package Registry card](../images/placeholder.png)
*A Package Registry card*

<br />

<br />

The left part of the card contains the following Metadata, if available:

| name                         | explanation                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| *Name*<sup>1</sup>           | Published name of the package: `Click` on this field to enter the *Metadata* view for this package.    |
| *Version*<sup>2</sup>        | Latest published *version* of the package                                                              |
| *Component type*<sup>3</sup> | *Component* type of the package; Possible values: `Component`, `Interface`, or `Module`                 |
| *Description*<sup>4</sup>    | Package description                                                                                    |
| *Homepage*<sup>5</sup>       | Homepage `link`                                                                                        |
| *Documentation*<sup>6</sup>  | Documentation `link`                                                                                   |
| *Repository*<sup>7</sup>     | Repository `link`                                                                                      |
| *Category* tags<sup>8</sup>  | List of meta categories; A `tag` list                                                                  |

<br />

![Package Registry card, right side](../images/placeholder.png)
*Package Registry card, right side*

<br />

<br />

The right part of the card contains the following:

| name                         | explanation                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| *Latest Release*<sup>1</sup> | *Publishing date* of the latest *version* of the package                        |
| *Releases*<sup>2</sup>       | Number of released *versions* of the package                                    |
| *Size*<sup>3</sup>           | Package size in *bytes*, displayed as *kilobytes*/*megabytes* as appropriate    |
| *Author*<sup>4</sup>         | List of one or more package authors, including email address if available       |
| *License*<sup>5</sup>        | Representation of the license, or licenses, the package falls under             |

<br />

![Package Registry card, right side](../images/placeholder.png)
*Package Registry card, left side*

<br />

<br />

---

<br />

## Summary

<br />

- The Package Registry is accessible from the *Open Package Registry* button, on the WASM Analyzer start page, or from the *Package Registry* tab once you've loaded a *.wasm* file, or a *package* from the Package Registry list.
- A list of packages from a different package *package repository* may by fetched, by entering a repository address in the *address field*. 
- The Package Registry can be *searched* or *filtered* using the **search bar**.
- Packages are represented as *cards* that contain some of the available *metadata* for a given package.
- Clicking on a *package* name in the list leads to a more detailed *Metadata view*, for that package.

<br />

<br />

### **Additional reading**

- [Nor<sup>2</sup> on _WebAssembly_](/wasm/)