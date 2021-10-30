import React from "react";
import axios from "axios";
import { Form, Button, ChatBox, BubbleChat, Avatar } from "@ahaui/react";
import Chatbot from "react-chatbot-kit";
import "./Message.css";

class Message extends React.Component {
  state = {
    chat: [],
    msg: "",
  };
  beginning = "Please click Start button to talk to WizAId";
  started = false;

  newConversation = async (body) => {
    const res = await fetch("http://localhost:5000/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    this.started = true;
    this.beginning = data.message;
    this.forceUpdate();
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ msg: e.target.value });
  };
  handleSend = () => {
    if (this.state.msg !== "") {
      console.log(this.state.msg);
      axios
        .put("http://127.0.0.1:5000/conversations", {
          answer: this.state.msg,
          username: "minh",
        })
        .then((res) => {
          console.log(res);
          let ch = this.state.chat;
          ch.push({ from: "our", msag: this.state.msg });
          ch.push({ from: "cb", msag: res.data.message });
          this.setState({ chat: ch, msg: "" });
          console.log(this.state);
        })
        .catch((err) => {
          console.log(err);
        });

      this.forceUpdate();
    }
    let interval = window.setInterval(function () {
      var elem = document.getElementById("chatt");
      elem.scrollTop = elem.scrollHeight;
      window.clearInterval(interval);
    }, 5000);
  };
  render() {
    const started = this.started;
    let button;
    if (!started) {
      button = (
        <Button
          onClick={() => this.newConversation({ username: "minh" })}
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
          className="btn btn-primary"
        >
          Start
        </Button>
      );
    }
    return (
      <div>
        <div
          id="chatt"
          style={{ overflow: "scroll", overflowX: "hidden", height: "85vh" }}
        >
          <div>
            {button}
            <div
              style={{
                // flexWrap: "wrap",
                marginBottom: "20px",
                marginTop: "20px",
                marginLeft: "500px",
                // padding: "30px",
                // paddingBottom: "20px",
                // float: "left",
                // backgroundColor: "#F1F6FF",
                // width: '100%',
              }}
            >
              <BubbleChat
                text={this.beginning} className="BubbleChat-customerUser"
                avatar={() => (
                  <Avatar
                    size="small"
                    className="u-backgroundPrimary u-textWhite u-text100"
                    text="EC"
                  />
                )}
                type="system"
              />
            </div>
          </div>
          {this.state.chat.map((msg) => {
            if (msg.from === "cb") {
              return (
                <div
                  style={{
                    // flexWrap: "wrap",
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginLeft: "500px",
                    // padding: "30px",
                    // paddingBottom: "20px",
                    // float: "left",
                    // backgroundColor: "#F1F6FF",
                    // width: '100%',
                  }}
                >
                  <BubbleChat
                    text={msg.msag} className="BubbleChat-customerUser"
                    avatar={() => (
                      <Avatar
                        size="small"
                        className="u-backgroundPrimary u-textWhite u-text100"
                        text="EC"
                      />
                    )}
                    type="system"
                  />
                </div>
              );
            } else {
              return (
                // <div
                //   style={{
                //     flexWrap: "wrap",
                //     fontSize: "20px",
                //     fontFamily: "Lato",
                //     marginBottom: "10px",
                //     borderRadius: "100px",
                //     marginLeft: "500px",
                //     padding: "30px",
                //     paddingBottom: "20px",
                //     width: "30%",
                //     backgroundColor: "#F1F6FF",
                //     float: "right",
                //     display: "block",
                //     color: "black",
                //   }}
                // >
                //   {msg.msag}
                // </div>
                <div
                  style={{
                    // flexWrap: "wrap",
                    // marginBottom: "10px",
                    // marginRight: "500px",
                    // padding: "30px",
                    // paddingBottom: "20px",
                    // float: "right",
                    // backgroundColor: "#F1F6FF",
                    // width: '30%',
                    // position: "absolute",
                    // left: "auto",
                    // right: "0",
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginRight: "500px",
                  }}
                >
                  <BubbleChat text={msg.msag} type="inbound" className="BubbleChat-customerUser"/>
                </div>
              );
            }
          })}
        </div>
        <div style={{ height: "2vh" }}>
          {/* <input
            type="text"
            name="msg"
            onChange={(e) => this.handleChange(e)}
            className="form-control"
            style={{ marginLeft: "150px", width: "80%", float: "left" }}
            value={this.state.msg}
          /> */}
          <Form.Group controlId="chat">
            <Form.Input
              type="text"
              name="msg"
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              style={{ marginLeft: "150px", width: "80%", float: "left" }}
              value={this.state.msg}
            />
          </Form.Group>
          <Button
            onClick={() => this.handleSend()}
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
            className="btn btn-primary"
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
}
export default Message;
