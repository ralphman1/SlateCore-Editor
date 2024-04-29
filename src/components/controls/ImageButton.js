import React from "react"
import styled from "styled-components"

import button from "./css/button"

const ImageButton = styled.button`
  ${button}
  position: absolute;
  border-radius: 0.25em;
  right: 0.5em;
`


export default props => {
  return (
    <ImageButton
      className="fpe-image-button"
      followComposerCursor
      style={props.style}
      onMouseDown={event => props.click(event)}
    >
      {props.children}
    </ImageButton>
  )
}
