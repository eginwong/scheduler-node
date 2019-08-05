import Workflow from "./index";
import HistoryService from "../../src/services/history.service";
import { CapCase } from "../../src/utils/string.utils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../../static/styles/previous-sessions.scss";

export default () => {
  const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Workflow>
      <div>
        {HistoryService.GetHistory().map((data, i) => {
          return (
            <Card className="session--card" key={"card" + i}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {new Date(data.sessionDate).toLocaleDateString("en-US", DATE_OPTIONS)}
                </Typography>
                <ul>
                  {data.roles.map((role, j) => {
                    return (
                      <li className="session--card__participants" key={"role-name" + j}>
                        {CapCase(role.roleName)} : {CapCase(role.user)}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Workflow>
  );
};
