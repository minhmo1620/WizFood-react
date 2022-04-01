import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Avatar } from "@ahaui/react";
import avatar from "../avatar.svg";

import MainHeader from "../components/Headers/MainHeader";

import "../custom.css";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function Home() {
  const [boxes, setBoxes] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch(`${SERVER_URL}/boxes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoxes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const goToBox = (box_id) => {
    history.push("/boxes/" + box_id);
  };

  return (
    <div>
      <MainHeader />
      <p></p>
      <div>
        <div>
          <div className="Grid u-marginBottomSmall">
            <div className="u-sizeFull lg:u-size8of12">
              <div
                className="u-backgroundPrimaryLight"
                style={{
                  width: "90%",
                  marginLeft: "10%",
                }}
              >
                <h4>Personal Information</h4>
                <div key="huge" className="u-inlineBlock u-marginCenterMedium">
                  <Avatar size="huge" src={avatar} />
                </div>
                <p className="u-textBold">{localStorage.getItem("username")}</p>
              </div>
            </div>
            <div className="u-sizeFull lg:u-size4of12 u-paddingLeftNone">
              <div className="u-flex u-flexColumn b-highlight u-marginBottomSmall">
                <div className="u-paddingExtraSmall b-highlight">
                  <Button className="u-backgroundAccentLight" onClick={() => history.push("/foods")}>
                    <Button.Label className="u-textCenter u-textBlack">
                      Add new food
                    </Button.Label>
                  </Button>
                </div>
                <div className="u-paddingExtraSmall b-highlight">
                  <Button className="u-backgroundAccentLight" onClick={() => history.push("/wizbox")}>
                    <Button.Label className="u-textCenter u-textBlack">
                      Create a new WizBox
                    </Button.Label>
                  </Button>
                </div>
                <div className="u-paddingExtraSmall b-highlight">
                  <Button className="u-backgroundAccentLight" onClick={() => history.push("/wizaid")}>
                    <Button.Label className="u-textCenter u-textBlack">
                      What should I eat today?
                    </Button.Label>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="u-sizeFull lg:u-size8of12 u-paddingLeftNone">
          <div
            className="u-backgroundPrimaryLight"
            style={{
              width: "90%",
              marginLeft: "10%",
            }}
          >
            <h4>Your WizBoxes</h4>
          </div>
          <div
            className="u-flex u-flexWrapReverse b-highlight"
            style={{
              marginLeft: "10%",
            }}
          >
            {boxes.map((box) => (
              <div key={box.id}>
                <div className="u-paddingExtraSmall b-highlight">
                  <Button className="u-backgroundAccentLight" onClick={() => goToBox(box.id)}>
                    <Button.Label className="u-textCenter u-textBlack">Box {box.id}</Button.Label>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
