import Window from "../layouts/main";
import Link from "next/link";
import "../static/styles/landing.scss";

export default () => {
  return (
    <Window>
      <div className="landing">
        <img
          className="landing--logo"
          src="/static/assets/tm-logo.png"
          alt="Toastmasters Logo"
        />
        <h1 className="landing--title">Toastmasters Scheduler</h1>
        <div className="landing--routes">
          <button className="landing--button btn btn-primary ">
            <Link href="/workflow/newschedule">
              <a>New Schedule</a>
            </Link>
          </button>
          <button className="landing--button btn btn-light">
            <Link href="/workflow/prev-sessions">
              <a>Previous Sessions</a>
            </Link>
          </button>
          <button className="landing--button btn btn-light">
            <Link href="/workflow/members">
              <a>Member Configuration</a>
            </Link>
          </button>
        </div>
      </div>
    </Window>
  );
};
