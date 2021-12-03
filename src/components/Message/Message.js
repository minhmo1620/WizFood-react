import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, BubbleChat, Avatar } from "@ahaui/react";

import "./Message.css";

class Message extends React.Component {
  state = {
    chat: [],
    msg: "",
  };
  beginning = "Please click Start button to talk to WizAId";
  started = false;
  username = localStorage.getItem("username");

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
          username: this.username,
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
          onClick={() => this.newConversation({ username: this.username })}
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
          className="btn btn-primary"
        >
          Start
        </Button>
      );
    }
    return (
      <div>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <div
          id="chatt"
          style={{ overflow: "scroll", overflowX: "hidden", height: "85vh" }}
        >
          <div>
            {button}
            <div
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                marginLeft: "500px",
              }}
            >
              <BubbleChat
                text={this.beginning}
                avatar={() => (
                  <Avatar
                    size="small"
                    className="u-backgroundPrimary u-textWhite u-text100"
                    text="EC"
                  />
                )}
                type="system"
                className="BubbleChat-customChatbot"
              />
            </div>
          </div>
          {this.state.chat.map((msg) => {
            if (msg.from === "cb") {
              return (
                <div
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginLeft: "500px",
                  }}
                >
                  <BubbleChat
                    text={msg.msag}
                    avatar={() => (
                      <Avatar
                        size="small"
                        className="u-backgroundPrimary u-textWhite u-text100"
                        text="EC"
                      />
                    )}
                    type="system"
                    className="BubbleChat-customChatbot"
                  />
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginRight: "500px",
                  }}
                >
                  <BubbleChat
                    text={msg.msag}
                    type="inbound"
                    className="BubbleChat-customUser"
                  />
                </div>
              );
            }
          })}
        </div>
        <div style={{ height: "2vh" }}>
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
