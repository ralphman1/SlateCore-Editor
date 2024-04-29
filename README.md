# SlateCore Editor

Offline-first rich text editor component for modern web applications.

---

## Overview

SlateCore Editor is a flexible rich text editor designed for fast integration and a smooth writing experience. It provides a structured content model, extensible components, and support for offline editing.

---

## Features

- Offline-ready content editing  
- Structured JSON-based content model  
- Image support with pluggable components  
- Customizable UI and behavior  
- Lightweight and modular architecture  

---

## Installation

    yarn add slatecore-editor

---

## Usage

### Basic Setup

    import React from "react"
    import { render } from "react-dom"
    import { ThemeProvider } from "styled-components"
    import { BrowserRouter } from "react-router-dom"

    import { Editor, EditorWrapper } from "slatecore-editor"

    render(
      <ThemeProvider theme={{}}>
        <BrowserRouter>
          <EditorWrapper>
            <Editor />
          </EditorWrapper>
        </BrowserRouter>
      </ThemeProvider>,
      document.getElementById("app")
    )

---

## Image Support

To enable image rendering:

    import { Editor } from "slatecore-editor"
    import { ImageBlock } from "slatecore-editor"

    <Editor components={{ ImageBlock }} />

---

## Reader

A lightweight reader component can render stored content without loading the editor:

    import { Reader } from "slatecore-editor"

    <Reader value={content} />

---

## Content Model

The editor stores content in a structured JSON format, making it easy to:

- Persist data  
- Transform content  
- Integrate with backend systems  

---

## Core Capabilities

- Paragraphs and headings  
- Quotes and dividers  
- Links and inline formatting  
- Image blocks  
- Keyboard shortcuts  
- Automatic formatting  

---

## Editor Behavior

- Floating formatting controls  
- Drag and drop support  
- Keyboard shortcuts for formatting  
- Automatic content normalization  

---

## Customization

You can extend the editor by:

- Adding custom components  
- Modifying styles  
- Extending behavior with plugins  

---

## Notes

- Designed for editorial and content-focused applications  
- Optimized for performance and usability  
- Suitable for blogs, dashboards, and content tools  

---

## License

MIT