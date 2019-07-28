import { Component, Fragment } from "react";
import "../static/styles/upload.scss";
import DatabaseService from "../src/services/database.service";

class Upload extends Component {
  // to ensure that label will override the click event for the button
  onClickHandler = e => {
    if (e.target !== e.currentTarget) e.currentTarget.click();
  };

  onReaderLoad = e => {
    DatabaseService.SetData(JSON.parse(e.target.result));
    this.props.reroute();
  };

  onChange = e => {
    const reader = new FileReader();
    reader.onload = this.onReaderLoad; // set callback method
    reader.readAsText(event.target.files[0]);
  };

  render() {
    return (
      <Fragment>
        <input
          id="uploadInput"
          className="upload--input"
          type="file"
          name="file"
          onChange={this.onChange}
        />
        <label htmlFor="uploadInput" onClick={this.onClickHandler}>
          <button className="btn btn-primary">{this.props.buttonLabel}</button>
        </label>
      </Fragment>
    );
  }
}

export default Upload;
