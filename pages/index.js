import React, { Component } from "react";
import Page from "../layouts/main";
import Link from "next/link";
import Upload from "../components/upload";
import Router from "next/router";
import "../static/styles/index.scss";

class Index extends Component {
  routeToLandingImperatively() {
    Router.push({
      pathname: "/landing"
    });
  }

  render() {
    return (
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
              <Upload
                buttonLabel="Upload Members ▲"
                reroute={this.routeToLandingImperatively}
              />
            </div>
            <button className="index--button btn btn-light">
              <Link href="/landing">
                <a>CREATE SCHEDULE</a>
              </Link>
            </button>
          </div>
        </div>
      </Page>
    );
  }
}

export default Index;
