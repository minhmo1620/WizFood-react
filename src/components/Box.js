import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Button } from "@ahaui/react";

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
  }
  Object.entries(emoji).map(([key, value]) => {
    const e = value.match(regex)[0];
    value = e;
    return emoji;
  });

  useEffect(() => {
    fetch(`http://localhost:5000/boxes/${box_id}`, {
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

    fetch(`http://localhost:5000/boxes/${box_id}/options`, {
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
      <div>
        <Button
          onClick={() => {
            history.push("/");
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            history.push(`/boxes/${box_id}/create`);
          }}
        >
          Add
        </Button>
        <Button
          onClick={() => {
            history.push(`/boxes/${box_id}/vote`);
          }}
        >
          Vote
        </Button>
      </div>
      <h2>Box ID: {data.id}</h2>
      <h3>Name: {data.name}</h3>
      <h4>Description: {data.description}</h4>
      <h5>Available options</h5>
      {options.map((option) => (
        <div key={option.id}>
          <p></p>
          <div>Option's ID: {option.id}</div>
          <div>Name: {option.name}</div>
          <div>Description: {option.description}</div>
          <div>
            {" "}
            {emoji.Happy} : {option.vote[0]}/{sum_votes[option.id]}
          </div>
          <div>
            {" "}
            {emoji.Neutral} : {option.vote[1]}/{sum_votes[option.id]}
          </div>
          <div>
            {" "}
            {emoji.Sad} : {option.vote[2]}/{sum_votes[option.id]}
          </div>
        </div>
      ))}
    </div>
  );
}
