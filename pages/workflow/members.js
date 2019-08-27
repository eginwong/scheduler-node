import Workflow from "./index";
import { CapCase, ReverseCapCase } from "../../src/utils/string.utils";
import MemberService from "../../src/services/member.service";
import RoleService from "../../src/services/role.service";
import Checkbox from "../../components/checkbox";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "../../static/styles/members.scss";
import { cloneDeep } from "lodash";

const roles = RoleService.GetRoles()
.filter((r, i, a) => a.indexOf(r) === i)
.slice();

export default function Members() {
  const [members, setMembers] = React.useState(MemberService.GetMembers().map(m => cloneDeep(m)));
  const [open, setOpen] = React.useState(false);
  const [newMemberValue, setNewMemberValue] = React.useState({
    name: "",
    email: ""
  });

  function Save() {
    MemberService.UpdateMembers(members);
    setOpen(true);
  }

  function SaveNewMember() {
    if(newMemberValue.name && newMemberValue.email) {
      newMemberValue.name = ReverseCapCase(newMemberValue.name);
      MemberService.AddMember(newMemberValue);
      ClearNewMember();
      setMembers(MemberService.GetMembers().map(m => cloneDeep(m)));
      setOpen(true);
    }
  }

  function ClearNewMember() {
    setNewMemberValue({name: "", email: ""});
  }

  function handleClose(event) {
    setOpen(false);
  }

  const handleChange = name => event => {
    setNewMemberValue({ ...newMemberValue, [name]: event.target.value });
  };

  return (
    <Workflow>
      <section>
        <div className="members__container">
          <Card className="members__card">
            <CardHeader title="Add Member" className="member__add__title"/>
            <CardContent className="member__add__content">
              <div className="member__add__content--input">
                <TextField
                  id="name"
                  label="Name"
                  className="member__add__content--input-field"
                  value={newMemberValue.name}
                  onChange={handleChange("name")}
                  margin="normal"
                  required
                />
                <TextField
                  id="email"
                  label="Email"
                  className="member__add__content--input-field"
                  value={newMemberValue.email}
                  onChange={handleChange("email")}
                  margin="normal"
                  required
                />
              </div>
              <div className="member__add__content--buttons">
                <Button size="small" color="primary" onClick={SaveNewMember}>
                  Save
                </Button>
                <Button size="small" color="secondary" onClick={ClearNewMember}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="members__card">
            <CardContent className="members__card--content">
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
                    <tr key={"member_" + member.name + "_" + i}>
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
