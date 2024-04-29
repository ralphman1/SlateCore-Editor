import InsertImages from "slate-drop-or-paste-images-legacy"
import localForage from "localforage"
import {v1 as uuidv1} from "uuid"

import {fileToBase64, forceImageRestrictions} from "../utils/image"


export const images = [
  InsertImages({
    insertImage: (transform, file, editor) => {
      return forceImageRestrictions(
        file.size,
        file.type,
        editor.props.options.imageMaxSize
      )
        .then(() => {
          
          const key = uuidv1()

          
          fileToBase64(file).then(string => localForage.setItem(key, string))

          
          return transform.insertBlock({
            type: "image",
            isVoid: true,
            data: {
              file,
              key,
              src: editor.props.options.imagePlaceholder,
            },
          })
        })
        .catch(reason => {
          editor.props.callbackError("insert_image", reason)
        })
    },
  }),
]
