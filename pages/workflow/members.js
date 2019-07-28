import Workflow from './index';

import MemberService from '../../src/services/member.service';

export default function Members() {
    return (
      <Workflow>
        <section>
        	<table>
        		<tbody>
	        		<tr>
	        			<th>Members</th>
	        			{
	        				MemberService.GetRoles().map(role => <th>{ CapCase(role) }</th>)
	        			}
	        		</tr>
	        		{
	        			MemberService.GetMembers().map(member => (<tr>
	        				<td>{ CapCase(member.name) }</td>
	        				<td>thing</td>
	        			</tr>))
	        		}
        		</tbody>
        	</table>
        </section>
      </Workflow>
    );
}

function CapCase(string) {
	return string.replace(/[-_]/, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}