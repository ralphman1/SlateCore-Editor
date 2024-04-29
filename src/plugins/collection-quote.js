import AutoReplace from "slate-auto-replace-legacy"
import When from "slate-when"


export const quote = [
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    transform: transform => {
      return transform.setBlocks({type: "quote"}) 
    },
  }),

  When({
    when: value => value.blocks.some(b => b.type === "quote"),
    plugin: AutoReplace({
      trigger: "enter",
      before: /^.|$/,
      transform: transform => {
        return transform.splitBlock().setBlocks({type: "paragraph"}) 
      },
    }),
  }),

  When({
    when: value => value.blocks.some(b => b.type === "quote"),
    plugin: AutoReplace({
      trigger: "backspace",
      after: /./,
      before: /^$/,
      transform: transform => {
        return transform.setBlocks({type: "paragraph"}) 
      },
    }),
  }),
]
