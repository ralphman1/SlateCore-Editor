import "localforage-getitems"

import {Editor} from "slate-react-legacy"
import {Value} from "slate"
import React from "react"
import getOffsets from "positions"
import localForage from "localforage"

import {
  PICTURE_ACCEPTED_UPLOAD_MIME,
  PLACEHOLDER_TEXT,
} from "./constants/defaults"
import {SCHEMA} from "./constants/schema"
import {focusEvents} from "./utils/focus"
import {formatCommand, menuPosition} from "./utils/format"
import {
  handleFileUpload,
  handleImageButton,
  imageButtonPosition,
} from "./utils/image"
import {loadContent, saveContent, setDraftStatusHelper} from "./utils/storage"
import {plugins} from "./plugins"
import {renderMark, renderNode} from "./utils/render"
import ImageButton from "./components/controls/ImageButton"
import FormatMenu from "./components/controls/FormatMenu"


export class FrenchPress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(this.props.value || loadContent()),
      schema: SCHEMA,
      cursorContext: {
        newLine: false,
        parentBlockOffsets: {top: 0, left: 0},
      },
      dragOver: false,
      editorFocus: false,
      pictureDocketNode: undefined,
    }

    
    this.slatePlugins =
      props.slatePlugins && props.slatePlugins.length > 0
        ? [].concat.apply([], [plugins, props.slatePlugins])
        : plugins
  }

  
  componentDidMount = () => {
    if (
      this.slateEditor &&
      this.slateEditor.value &&
      !this.slateEditor.state.value.hasUndos
    ) {
      
      const contentImageKeys = this.slateEditor.value
        .toJSON()
        .document.nodes.filter(node => !!(node.data && node.data.key))
        .map(node => node.data.key)

      localForage.getItems().then(storedImageKeys => {
        
        let unusedImageKeys = []
        Object.keys(storedImageKeys).forEach(storedKey => {
          let unused = true
          contentImageKeys.forEach(usedKey => {
            if (storedKey === usedKey) {
              unused = false
            }
          })
          unused && unusedImageKeys.push(storedKey)
        })
        unusedImageKeys.forEach(imageKey => {
          localForage.removeItem(imageKey)
        })
        unusedImageKeys.length > 0 &&

          console.log(
            `Removed ${unusedImageKeys.length} unused image(s) from browser's database.`
          )
      })
    }
    menuPosition.call(this)
    this.props.editorRef && this.props.editorRef(this.slateEditor)
  }

  componentDidUpdate = () => menuPosition.call(this)

  
  handleChange = ({value}) => {
    this.setState({value})
    
    const cursorContextDelay = setTimeout(() => {
      const nodeKey = value.focusBlock.key
      const block = window.document.querySelector(`[data-key="${nodeKey}"]`)
      this.setState({
        editorFocus: value.selection.isFocused,
      })
      imageButtonPosition.call(
        this,
        value,
        block ? getOffsets(block, "top left", block, "top left") : {}
      )
      clearTimeout(cursorContextDelay)
    }, 300)
    this.props.callbackStatus &&
      this.props.callbackStatus(setDraftStatusHelper())
    saveContent(document, value, this.props.callbackStatus)
  }

  
  handleImageButton = event => handleImageButton.call(this, event)

  
  handleFileUpload = event => handleFileUpload.call(this, event)

  
  handleClickPropagation = event => event.stopPropagation()

  
  handleDragOver = () => {
    this.setState({
      dragOver: true,
    })
  }

  
  handleDragEnd = () => {
    this.setState({
      dragOver: false,
    })
  }

  
  menuRef = menu => {
    this.menu = menu
  }

  
  formatCommand = type => formatCommand.call(this, type)

  render = () => {
    focusEvents.call(this)

    
    const ImageButtonLabel =
      this.props.controls && this.props.controls.UploadImage
        ? this.props.controls.UploadImage
        : () => <span>Upload Image</span>

    return [
      <div style={{position: "relative"}} key="Editor">
        <ImageButton
          style={{
            top: this.state.cursorContext
              ? this.state.cursorContext.parentBlockOffsets.top
              : 0,
            display:
              this.state.cursorContext.newLine &&
              this.props.components &&
              this.props.components.Picture
                ? "block"
                : "none",
            opacity: this.state.editorFocus ? "1" : "0",
          }}
          click={this.handleImageButton}
        >
          <ImageButtonLabel />
        </ImageButton>
        <Editor
          placeholder={this.props.placeholder || PLACEHOLDER_TEXT}
          options={{
            ...this.props.options,
            imagePlaceholder:
              (this.props.options && this.props.options.imagePlaceholder) ||
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            domain: (this.props.options && this.props.options.domain) || "",
          }}
          components={this.props.components}
          callbackError={this.props.callbackError}
          plugins={this.slatePlugins}
          value={this.state.value}
          onChange={this.handleChange}
          onClick={this.handleClickPropagation}
          schema={this.state.schema}
          renderNode={renderNode}
          renderMark={renderMark}
          style={{
            minHeight: "28em",
            boxShadow: this.state.editorFocus
              ? "1px 1px 0 0 rgba(44,44,44,.1)"
              : "",
            background: this.state.dragOver ? "rgba(44,44,44,.075)" : "",
          }}
          ref={input => (this.slateEditor = input)}
          fileInputRef={this.fileInput}
          formatCommand={this.formatCommand}
          controls={this.props.controls}
        />
        <input
          type="file"
          accept={PICTURE_ACCEPTED_UPLOAD_MIME.toString()}
          style={{display: "none"}}
          onChange={this.handleFileUpload}
          ref={input => (this.fileInput = input)}
        />
      </div>,
      <FormatMenu
        key="Menu"
        menuRef={this.menuRef}
        onChange={this.handleChange}
        value={this.state.value}
        formatCommand={this.formatCommand}
        style={{display: this.state.editorFocus ? "flex" : "none"}}
        controls={this.props.controls}
      />,
    ]
  }
}
