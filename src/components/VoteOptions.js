import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Form, Button } from "@ahaui/react";

const VoteLabel = {
  0: "Happy",
  1: "Neutral",
  2: "Sad",
};

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function VoteOptions(props) {
  const { box_id } = useParams();
  const [data, setData] = useState(null);
  const [voteData, setVoteData] = useState({});

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
          setVoteData(data['data']);
        }
      })
      .catch((err) => console.log(err));
  }, [box_id])

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
      method: "POST",
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
      <Button
        onClick={() => {
          history.push(`/boxes/${box_id}`);
        }}
      >
        Back
      </Button>
      <h2>Box ID: {data.id}</h2>
      <h3>Name: {data.name}</h3>
      <h4>Description: {data.description}</h4>
      <h5>Please vote for all options</h5>
      {options.map((option) => {
        return (
          <div key={option.id}>
            <p></p>
            <div>ID: {option.id}</div>
            <div>Name: {option.name}</div>
            <div>Description: {option.description}</div>

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
        );
      })}
      <Button onClick={submit}>Submit vote</Button>
    </div>
  );
}
