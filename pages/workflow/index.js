import Link from 'next/link';

export default function Workflow(props) {
    return (
      <section>
        <header>
        	<h2>Toastmaster's Scheduler</h2>
        	<button>HomeIcon</button>
        	<nav>
        		<Link href="/workflow/newschedule">
        			<a>New Schedule</a>
        		</Link>
        		<Link href="/workflow/prevschedule">
        			<a>Previous Schedule</a>
        		</Link>
        		<Link href="/workflow/members">
        			<a>Members</a>
        		</Link>
        	</nav>
        </header>
        {props.children}
      </section>
    );
  }