import React, { Component } from "react";
import "../static/styles/upload.scss";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onClickHandler = e => {
    if (e.target !== e.currentTarget) e.currentTarget.click();
  };

  render(props) {
    return (
      <React.Fragment>
        <input id="hi" className="upload--input" type="file" name="file" />
        <label htmlFor="hi" onClick={this.onClickHandler}>
          <button className="btn btn-primary">{this.props.buttonLabel}</button>
        </label>
      </React.Fragment>
    );
  }
}

export default Upload;
