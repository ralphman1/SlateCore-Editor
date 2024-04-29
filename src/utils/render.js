import React from "react"

import Unquote from "../components/controls/Unquote"


export const renderNode = props => {
  const {node, attributes, children, isSelected, editor} = props
  const focus = editor.value.isFocused && isSelected
  const className = focus ? "focus" : "nofocus"

  const {components} = (editor && editor.props) || {}
  const {data} = node

  switch (node.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>
    case "heading":
      return <h3>{children}</h3>
    case "divider":
      return <hr className={className} />
    case "quote":
      return (
        <div style={{clear: "both"}}>
          {!props.readOnly && focus && (
            <Unquote
              className="fpe-unquote"
              contentEditable="false"
              spellCheck="false"
              suppressContentEditableWarning
              onClick={event => {
                event.preventDefault()
                editor.onChange(
                  editor.value
                    .change()
                    .setNodeByKey(attributes["data-key"], {
                      type: "paragraph",
                    })
                    .focus()
                )
              }}
              branded
            >
              Unquote
            </Unquote>
          )}
          <blockquote {...attributes} className={className}>
            {children}
          </blockquote>
        </div>
      )
    case "image": {
      if (components && components.Picture) {
        const Picture = components.Picture
        return <Picture {...props} />
      } else {

        console.warn("<Picture /> component required to render images")
        return null
      }
    }
    case "link": {
      const href = data.get("href")

      if (components && components.Link) {
        const Link = components.Link
        return (
          <>
            <Link {...attributes} to={href}>
              {children}
            </Link>
            {" "}
          </>
        )
      } else {
        return (
          <>
            <a {...attributes} href={href}>
              {children}
            </a>
            {" "}
          </>
        )
      }
    }
    default:
      return <p {...attributes}>{children}</p>
  }
}


export const renderMark = props => {
  const {children, mark} = props
  switch (mark.type) {
    case "bold":
      return <strong>{children}</strong>
    case "italic":
      return <em>{children}</em>
    default:
      return {children}
  }
}
