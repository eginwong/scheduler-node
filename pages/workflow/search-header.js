import { Component } from "react";
import moment from "moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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
      scheduleDate: this.props.scheduleDate,
      modalOpen: false,
      results: []
    };
  }

  // update props from parent
  componentWillReceiveProps(nextProps) {
    this.setState({
      participants: nextProps.participants,
      scheduleDate: nextProps.scheduleDate
    });
  }

  // need to explicitly say when to update prop if we want to receive parent prop update
  shouldComponentUpdate(nextProps) {
    return (
      this.state.participants.length !== nextProps.participants.length ||
      this.state.modalOpen !== nextProps.modalOpen ||
      this.state.results !== nextProps.results ||
      this.state.scheduleDate !== nextProps.scheduleDate
    );
  }

  setScheduleDate = e => {
    this.setState({
      scheduleDate: moment(e, "YYYY-M-D")
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
      DatabaseService.ProcessResults();
      DatabaseService.Export();
      this.setState({ modalOpen: false });
    } else {
      this.setState({ modalOpen: false });
    }
  };

  render() {
    return (
      <div className="participants__search--header">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Session Date"
            format="MM/dd/yyyy"
            value={this.state.scheduleDate}
            onChange={this.setScheduleDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
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
