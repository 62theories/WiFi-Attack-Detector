import React from "react"
import { withRouter } from "react-router-dom"
import firebase from "./config/firebase"
import axios from "axios"
import DatePicker from "react-datepicker"

class Navbar extends React.Component {
      state = {
            startDate: new Date(),
            endDate: new Date(),
      }
      render() {
            return (
                  <>
                        <nav
                              className="navbar navbar-expand-lg navbar-light"
                              style={{ backgroundColor: "#f0f0f0" }}
                        >
                              <a
                                    className="navbar-brand"
                                    href="#"
                                    onClick={(e) => {
                                          e.preventDefault()
                                          this.props.history.push("/")
                                    }}
                              >
                                    Wifi Attack Detector
                              </a>
                              <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                              >
                                    <span className="navbar-toggler-icon" />
                              </button>
                              <div
                                    className="collapse navbar-collapse"
                                    id="navbarSupportedContent"
                              >
                                    <ul className="navbar-nav mr-auto">
                                          <li class="nav-item">
                                                <a
                                                      class="nav-link"
                                                      href="#"
                                                      onClick={(e) => {
                                                            e.preventDefault()
                                                            this.props.history.push(
                                                                  "/device"
                                                            )
                                                      }}
                                                >
                                                      Device
                                                </a>
                                          </li>
                                          <li class="nav-item">
                                                <a
                                                      class="nav-link"
                                                      href="#"
                                                      onClick={(e) => {
                                                            e.preventDefault()
                                                            this.props.history.push(
                                                                  "/line"
                                                            )
                                                      }}
                                                >
                                                      Line Setting
                                                </a>
                                          </li>
                                          <li class="nav-item">
                                                <a
                                                      class="nav-link"
                                                      href="#"
                                                      onClick={(e) => {
                                                            e.preventDefault()
                                                            this.props.history.push(
                                                                  "/stat"
                                                            )
                                                      }}
                                                >
                                                      Statistic
                                                </a>
                                          </li>
                                    </ul>
                                    <button
                                          type="button"
                                          className="btn btn-outline-success my-2 my-sm-0 mx-2"
                                          data-toggle="modal"
                                          data-target="#exampleModal"
                                    >
                                          Export data
                                    </button>
                                    <button
                                          className="btn btn-outline-danger my-2 my-sm-0"
                                          type="button"
                                          onClick={() => {
                                                Promise.all([
                                                      firebase
                                                            .database()
                                                            .ref("/deauth")
                                                            .remove(),
                                                      firebase
                                                            .database()
                                                            .ref("/probe")
                                                            .remove(),
                                                      firebase
                                                            .database()
                                                            .ref("/beacon")
                                                            .remove(),
                                                      firebase
                                                            .database()
                                                            .ref("/mac")
                                                            .remove(),
                                                      firebase
                                                            .database()
                                                            .ref(
                                                                  "/notification"
                                                            )
                                                            .remove(),
                                                ]).then(() =>
                                                      window.location.reload()
                                                )
                                          }}
                                    >
                                          Reset
                                    </button>
                              </div>
                        </nav>
                        <div>
                              {/* Modal */}
                              <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                              >
                                    <div
                                          className="modal-dialog"
                                          role="document"
                                    >
                                          <div className="modal-content">
                                                <div className="modal-header">
                                                      <h5
                                                            className="modal-title"
                                                            id="exampleModalLabel"
                                                      >
                                                            Export data
                                                      </h5>
                                                      <button
                                                            type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close"
                                                      >
                                                            <span aria-hidden="true">
                                                                  ×
                                                            </span>
                                                      </button>
                                                </div>
                                                <div className="modal-body">
                                                      <div className="row">
                                                            <div className="col-sm">
                                                                  <label>
                                                                        start
                                                                        date :
                                                                  </label>
                                                            </div>
                                                            <div className="col-sm">
                                                                  <DatePicker
                                                                        selected={
                                                                              this
                                                                                    .state
                                                                                    .startDate
                                                                        }
                                                                        onChange={(
                                                                              date
                                                                        ) =>
                                                                              this.setState(
                                                                                    {
                                                                                          startDate: date,
                                                                                    }
                                                                              )
                                                                        }
                                                                        selectsStart
                                                                        startDate={
                                                                              this
                                                                                    .state
                                                                                    .startDate
                                                                        }
                                                                        endDate={
                                                                              this
                                                                                    .state
                                                                                    .endDate
                                                                        }
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className="row">
                                                            <div className="col-sm">
                                                                  <label>
                                                                        end date
                                                                        :
                                                                  </label>
                                                            </div>
                                                            <div className="col-sm">
                                                                  <DatePicker
                                                                        selected={
                                                                              this
                                                                                    .state
                                                                                    .endDate
                                                                        }
                                                                        onChange={(
                                                                              date
                                                                        ) =>
                                                                              this.setState(
                                                                                    {
                                                                                          endDate: date,
                                                                                    }
                                                                              )
                                                                        }
                                                                        selectsEnd
                                                                        startDate={
                                                                              this
                                                                                    .state
                                                                                    .startDate
                                                                        }
                                                                        endDate={
                                                                              this
                                                                                    .state
                                                                                    .endDate
                                                                        }
                                                                        minDate={
                                                                              this
                                                                                    .state
                                                                                    .startDate
                                                                        }
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="modal-footer">
                                                      <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-dismiss="modal"
                                                      >
                                                            Close
                                                      </button>
                                                      <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                  axios({
                                                                        url: `http://157.230.39.47:5000/test`,
                                                                        method:
                                                                              "POST",
                                                                        data: {
                                                                              startDate: this
                                                                                    .state
                                                                                    .startDate,
                                                                              endDate: this
                                                                                    .state
                                                                                    .endDate,
                                                                        },
                                                                        responseType:
                                                                              "blob", // important
                                                                        headers: {
                                                                              "Content-Type":
                                                                                    "application/json",
                                                                        },
                                                                  }).then(
                                                                        (
                                                                              response
                                                                        ) => {
                                                                              const url = window.URL.createObjectURL(
                                                                                    new Blob(
                                                                                          [
                                                                                                response.data,
                                                                                          ]
                                                                                    )
                                                                              )
                                                                              const link = document.createElement(
                                                                                    "a"
                                                                              )
                                                                              link.href = url
                                                                              link.setAttribute(
                                                                                    "download",
                                                                                    "report.xlsx"
                                                                              ) //or any other extension
                                                                              document.body.appendChild(
                                                                                    link
                                                                              )
                                                                              link.click()
                                                                        }
                                                                  )
                                                            }}
                                                            data-dismiss="modal"
                                                      >
                                                            Download
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </>
            )
      }
}

export default withRouter(Navbar)
