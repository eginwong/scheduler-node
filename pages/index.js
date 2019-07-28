import Page from "../layouts/main";
import Link from "next/link";
import Upload from "../components/upload";
import "../static/styles/index.scss";

export default () => (
  <Page>
    <div className="index">
      <div className="index--contents">
        <img
          className="index--logo"
          src="/static/assets/tm-logo.png"
          alt="Toastmasters Logo"
        />
        <h1 className="index--title">Toastmasters Scheduler, v0.1</h1>
        <div className="index--button">
          <Upload buttonLabel="Upload Members ▲" />
        </div>
        <button className="btn btn-light index--button">
          <Link href="/landing">
            <a>CREATE SCHEDULE</a>
          </Link>
        </button>
      </div>
    </div>
  </Page>
);
