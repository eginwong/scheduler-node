import { Component } from "react";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

import DatabaseService from "../../src/services/database.service";
import ScheduleService from "../../src/services/schedule.service";
import RoleService from "../../src/services/role.service";
import ResultsDialog from "./results";
import "../../static/styles/search-header.scss";

const roles = RoleService.GetRoles().map(r => JSON.parse(JSON.stringify(r)));

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
      scheduleDate: moment(new Date(), "YYYY-M-D"),
      modalOpen: false,
      results: []
    };
  }

  // update props from parent
  componentWillReceiveProps(nextProps) {
    this.setState({ participants: nextProps.participants });
  }

  // need to explicitly say when to update prop if we want to receive parent prop update
  shouldComponentUpdate(nextProps) {
    return (
      this.state.participants.length !== nextProps.participants.length ||
      this.state.modalOpen !== nextProps.modalOpen ||
      this.state.results !== nextProps.results
    );
  }

  setScheduleDate = e => {
    this.setState({
      scheduleDate: moment(e.target.value, "YYYY-M-D")
    });
  };

  generateSchedule = () => {
    // validation
    if (this.state.participants.length < roles.length) {
      alert("Sorry, not enough participants to schedule a meeting.");
    } else {
      this.setState({
        modalOpen: true,
        results: ScheduleService.CreateSchedule(
          this.state.scheduleDate,
          this.state.participants
        )
      });
    }
  };

  handleClose = value => {
    if (value === "SendEmail") {
    } else if (value === "SaveSession") {
      DatabaseService.Export();
      this.setState({ modalOpen: false });
    } else if (value === "SaveHistory") {
      this.setState({ modalOpen: false });
    } else {
      this.setState({ modalOpen: false });
    }
  };

  render() {
    return (
      <div className="participants__search--header">
        <form noValidate>
          <TextField
            label="Session Date"
            type="date"
            defaultValue={new Date()}
            InputLabelProps={{
              shrink: true
            }}
            onChange={value => this.setScheduleDate(value)}
          />
        </form>
        <button className="btn btn-primary" onClick={this.generateSchedule}>
          Generate Schedule
        </button>
        <ResultsDialog
          results={this.state.results}
          scheduleDate={this.state.scheduleDate}
          open={this.state.modalOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
