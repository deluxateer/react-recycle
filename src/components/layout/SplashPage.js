import React, { Component } from "react";

class SplashPage extends Component {
  componentWillMount() {
    // remove parent container, and margin for navbar & footer
    const defaultContainer = document.querySelector(".main-container");
    defaultContainer.classList.remove("container");

    const navbar = document.querySelector(".navbar");
    navbar.style.cssText = "margin-bottom: 0 !important;";

    const footer = document.querySelector("footer");
    footer.style.cssText = "margin-top: 0 !important;";
  }

  componentWillUnmount() {
    // undo padding & margin changes
    const defaultContainer = document.querySelector(".main-container");
    defaultContainer.classList.add("container");

    const navbar = document.querySelector(".navbar");
    navbar.style.cssText = "";

    const footer = document.querySelector("footer");
    footer.style.cssText = "";
  }

  render() {
    return (
      <div id="splash-page" className="text-center">
        <div
          className="hero py-5"
          style={{ height: `${window.innerHeight * 0.7}px` }}
        >
          <div className="container h-100">
            <div className="row h-100 d-flex flex-column justify-content-around">
              <div className="text-light">
                <h2>
                  Cut costs and save the environment, one bottle at a time.
                </h2>
                <p>
                  The Web App that tracks materials that a user recycles, and
                  how much energy and resources they save.
                </p>
              </div>
              <div>
                <button
                  className="btn btn-success btn-lg w-50"
                  onClick={() => this.props.history.push("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pillars py-4">
          <div className="container">
            <div className="row">
              <div className="pillar py-3 col-md">
                <div className="pillar-icon my-3">
                  <i className="fas fa-chart-area fa-3x text-success" />
                </div>
                <div className="pillar-description">
                  <p className="text-secondary">
                    Renders dynamic UI and graphs so users can see the impact
                    they have on the environment at a glance
                  </p>
                </div>
              </div>
              <div className="pillar py-3 col-md">
                <div className="pillar-icon my-3">
                  <i className="fas fa-tree fa-3x text-success" />
                </div>
                <div className="pillar-description">
                  <p className="text-secondary">
                    Summary cards tell you how many resources (trees, oil, etc.)
                    you or your company saved this week/month/year.
                  </p>
                </div>
              </div>
              <div className="pillar py-3 col-md">
                <div className="pillar-icon my-3">
                  <i className="fas fa-brain fa-3x text-success" />
                </div>
                <div className="pillar-description">
                  <p className="text-secondary">
                    Make smarter choices when recycling by using your data and
                    our tips &amp; facts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="call-to-action text-md-left text-light py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <h3 className="mb-4">
                  See how much of an impact you can make today!
                </h3>
              </div>
              <div className="col-md-2 mr-auto">
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => this.props.history.push("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPage;
