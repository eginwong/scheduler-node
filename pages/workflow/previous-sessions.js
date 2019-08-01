import Workflow from "./index";
import HistoryService from "../../src/services/history.service";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../../static/styles/previous-sessions.scss";

export default () => {
  return (
    <Workflow>
      <h1>Previous Sessions</h1>

      <div>
        {HistoryService.GetHistory().map((data, i) => {
          return (
            <Card className="session--card" key={"card" + i}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.sessionDate}
                </Typography>
                <ul>
                  {data.roles.map((role, j) => {
                    return (
                      <li className="session--card__participants" key={"role-name" + j}>
                        {role.roleName} : {role.user}
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
