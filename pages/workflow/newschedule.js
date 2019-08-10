import { Component } from "react";
import Workflow from "./index";
import { CapCase } from "../../src/utils/string.utils";
import DatabaseService from "../../src/services/database.service";
import ScheduleService from "../../src/services/schedule.service";
import MemberService from "../../src/services/member.service";
import RoleService from "../../src/services/role.service";
import ResultsDialog from "./results";
import "../../static/styles/participants.scss";

import Select from "react-select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@material-ui/icons/Close";

const members = MemberService.GetMembers().map(m =>
  JSON.parse(JSON.stringify(m))
);

const membersDto = members.map(m => {
  return { value: m, label: CapCase(m.name) };
});

const roles = RoleService.GetRoles().map(r => JSON.parse(JSON.stringify(r)));

export default class NewSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: membersDto,
      participants: [],
      modalOpen: false,
      results: []
    };
  }

  handleSelect = opt => {
    this.setState({
      members: this.state.members.filter(member => member.label !== opt.label), // removes member from selection
      participants: this.state.participants.concat(opt.value)
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
          new Date(),
          this.state.participants
        )
      });
    }
  };

  handleClose = value => {
    console.log(value);
    if (value === "SendEmail") {
    } else {
      this.setState({ modalOpen: false });
    }
  };

  removeParticipant = event => {
    const member = this.state.participants.splice(event, 1)[0];
    const participant = {
      label: CapCase(member.name),
      value: member
    };
    this.setState({
      members: this.state.members.concat(participant)
    });
  };

  render() {
    return (
      <Workflow>
        <section className="participants__container">
          <Card className="participants__search">
            <CardContent>
              <div className="participants__search--header">
                <button>MM/DD/YYYY ICON</button>
                <button
                  className="btn btn-primary"
                  onClick={this.generateSchedule}
                >
                  Generate Schedule
                </button>
                <ResultsDialog
                  results={this.state.results}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                />
              </div>

              <div className="participants__search--content">
                <label htmlFor="findParticipant">
                  <span>Add Participants</span>
                </label>
                <Select
                  id="findParticipant"
                  value={null}
                  onChange={this.handleSelect}
                  changeHandler={this.changeHandler}
                  options={this.state.members}
                  placeholder="Type or select member name..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className={this.state.participants.length > 0 ? 'participants__card' : 'hidden'}>
            <CardContent className="participants__card--content">
              <table>
                <tbody>
                  <tr className="participants__card--header">
                    <th />
                    <th>Participants</th>
                    <th>Volunteered Role</th>
                    <th />
                  </tr>

                  {this.state.participants.map((particip, i) => (
                    <tr key={i}>
                      <td
                        key={"index_" + i}
                        className="participants__card--index"
                      >
                        &nbsp;{i + 1}&nbsp;
                      </td>
                      <td key={"name_" + i}>{CapCase(particip.name)}</td>
                      <td key={"volunrole_" + i}>{particip.volunRole}</td>
                      <td key={"close_" + i}>
                        <CloseIcon onClick={() => this.removeParticipant(i)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <button
            className="btn btn-primary"
            onClick={() => console.log(DatabaseService.Export())}
          >
            Save and Export
          </button>
        </section>
      </Workflow>
    );
  }
}
