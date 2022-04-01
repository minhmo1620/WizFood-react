import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Form, Button } from "@ahaui/react";

import MainHeader from "./Headers/MainHeader";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function VoteOptions(props) {
  const { box_id } = useParams();
  const [data, setData] = useState(null);
  const [voteData, setVoteData] = useState({});

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

  const VoteLabel = {
    0: `Happy ${emoji.Happy}`,
    1: `Neutral ${emoji.Neutral}`,
    2: `Maybe Not ${emoji.Sad}`,
  };

  // {
  //   data = {
  //     "votes": {
  //         1: 0,
  //         2: 1,
  //         3: 2,
  //         4: 1,
  //     }
  // }
  const [votes, setVotes] = useState({});
  // options: [
  //   {
  //     id: 1,
  //     name: 'minh',
  //     description: 'minh',
  //     vote: 0 => happy, 1 => neutral, 2 => sad
  //   }
  // ]`
  const [options, setOptions] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch(`${SERVER_URL}/boxes/${box_id}/vote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if ("data" in data) {
          setVoteData(data["data"]);
        }
      })
      .catch((err) => console.log(err));
  }, [box_id]);

  useEffect(() => {
    fetch(`${SERVER_URL}/boxes/${box_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));

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
        let votes = {};
        data.forEach((option) => {
          if (option.id in voteData) {
            votes[option.id] = voteData[option.id];
          } else {
            votes[option.id] = null;
          }
        });
        setVotes(votes);
      })
      .catch((err) => console.log(err));
  }, [box_id, voteData]);

  const submit = () => {
    fetch(`${SERVER_URL}/boxes/${box_id}/vote`, {
      method: JSON.stringify(voteData) === "{}" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify({ votes }),
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error("Vote Failed!");
        }
        return res.json();
      })
      .then((data) => {
        alert("Vote Successfully!");
        history.push("/boxes/" + box_id);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainHeader />
      <div className="Grid u-marginBottomSmall">
        <div className="u-sizeFull lg:u-size1of12"></div>
        <div className="u-sizeFull lg:u-size10of12">
          <div className="u-text800">Box ID: {data.id}</div>
          <div className="u-textLeft u-text300">{data.name}</div>
          <div className="u-textLeft u-text300">{data.description}</div>
          <div className="u-textLeft u-text500 u-marginTopSmall">Please vote for all options</div>
          <div className="u-flex u-flexColumn b-highlight u-marginBottomSmall">
            {options.map((option) => {
              return (
                <div key={option.id}>
                  <div className="u-fontBold">{option.name}</div>
                  <div>{option.description}</div>
                  <div className="u-flex u-flexRow b-highlight">
                    <div className="u-paddingExtraSmall b-highlight">
                      <Form.Check
                        value={0}
                        checked={votes[option.id] === 0}
                        onChange={() => {
                          console.log(option.id);
                          setVotes((prevOptions) => {
                            return {
                              ...prevOptions,
                              [option.id]: 0,
                            };
                          });
                        }}
                        type="radio"
                        label={VoteLabel[0]}
                        id={`radio-button-${0}-${option.id}`}
                      />
                    </div>

                    <div className="u-paddingExtraSmall b-highlight"></div>

                    <div className="u-paddingExtraSmall b-highlight">
                      <Form.Check
                        value={1}
                        checked={votes[option.id] === 1}
                        onChange={() => {
                          console.log(option.id);
                          setVotes((prevOptions) => {
                            return {
                              ...prevOptions,
                              [option.id]: 1,
                            };
                          });
                        }}
                        type="radio"
                        label={VoteLabel[1]}
                        id={`radio-button-${1}-${option.id}`}
                      />
                    </div>

                    <div className="u-paddingExtraSmall b-highlight"></div>

                    <div className="u-paddingExtraSmall b-highlight">
                      <Form.Check
                        value={2}
                        checked={votes[option.id] === 2}
                        onChange={() => {
                          console.log(option.id);
                          setVotes((prevOptions) => {
                            return {
                              ...prevOptions,
                              [option.id]: 2,
                            };
                          });
                        }}
                        type="radio"
                        label={VoteLabel[2]}
                        id={`radio-button-${2}-${option.id}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button onClick={submit} style={{ marginLeft: "10%" }}>
            Submit vote
          </Button>
        </div>
        <div className="u-sizeFull lg:u-size1of12"></div>
      </div>
    </div>
  );
}
