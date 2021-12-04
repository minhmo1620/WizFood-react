import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Button } from "@ahaui/react";

export default function Box(props) {
  const { box_id } = useParams();
  const [data, setData] = useState(null);
  const [options, setOptions] = useState([]);
  const [sum_votes, setSumVotes] = useState([]);
  const history = useHistory();

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
        history.push('/');
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
      <h2>{data.id}</h2>
      <p>{data.name}</p>
      <p>{data.description}</p>
      <p>Options</p>
      {options.map((option) => (
        <div key={option.id}>
          <div>ID: {option.id}</div>
          <div>Name: {option.name}</div>
          <div>Description: {option.description}</div>
          <div>
            {" "}
            Happy: {option.vote[0]}/{sum_votes[option.id]}
          </div>
          <div>
            {" "}
            Neutral: {option.vote[1]}/{sum_votes[option.id]}
          </div>
          <div>
            {" "}
            Sad: {option.vote[2]}/{sum_votes[option.id]}
          </div>
        </div>
      ))}
    </div>
  );
}
