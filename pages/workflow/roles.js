import Workflow from "./index";
import { CapCase, ReverseCapCase } from "../../src/utils/string.utils";
import RoleService from "../../src/services/role.service";
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
import DatabaseService from "../../src/services/database.service";

export default function Roles() {
  const [roles, setRoles] = React.useState(RoleService.GetRoles());
  const [open, setOpen] = React.useState(false);
  const [newRole, setNewRole] = React.useState({
    name: "",
    quantity: 0
  });

  function Save() {
    RoleService.UpdateRoles(roles);
    setOpen(true);
  }

  function SaveNewRole() {
    if (newRole.name && newRole.quantity) {
      newRole.name = ReverseCapCase(newRole.name);
      newRole.quantity = parseInt(newRole.quantity);
      RoleService.AddRole(newRole);
      ClearNewRole();
      setRoles(RoleService.GetRoles());
      setOpen(true);
    }
  }

  function ClearNewRole() {
    setNewRole({ name: "", quantity: 0 });
  }

  function handleClose(event) {
    setOpen(false);
  }

  const handleChange = name => event => {
    setNewRole({ ...newRole, [name]: event.target.value });
  };

  return (
    <Workflow>
      <section>
        <div className="members__container">
          <Card className="members__card">
            <CardHeader title="Add Role" className="member__add__title" />
            <CardContent className="member__add__content">
              <div className="member__add__content--input">
                <TextField
                  id="name"
                  label="Name"
                  className="member__add__content--input-field"
                  value={newRole.name}
                  onChange={handleChange("name")}
                  margin="normal"
                  required
                />
                <TextField
                  id="quantity"
                  label="Quantity"
                  className="member__add__content--input-field"
                  value={newRole.quantity}
                  onChange={handleChange("quantity")}
                  margin="normal"
                  required
                />
              </div>
              <div className="member__add__content--buttons">
                <Button size="small" color="primary" onClick={SaveNewRole}>
                  Save
                </Button>
                <Button size="small" color="secondary" onClick={ClearNewRole}>
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
                    <th>Roles</th>
                    <th>Quantity</th>
                  </tr>
                  {roles.map((role, i) => (
                    <tr key={"role_" + role.name + "_" + i}>
                      <td key={"name_" + i}>{CapCase(role.name)}</td>
                      <td key={"quantity_" + i}>{role.quantity}</td>
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
