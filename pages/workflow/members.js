import Workflow from "./index";
import { CapCase } from "../../src/utils/string.utils";
import MemberService from "../../src/services/member.service";
import RoleService from "../../src/services/role.service";
import Checkbox from "../../components/checkbox";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "../../static/styles/members.scss";

let roles, members;

export default function Members() {
  roles = RoleService.GetRoles()
    .filter((r, i, a) => a.indexOf(r) === i)
    .slice();
  members = MemberService.GetMembers().map(m => JSON.parse(JSON.stringify(m)));
  const [open, setOpen] = React.useState(false);

  function Save() {
    MemberService.UpdateMembers(members);
    setOpen(true);
  }

  function handleClose(event) {
    setOpen(false);
  }

  return (
    <Workflow>
      <section>
        <div className="members__container">
          <Card className="members__card">
            <CardContent>
              <table>
                <tbody>
                  <tr className="members__card--header">
                    <th>Members</th>
                    {roles
                      .filter((r, i, a) => a.indexOf(r) === i)
                      .map((role, i) => (
                        <th key={i}>{CapCase(role)}</th>
                      ))}
                  </tr>
                  {members.map((member, i) => (
                    <tr key={"member_" + i}>
                      <td key={"name_" + i}>{CapCase(member.name)}</td>
                      {Object.keys(member.capabilities).map((capability, j) => (
                        <td key={"capability_" + j}>
                          <Checkbox
                            id={member.name + "_" + capability}
                            checked={!!member.capabilities[capability]}
                            change={b => (member.capabilities[capability] = +b)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardActions className="members__card__actions">
              <Button size="small" color="primary" onClick={Save}>
                Save Changes
              </Button>
            </CardActions>
          </Card>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <SnackbarContent
              id="snackbar--content"
              aria-describedby="client-snackbar"
              message={
                <span>
                  <CheckCircleIcon className="snackbar--side-icon" />
                  Changes saved!
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  className="snackbar--button-icon"
                  onClick={handleClose}
                >
                  <CloseIcon className="snackbar--icon" />
                </IconButton>
              ]}
            />
          </Snackbar>
        </div>
      </section>
    </Workflow>
  );
}
