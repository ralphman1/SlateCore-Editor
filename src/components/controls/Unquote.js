import styled from "styled-components"

import button from "./css/button"


export default styled.button`
  ${button}
  border-radius: 0.25em;
  margin: 1.35em -1em -3.35em 0;
  float: right;
  position: relative;
  z-index: 11;
  @media (max-width: 520px) {
    right: 2em;
  }
`
