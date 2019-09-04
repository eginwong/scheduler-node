import { Component } from "react";
import moment from "moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { cloneDeep } from "lodash";

import DatabaseService from "../../src/services/database.service";
import ScheduleService from "../../src/services/schedule.service";
import RoleService from "../../src/services/role.service";
import ResultsDialog from "./results";
import "../../static/styles/search-header.scss";
import { CapCase } from "../../src/utils/string.utils";

const roles = RoleService.GetExpandedRoles().map(r => JSON.parse(JSON.stringify(r)));

function generateEmail(results, participants, scheduleDate) {
  let mailToString = "mailto:";
  let bodyToString =
    "&body=Hello%20Toastmasters%2C%0A%0AAfter%20running%20our%20scheduler%2C%20we%20have%20the%20following%20roles%3A%0A";

  results.forEach(res => {
    const indexOfParticipant = participants.findIndex(
      i => i.name === res.member
    );
    mailToString += participants[indexOfParticipant].email + "; ";
    bodyToString +=
      "*%20" + CapCase(res.role) + "%3A%20" + CapCase(res.member) + "%0A";
  });
  bodyToString +=
    "%0APlease%20confirm%20if%20you%20can%20take%20on%20these%20roles.%20Thanks%20again!";

  if (DatabaseService.GetConfig().adminEmail) {
    mailToString += "?cc=" + DatabaseService.GetConfig().adminEmail + "&";
  } else {
    mailToString += "?"
  }
  mailToString +=
    "subject=Roles%20for%20our%20next%20Toastmasters%20Session%20" +
    scheduleDate.toISOString().split("T")[0];
  mailToString += bodyToString;
  return mailToString;
}

function TransformParticipants(participants) {
  if (participants) {
    return cloneDeep(participants).map(p => {
      delete p.possibleRoles;
      return {
        ...p,
        lock: p && p.lock ? p.lock.value : undefined
      };
    });
  }
  return participants;
}

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: TransformParticipants(props.participants),
      scheduleDate: props.scheduleDate,
      modalOpen: false,
      results: []
    };
  }

  // update props from parent
  componentWillReceiveProps(nextProps) {
    this.setState({
      participants: TransformParticipants(nextProps.participants),
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

  generateSchedule() {
    // validation
    if (this.state.participants.length < roles.length) {
      alert("Sorry, not enough participants to schedule a meeting.");
    } else {
      const results = ScheduleService.CreateSchedule(
        this.state.scheduleDate,
        this.state.participants
      );

      const mailToString = generateEmail(
        results,
        this.state.participants,
        this.state.scheduleDate
      );

      this.setState({
        modalOpen: true,
        results: results,
        emailHref: mailToString
      });
    }
  }

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
            className="participants__search--datepicker"
            label="Session Date"
            format="MM/dd/yyyy"
            value={this.state.scheduleDate}
            onChange={this.setScheduleDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <button
          className="btn btn-primary"
          onClick={() => this.generateSchedule()}
        >
          Generate Schedule
        </button>
        <ResultsDialog
          results={this.state.results}
          scheduleDate={this.state.scheduleDate}
          open={this.state.modalOpen}
          emailHref={this.state.emailHref}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
