import Link from "next/link";
import Window from "../../layouts/main";
import Router from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import { Home } from '@material-ui/icons';
import "../../static/styles/workflow.scss";

export default function Workflow(props) {
  function routeToHome() {
    Router.push({
      pathname: "/"
    });
  }

  return (
    <Window>
      <section>
        <header>
          <div className="workflow--container">
            <AppBar position="static" className="workflow--appbar">
              <Toolbar className="workflow--toolbar">
                <img src="/static/assets/tm-logo.png" className="workflow--logo" />
                <Typography variant="h6" className="workflow--title">
                  Toastmasters Scheduler
                </Typography>
                <IconButton className="workflow--home-icon-button" onClick={routeToHome}>
                  <Home className="workflow--home-icon"/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <nav className="workflow__nav">
            <Link href="/workflow/newschedule">
              <a className="workflow__nav--link">New Schedule</a>
            </Link>
            <Link href="/workflow/previous-sessions">
              <a className="workflow__nav--link">Previous Sessions</a>
            </Link>
            <Link href="/workflow/members">
              <a className="workflow__nav--link">Members Config</a>
            </Link>
            <Link href="/workflow/roles">
              <a className="workflow__nav--link">Roles Config</a>
            </Link>
          </nav>
        </header>
        {props.children}
      </section>
    </Window>
  );
}
