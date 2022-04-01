import React from "react";
import axios from "axios";
import { Button, BubbleChat, Avatar, Icon, Form } from "@ahaui/react";

import "./Message.css";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

class Message extends React.Component {
  state = {
    chat: [],
    // [
    //   { from: "cb", msag: {message:"Hi, I am Chatbot. How can I help you today?", options: [yes/no/not sure]} },
    //   {from: 'our', msag: 'Hi, I am Chatbot. How can I help you today?'},
    // ]
    msg: "",
  };

  componentDidMount() {
    this.newConversation();
  }

  newConversation = async () => {
    const res = await fetch(`${SERVER_URL}/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    const data = await res.json();

    this.setState({
      chat: [
        ...this.state.chat,
        {
          from: "cb",
          msag: {
            message: data.message,
            options: data.options,
          },
        },
      ],
    });
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ msg: e.target.value });
  };

  handleSend = (option) => {
    axios
      .put(
        `${SERVER_URL}/conversations`,
        {
          answer: option,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        let ch = this.state.chat;
        ch.push({ from: "our", msag: option });
        ch.push({
          from: "cb",
          msag: { message: res.data.message, options: res.data.options },
        });
        this.setState({ chat: ch, msg: "" });
        setTimeout(() => {
          document
            .getElementById("last-message")
            .scrollIntoView({ behavior: "smooth" });
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Back
        </Button>
        <div
          id="chatt"
          style={{ overflow: "scroll", overflowX: "hidden", height: "85vh" }}
        >
          <div></div>
          {this.state.chat.map((msg) => {
            if (msg.from === "cb") {
              return (
                <div
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginLeft: "20%",
                  }}
                >
                  <BubbleChat
                    text={msg.msag.message}
                    avatar={() => (
                      <Icon name="bot" size="medium" />
                    )}
                    type="outbound"
                    currentOption={0}
                    onSelectOption={this.handleSend}
                    options={msg.msag.options.map((option) => ({
                      id: option,
                      name: option,
                    }))}
                  />
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginRight: "20%",
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
        <div id="last-message"></div>
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
            onClick={() => this.handleSend(this.state.msg)}
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
