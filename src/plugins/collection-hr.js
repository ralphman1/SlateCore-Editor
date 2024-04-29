import AutoReplace from "slate-auto-replace-legacy"


export const hr = [
  AutoReplace({
    trigger: "enter",
    before: /^\*\*\*$/,
    transform: transform => {
      return transform
        .setBlocks({type: "divider", isVoid: true})
        .moveToStartOfNextBlock() 
    },
  }),
]
