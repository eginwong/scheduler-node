import { Component } from 'react';
import Workflow from "./index";

import { CapCase } from '../../src/utils/string.utils';

import DatabaseService from "../../src/services/database.service";
import ScheduleService from '../../src/services/schedule.service';
import MemberService from '../../src/services/member.service';

import Select from 'react-select';
import Checkbox from '../../components/checkbox';

const members = MemberService.GetMembers().map(m => JSON.parse(JSON.stringify(m)));
const membersDto = members.map(m => { return { value: m, label: CapCase(m.name) }});

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
	}

    render() {
    	return (
          <Workflow>
            <section>
            	<label htmlFor="findParticipant">
            		<p>Add Participant</p>
            	</label>
            	<Select id="findParticipant"
            		value={ null }
            		onChange={ this.handleSelect }
            		options={ this.state.members }
            		placeholder="Type or select member name..." />
            </section>
            <section>
            	<div>
            		<button>MM/DD/YYYY ICON</button>
            		<button>Generate Schedule</button>
            	</div>
            	<table>
            		<tbody>
            			<tr>
            				<th></th>
            				<th>Participants</th>
            				<th>Last Role</th>
            				<th>Volunteered Role</th>
            				<th></th>
            			</tr>
            			{
            				this.state.participants.map((particip, i) => <tr key={i}>
            					<td key={'selected_' + i}><Checkbox id={particip.name + "_" + i}
            							checked={ particip.selected }
            							change={ b => particip.selected = b } />
            						<span>&nbsp;{i + 1}&nbsp;</span>
            					</td>
            					<td key={'name_' + i}>{ CapCase(particip.name) }</td>
            					<td key={'lastrole_'+ i}>{ particip.lastRole }</td>
            					<td key={'volunrole_'+ i}>{ particip.volunRole }</td>
            					<td key={'edit_' + i}><button>...</button></td>
            				</tr>)
            			}
            		</tbody>
            	</table>
            </section>
            <button className="btn btn-primary" onClick={() => console.log(DatabaseService.Export())}>Save and Export</button>
          </Workflow>
        );
    }
}
