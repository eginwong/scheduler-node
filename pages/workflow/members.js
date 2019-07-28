import Workflow from './index';

import MemberService from '../../src/services/member.service';

import Checkbox from '../../components/checkbox';

export default function Members() {
    return (
      <Workflow>
        <section>
        	<table>
        		<tbody>
	        		<tr>
	        			<th>Members</th>
	        			{
	        				MemberService.GetRoles().filter((r, i, a) => a.indexOf(r) === i)
	        					.map((role, i) => <th key={i}>{ CapCase(role) }</th>)
	        			}
	        		</tr>
	        		{
	        			MemberService.GetMembers().map((member, i) => (<tr key={"member_" + i}>
	        				<td key={"name_" + i}>{ CapCase(member.name) }</td>
	        				{
	        					Object.keys(member.capabilities).map((capability, j) => (
	        						<td key={"capability_" + j}>
	        							<Checkbox id={ member.name + "_" + capability }
	        								checked={ !!member.capabilities[capability] }
	        								change={ b => member.capabilities[capability] = +b } />
	        						</td>
	        					))
	        				}
	        			</tr>))
	        		}
        		</tbody>
        	</table>
        	<button onClick={Save}>Save Changes</button>
        </section>
      </Workflow>
    );
}

function CapCase(string) {
	return string.replace(/[-_]/, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function Save() {
	MemberService.UpdateMembers();
}