import Workflow from "./index";
import HistoryService from "../../src/services/history.service";
import "../../static/styles/previous-sessions.scss";

export default () => {
  return (
    <Workflow>
      <h1>Previous Sessions</h1>
      <div>
        {HistoryService.GetHistory().map((data, i) => {
          return (
            <div className="session--card" key={"fragment" + i}>
              <h2 key={"date" + i}>{data.sessionDate}</h2>
              <ul key={"list" + i}>
                {data.roles.map((role, j) => {
                  return (
                    <li key={"role-name" + j}>
                      {role.roleName} : {role.user}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Workflow>
  );
};
