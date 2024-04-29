import AutoReplace from "slate-auto-replace-legacy"


export const chars = [
  
  AutoReplace({
    trigger: /(")/,
    before: /[^ ”]$/,
    transform: transform => {
      return transform.insertText("”") 
    },
  }),
  AutoReplace({
    trigger: /(")/,
    before: /^|[ ]$/,
    transform: transform => {
      return transform.insertText("“") 
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /[^ ”]$/,
    transform: transform => {
      return transform.insertText("’") 
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /^|[ ]$/,
    transform: transform => {
      return transform.insertText("‘") 
    },
  }),

  
  AutoReplace({
    trigger: "space",
    before: /( -)$/,
    transform: transform => {
      return transform.insertText(" — ") 
    },
  }),
  AutoReplace({
    trigger: "space",
    before: /(\.\.\.)$/,
    transform: transform => {
      return transform.insertText("… ") 
    },
  }),
]
