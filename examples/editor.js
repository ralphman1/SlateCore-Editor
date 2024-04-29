import React from "react"
import lscache from "lscache"

import {EXAMPLE_VALUE} from "./constants"
import {


  FrenchPress,


} from "../src/index"
import {TestPlugin} from "./plugin"
import 






Picture from "../src/components/vignettes/Picture"


export class Editor extends React.PureComponent {


  constructor(props) {
    super(props)
    this.state = {
      status: "ok",
    }
  }



  handleCallbackStatus = status => {
    this.setState({
      status,
    })
  }


  render = () => {
    return (
      <div>
        {}
        <div style={{background: "#eee", color: "#999", padding: ".5em"}}>
          {this.state.status === "ok" ? "Draft Saved." : "Saving..."}
        </div>
        {}
        <FrenchPress




          placeholder="Write here..."









          value={lscache.get("composer-content-state") ? null : EXAMPLE_VALUE}



          components={{




            Picture,
          }}

          options={{




            domain: "localhost:3002",



            imagePlaceholder:
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",



          }}



          callbackStatus={this.handleCallbackStatus}




          callbackError={(error, reason) => {
            console.log(error, reason)
          }}



          editorRef={editorRef => {}}



          controls={{


            MakeHeader: () => <span>H</span>,


            CancelHeader: () => <span>undo heading</span>,


            MakeQuote: () => <span>“</span>,


            MakeLink: () => <u>a</u>,


            MakeBold: () => <strong>b</strong>,


            MakeItalic: () => <em>i</em>,

            UploadImage: () => <span>Upload Image</span>,
          }}




          slatePlugins={[TestPlugin({key: "b"})]}
        />
      </div>
    )
  }
}
