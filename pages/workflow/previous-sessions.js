import Workflow from "./index";
import HistoryService from "../../src/services/history.service";
import { CapCase } from "../../src/utils/string.utils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../../static/styles/previous-sessions.scss";

export default () => {
  const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };
  const history = HistoryService.GetHistory();

  return (
    <Workflow>
      <div>
        {history.map((data, i) => {
          return (
            <Card className="session__card" key={"card" + i}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {new Date(data.sessionDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Typography>
                <div className="session__card__container">
                  {data.roles.map((role, i) => (
                    <Card
                      key={"card" + i}
                      className="session__card__container--card"
                    >
                      <CardContent
                        key={"cardContent" + i}
                        className="session__card__container--card-content"
                      >
                        <h4 className="session__card__container--card-content-role">
                          {CapCase(role.roleName)}
                        </h4>
                        <h6>{CapCase(role.user)}</h6>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className={history.length > 0 ? "hidden" : ""}>
        <Card className="session__card">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              No previous sessions available.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Workflow>
  );
};
