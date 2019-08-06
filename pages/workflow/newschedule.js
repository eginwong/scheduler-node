import { Component } from "react";
import Workflow from "./index";
import { CapCase } from "../../src/utils/string.utils";
import DatabaseService from "../../src/services/database.service";
import ScheduleService from "../../src/services/schedule.service";
import MemberService from "../../src/services/member.service";
import "../../static/styles/participants.scss";

import Select from "react-select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@material-ui/icons/Close";

const members = MemberService.GetMembers().map(m =>
  JSON.parse(JSON.stringify(m))
);

const membersDto = members.map(m => {
  return { value: m, label: CapCase(m.name) };
});

export default class NewSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: membersDto,
      participants: []
    };
  }

  handleSelect = opt => {
    this.setState({
      members: this.state.members.filter(member => member.label !== opt.label),
      participants: this.state.participants.concat(opt.value)
    });
  };

  generateSchedule = () => {
	console.log(ScheduleService.CreateSchedule(new Date(), this.state.participants));
	// route to success page
  }

//   removeParticipant = event => {
// 	this.state.participants.splice(event, 1);
//     this.setState({
//       members: members,
//       participants: this.state.participants
//     });
//   }

  render() {
    return (
      <Workflow>
        <section className="participants__container">
          <Card className="participants__search">
            <CardContent className="participants__search--content">
              <label htmlFor="findParticipant">
                <span>Add Participants</span>
              </label>
              <Select
                id="findParticipant"
                value={null}
                onChange={this.handleSelect}
                options={this.state.members}
                placeholder="Type or select member name..."
              />
            </CardContent>
          </Card>

          <Card className="participants__card">
            <CardContent>
              <div className="participants__card__head-actions">
                <button>MM/DD/YYYY ICON</button>
                <button className="btn btn-primary" onClick={this.generateSchedule}>Generate Schedule</button>
              </div>
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
                      {/* <td key={"close_" + i}>
                        <CloseIcon onClick={this.removeParticipant} />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardActions className="members__card__actions">
              {/* <Button size="small" color="primary" onClick={Save}>
                Save Changes
              </Button> */}
            </CardActions>
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
