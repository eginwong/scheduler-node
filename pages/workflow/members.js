import Workflow from './index';

import MemberService from '../../src/services/member.service';

export default function Members() {
    return (
      <Workflow>
        <section>
        	<table>
        		<tr>
        			<th>Members</th>
        			{
        				MemberService.GetRoles().map(role => <th>{ role }</th>)
        			}
        		</tr>
        		{
        			MemberService.GetMembers().map(member => (<tr>
        				<td>{ member.name }</td>
        				<td>thing</td>
        			</tr>))
        		}
        	</table>
        </section>
      </Workflow>
    );
}
