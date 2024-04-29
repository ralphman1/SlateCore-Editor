
export const focusEvents = function() {
  
  document.addEventListener(
    "dragover",
    event => {
      event.preventDefault()
      if (this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        this.handleDragOver()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )
  document.addEventListener(
    "drop",
    () => {
      if (!this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        this.handleDragEnd()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )

  
  document.addEventListener(
    "keydown",
    event => {
      if (event.keyCode === 27 && this.slateEditor) {
        this.slateEditor.blur()
      }
    },
    false
  )
}
