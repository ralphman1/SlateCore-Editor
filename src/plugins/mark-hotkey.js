import keycode from "keycode"



export function MarkHotkey(options) {
  const {type, key} = options
  return {
    onKeyDown(event, change) {
      if (change.value.focusBlock.type !== "paragraph") return
      if (!event.metaKey || keycode(event.which) !== key) return
      event.preventDefault()
      change.toggleMark(type)
      return true
    },
  }
}
