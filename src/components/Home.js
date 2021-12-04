import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, SearchBox } from "@ahaui/react";

import { deleteTokens } from "../auth";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [search, setSearch] = useState('');

  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/boxes`, {
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
    fetch("http://localhost:5000/boxes", {
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
      <h3>Logged in as {localStorage.getItem("username")}</h3>
      <Button onClick={() => handleLogOut()}>Logout</Button>
      <Link to="/about">
        <Button>About</Button>
      </Link>
      <Link to="/wizaid">
        <Button>WizAId</Button>
      </Link>
      <SearchBox
        placeholder="Search by the box ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClickButton={() => goToBox(search)}
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event's name"
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event's description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <Button.Label>Create a new Wizbox</Button.Label>
        </Button>
      </Form>
      <p>Boxes</p>
      {boxes.map((box) => (
        <div key={box.id}>
          <Button onClick={() => goToBox(box.id)}>Box {box.id}</Button>
        </div>
      ))}
    </div>
  );
}
