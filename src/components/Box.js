import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Button, Icon } from "@ahaui/react";
import MainHeader from "./Headers/MainHeader";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function Box(props) {
  const { box_id } = useParams();
  const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);
  const [sum_votes, setSumVotes] = useState([]);
  const history = useHistory();

  const emojiRegex = require("emoji-regex");
  const regex = emojiRegex();
  const emoji = {
    Happy: `\u{1F600}`,
    Neutral: `\u{1F610}`,
    Sad: `\u{1F914}`,
  };
  Object.entries(emoji).map(([key, value]) => {
    const e = value.match(regex)[0];
    value = e;
    return emoji;
  });

  useEffect(() => {
    fetch(`${SERVER_URL}/boxes/${box_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error("Can't find the box");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        window.location.replace("/");
      });

    fetch(`${SERVER_URL}/boxes/${box_id}/options`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        let sum_votes = {};
        data.forEach((option) => {
          sum_votes[option.id] =
            option.vote[0] + option.vote[1] + option.vote[2];
        });
        setSumVotes(sum_votes);
      })
      .catch((err) => console.log(err));
  }, [box_id]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainHeader />
      <div className="Grid u-marginBottomSmall">
        <div className="u-sizeFull lg:u-size1of12"></div>
        <div className="u-sizeFull lg:u-size10of12">
          <div className="u-flex u-flexRow b-highlight u-marginBottomSmall">
            <div className="u-paddingExtraSmall b-highlight">
              <div className="u-text800">Box ID: {data.id}</div>
            </div>
            <div className="u-paddingExtraSmall b-highlight"></div>
            <div
              className="u-paddingExtraSmall b-highlight"
              style={{ marginLeft: "20%" }}
            >
              <Button
                onClick={() => {
                  history.push(`/boxes/${box_id}/create`);
                }}
                className="u-backgroundAccentLight"
              >
                <Icon name="plus" size="small" className="u-textPrimary" />
                <Button.Label className="u-paddingExtraSmall u-textCenter u-textBlack">
                  Add new restaurant
                </Button.Label>
              </Button>
            </div>
            <div
              className="u-paddingExtraSmall b-highlight"
              style={{ marginLeft: "7%" }}
            >
              <Button
                onClick={() => {
                  history.push(`/boxes/${box_id}/vote`);
                }}
                className="u-backgroundAccentLight"
              >
                <Icon name="checkmark" size="small" className="u-textPrimary" />
                <Button.Label className="u-paddingExtraSmall u-textCenter u-textBlack">
                  Vote
                </Button.Label>
              </Button>
            </div>
          </div>
          <div className="u-textLeft u-text300">{data.name}</div>
          <div className="u-textLeft u-text300">{data.description}</div>
          <div className="u-text500 u-marginTopSmall">Available options</div>
          <div className="u-flex u-flexColumn b-highlight u-marginBottomSmall">
            {options.map((option) => (
              <div key={option.id} className="u-paddingExtraSmall b-highlight">
                <div>Name: {option.name}</div>
                <div>Description: {option.description}</div>
                <div className="u-flex u-flexRow b-highlight">
                  <div
                    key={option.id}
                    className="u-paddingExtraSmall b-highlight"
                  >
                    {emoji.Happy} : {option.vote[0]}/{sum_votes[option.id]}
                  </div>

                  <div className="u-paddingExtraSmall b-highlight"></div>

                  <div
                    key={option.id}
                    className="u-paddingExtraSmall b-highlight"
                  >
                    {emoji.Neutral} : {option.vote[1]}/{sum_votes[option.id]}
                  </div>

                  <div className="u-paddingExtraSmall b-highlight"></div>

                  <div
                    key={option.id}
                    className="u-paddingExtraSmall b-highlight"
                  >
                    {emoji.Sad} : {option.vote[2]}/{sum_votes[option.id]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="u-sizeFull lg:u-size1of12"></div>
      </div>
    </div>
  );
}
