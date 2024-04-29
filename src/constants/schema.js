import {Block} from "slate"



export const SCHEMA = {
  document: {
    nodes: [
      {
        match: [
          {type: "paragraph"},
          {type: "heading"},
          {type: "divider"},
          {type: "quote"},
          {type: "image"},
          {type: "docket"},
          {type: "link"},
        ],
      },
    ],
    last: [{type: "quote"}, {type: "paragraph"}],
    normalize: (change, error) => {
      if (error.code === "last_child_type_invalid") {
        const paragraph = Block.create("paragraph")
        return change.insertNodeByKey(
          error.node.key,
          error.node.nodes.size,
          paragraph
        )
      } else return null
    },
  },
  blocks: {
    link: {
      match: {object: "text"},
    },
    divider: {
      isVoid: true,
    },
    image: {
      isVoid: true,
      data: {
        src: value => value,
      },
    },
    docket: {
      isVoid: true,
    },
    quote: {
      match: {object: "text"},
    },
    paragraph: {
      match: [{object: "text"}, {object: "link"}],
    },
    heading: {
      match: {object: "text"},
    },
  },
}
