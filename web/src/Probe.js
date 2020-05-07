import React from "react"
import firebase from "./config/firebase"
import Card from "./Card"
import _ from "lodash"
import moment from "moment"

export default class Deauth extends React.Component {
      state = {
            graphProbe: [],
            conditionProbe: false,
            attackNameProbe: "PROBE ATTACK",
            countProbe: 0,
            lastestProbe: "",
            handleInputProbe: ({ target }) => {
                  this.setState({
                        inputProbe: target.value,
                  })
            },
            handleSubmitProbe: () => {
                  if (this.state.inputProbe > -1) {
                        this.setState({
                              specProbe: +this.state.inputProbe,
                        })
                  } else {
                        this.setState({
                              conditionProbe: false,
                              countProbe: 0,
                              lastestProbe: "",
                        })
                  }
            },
            specProbe: 5,
            inputProbe: 5,
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async (snapshot) => {
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countProbe: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionProbe: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionProbe: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionProbe: false,
                                          countProbe: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphProbe: _.values(
                                                snapshot.val()
                                          ).map((item) => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm"),
                                                }
                                          }),
                                    })
                              } else {
                                    this.setState({
                                          graphProbe: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestProbe: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestProbe: "",
                                    })
                              }
                        })
            })
      }
      componentDidUpdate = (prevProps, prevState) => {
            if (prevState.specProbe !== this.state.specProbe) {
                  console.log("what")
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countProbe: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionProbe: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionProbe: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionProbe: false,
                                          countProbe: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphProbe: _.values(
                                                snapshot.val()
                                          ).map((item) => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm"),
                                                }
                                          }),
                                    })
                              } else {
                                    this.setState({
                                          graphProbe: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestProbe: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestProbe: "",
                                    })
                              }
                        })
            }
      }
      render() {
            return (
                  <Card
                        graph={this.state.graphProbe}
                        condition={this.state.conditionProbe}
                        attackName={this.state.attackNameProbe}
                        count={this.state.countProbe}
                        lastest={this.state.lastestProbe}
                        handleInput={this.state.handleInputProbe}
                        handleSubmit={this.state.handleSubmitProbe}
                        spec={this.state.specProbe}
                        input={this.state.inputProbe}
                  />
            )
      }
}
