import Link from "next/link";
import Window from "../../layouts/main";

export default function Workflow(props) {
  return (
    <Window>
      <section>
        <header>
          <h2>Toastmaster's Scheduler</h2>
          <button>HomeIcon</button>
          <nav>
            <Link href="/workflow/newschedule">
              <a>New Schedule</a>
            </Link>
            <Link href="/workflow/previous-sessions">
              <a>Previous Sessions</a>
            </Link>
            <Link href="/workflow/members">
              <a>Members</a>
            </Link>
          </nav>
        </header>
        {props.children}
      </section>
    </Window>
  );
}
