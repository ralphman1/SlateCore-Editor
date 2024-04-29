import isDataString from "valid-data-url"
import localForage from "localforage"
import {v1 as uuidv1} from "uuid"

import {PICTURE_ACCEPTED_UPLOAD_MIME} from "../constants/defaults"


export const fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    if (file instanceof Blob) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", () => {
        resolve(reader.result)
      })
      reader.addEventListener("error", error => {
        reject(error)
      })
    } else if (isDataString(file)) {
      resolve(file)
    } else
      reject({
        error: "TypeError: parameter must be a File/blob or a data-uri string.",
      })
  })
}


export const base64ToBlob = string => {
  if (string instanceof Blob) return string
  let byteString
  if (string.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(string.split(",")[1])
  else byteString = unescape(string.split(",")[1])
  const mimeString = string
    .split(",")[0]
    .split(":")[1]
    .split(";")[0]
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], {type: mimeString})
}


export const forceImageRestrictions = (size, type, max = 10) => {
  let correctFileType = false
  PICTURE_ACCEPTED_UPLOAD_MIME.forEach(acceptedFiletype => {
    if (acceptedFiletype === type) correctFileType = true
  })
  return new Promise((resolve, reject) => {
    if (size / 1000000 <= max && correctFileType) resolve()
    else {
      let message = size / 1000000 > max ? "size" : "mime"
      reject(message)
    }
  })
}


export const imageButtonPosition = function(value, parentOffsets) {
  const {focusBlock} = value
  const hideImageButton = () =>
    this.setState({
      cursorContext: {...this.state.cursorContext, newLine: false},
    })
  if (!focusBlock) return
  if (
    focusBlock.type !== "paragraph" &&
    focusBlock.type !== "heading" &&
    focusBlock.type !== "image"
  ) {
    hideImageButton()
    return
  }
  if (
    window.getSelection().rangeCount !== 0 &&
    window.getSelection().getRangeAt(0).collapsed === false
  ) {
    hideImageButton()
    return
  }
  const cursorContext = {
    firstEmptyLine:
      value.document.text === "" && value.document.nodes.size === 1,
    newLine: focusBlock.type === "image" ? false : value.focusBlock.text === "",
    parentBlockOffsets: parentOffsets,
  }
  this.setState({cursorContext})
}


export const handleImageButton = function(event) {
  if (!event) return
  event.preventDefault()
  event.stopPropagation()
  
  const responseDelay = setTimeout(() => {
    clearTimeout(responseDelay)
    if (!this.props.components.PictureDocket) {
      
      this.fileInput.click()
      return
    }




    
    const activeBlockKey = this.state.value.focusBlock.key
    const resolvedState = this.state.value
      .change({save: false})
      .insertBlock({
        type: "docket",
        isVoid: true,
      })
      .value.change({save: false})
      .removeNodeByKey(activeBlockKey)

    
    this.setState(prevState => ({
      value: resolvedState.value,
      cursorContext: {...prevState.cursorContext, newLine: false},
    }))
  }, 50)
}


export const handleFileUpload = function(event) {
  const file = event.target.files[0]
  forceImageRestrictions(
    file.size,
    file.type,
    this.props.options &&
      this.props.options.imageMaxSize &&
      this.props.options.imageMaxSize
  )
    .then(() => {
      const key = uuidv1()
      const editorProps = this.slateEditor.props
      const block = {
        type: "image",
        isVoid: true,
        data: {file, key, src: editorProps.options.imagePlaceholder},
      }
      const docket = this.state.pictureDocketNode
      let resolvedState
      fileToBase64(file).then(string => localForage.setItem(key, string))

      
      if (!docket) resolvedState = editorProps.value.change().insertBlock(block)
       else
        resolvedState = editorProps.value
          .change()
          .insertBlock(block)
          .value.change()
          .removeNodeByKey(docket)

      window.requestAnimationFrame(() => {
        this.handleChange(resolvedState)
        docket && this.setState({pictureDocketNode: undefined})
      })
    })
    .catch(reason => {
      this.props.callbackError("insert_image", reason)
    })
}
