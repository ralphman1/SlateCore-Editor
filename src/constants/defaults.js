
export const DEFAULT_EDITOR_STATE = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "",
              },
            ],
          },
        ],
      },
    ],
  },
}


export const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "quote",
  hr: "divider",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  a: "link",
  img: "image",
}

export const MARK_TAGS = {
  em: "italic",
  i: "italic",
  strong: "bold",
  b: "bold",
}


export const PLACEHOLDER_TEXT = "Write your story…"


export const PICTURE_ACCEPTED_UPLOAD_MIME = [
  "image/png",
  "image/jpeg",
  "image/gif",
]


export const PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN = "PNG, JPEG, or GIF"
