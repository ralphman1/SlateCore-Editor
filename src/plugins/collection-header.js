import AutoReplace from "slate-auto-replace-legacy"
import When from "slate-when"


export const header = [
  AutoReplace({
    trigger: "space",
    before: /^(#)$/,
    transform: transform => {
      return transform.setBlocks({type: "heading"}) 
    },
  }),
  When({
    when: value => value.blocks.some(b => b.type === "heading"),
    plugin: AutoReplace({
      trigger: "enter",
      before: /.+/,
      transform: (transform, event, matches) => {
        let heading = matches.before[0]
        if (
          heading[heading.length - 1].search(/[^\w\s]|_/) === -1 
        )
          return transform
            .insertText(".")
            .splitBlock()
            .setBlocks({type: "paragraph"})
        else return transform.splitBlock().setBlocks({type: "paragraph"})
      },
    }),
  }),
  When({
    when: value => value.blocks.some(b => b.type === "heading"),
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
