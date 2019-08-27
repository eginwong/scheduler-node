import { Component } from "react";
import Workflow from "./index";
import { CapCase } from "../../src/utils/string.utils";
import MemberService from "../../src/services/member.service";
import DatabaseService from "../../src/services/database.service";
import "../../static/styles/participants.scss";

import Select from "react-select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import SearchHeader from "./search-header";

function addPossibleRoles(participant) {
  return Object.assign(participant, {
    possibleRoles: [{ value: undefined, label: "..." }].concat(
      Object.keys(participant.capabilities)
        .filter(c => !!participant.capabilities[c])
        .map(c => {
          return { value: c, label: CapCase(c) };
        })
    )
  });
}

function formatMembers() {
  return MemberService.GetMembers().map(m => {
    return {
      value: m,
      label: CapCase(m.name)
    };
  });
}

export default class NewSchedule extends Component {
  constructor(props) {
    super(props);
    const session = DatabaseService.GetData().session;
    let membersDto = formatMembers();

    if (session && session.participants) {
      session.participants = session.participants
        .map(participant => addPossibleRoles(participant))
        .map(participant => {
          // add lock object structure back, but only when on load
          if (
            typeof participant.lock === "string" ||
            participant.lock instanceof String
          ) {
            participant.lock = {
              value: participant.lock,
              label: CapCase(participant.lock)
            };
          }
          return participant;
        });

      const names = session.participants.map(particip => particip.name);
      membersDto = membersDto.filter(
        member => !names.includes(member.value.name)
      );
    }

    this.state = {
      members: membersDto,
      participants: session && session.participants ? session.participants : [],
      scheduleDate:
        session && session.scheduleDate
          ? moment(session.scheduleDate, "YYYY-M-D")
          : moment(new Date(), "YYYY-M-D")
    };
  }

  handleSelect = opt => {
    this.setState({
      members: this.state.members.filter(member => member.label !== opt.label), // removes member from selection
      participants: this.state.participants.concat(addPossibleRoles(opt.value))
    });
  };

  handleLockSelect(opt, i) {
    this.setState({
      participants: this.state.participants.map((participant, index) => {
        if (index !== i) return participant;
        return {
          ...participant,
          lock: opt
        };
      })
    });
  }

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
              <SearchHeader
                scheduleDate={this.state.scheduleDate}
                participants={this.state.participants}
              />

              <div className="participants__search--content">
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
              </div>
            </CardContent>
          </Card>

          <Card
            className={
              this.state.participants.length > 0
                ? "participants__card"
                : "hidden"
            }
          >
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
                      <td key={"lockColumn_" + i}>
                        <Select
                          id={"lock_" + i + "_"}
                          value={particip.lock}
                          onChange={opt => this.handleLockSelect(opt, i)}
                          options={particip.possibleRoles}
                          placeholder="..."
                        />
                      </td>
                      <td key={"close_" + i}>
                        <CloseIcon onClick={() => this.removeParticipant(i)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      </Workflow>
    );
  }
}
