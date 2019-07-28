import Workflow from "./index";
import { Component } from "react";
import DatabaseService from "../../src/services/database.service";

class NewSchedule extends Component {
  render() {
    return (
      <Workflow>
        <p>New Schedule</p>
        <button className="btn btn-primary" onClick={() => console.log(DatabaseService.Export())}>Save and Export</button>
      </Workflow>
    );
  }
}

export default NewSchedule;
