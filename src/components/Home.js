import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, SearchBox } from "@ahaui/react";

import { deleteTokens } from "../auth";

import "../custom.css";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [search, setSearch] = useState("");

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

  // Create a new box
  const createNewBox = async (body) => {
    console.log(body);
    fetch(`${SERVER_URL}/boxes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/boxes/" + data.id);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewBox({ name, description });

    setName("");
    setDescription("");
  };

  const handleLogOut = () => {
    deleteTokens();
  };

  const goToBox = (box_id) => {
    history.push("/boxes/" + box_id);
  };

  return (
    <div>
      <h3>Welcome {localStorage.getItem("username")}</h3>
      <div>
        <Button onClick={() => handleLogOut()}>Logout</Button>
        <Button
          onClick={() => {
            history.push("/about");
          }}
        >
          About
        </Button>
        <Button
          onClick={() => {
            history.push("/wizaid");
          }}
        >
          WizAId
        </Button>
      </div>
      <p></p>
      <div>
        <h4>Search the WizBox you want to go</h4>
        <SearchBox
          placeholder="Search by the box ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClickButton={() => goToBox(search)}
          className="SearchBox-custom"
        />
      </div>
      <p></p>
      <div>
        <h4>Create new WizBox</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="Text-custom">
            <Form.Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="WizBox's name"
            />
          </Form.Group>
          <Form.Group controlId="description" className="Text-custom">
            <Form.Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="WizBox's description"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            <Button.Label>Create</Button.Label>
          </Button>
        </Form>
      </div>
      <p></p>
      <div>
        <h4>Your WizBoxes</h4>
        {boxes.map((box) => (
          <div key={box.id}>
            <Button onClick={() => goToBox(box.id)}>Box {box.id}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
