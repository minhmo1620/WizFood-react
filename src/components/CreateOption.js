import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { Form, Button } from "@ahaui/react";

import MainHeader from "./Headers/MainHeader";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function CreateOption() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { box_id } = useParams();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name,
      description,
    };

    fetch(`${SERVER_URL}/boxes/${box_id}/options`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error("Cannot create option");
        }
        return res.json();
      })
      .then((data) => {
        history.push("/boxes/" + box_id);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <MainHeader />
      <div>
        <Form
          onSubmit={handleSubmit}
          style={{ marginLeft: "30%", marginTop: "2%" }}
        >
          <Form.Group controlId="option_name" className="Text-custom">
            <Form.Label className="u-fontMedium">Name</Form.Label>
            <Form.Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Restaurant's name"
            />
          </Form.Group>
          <Form.Group controlId="option_description" className="Text-custom">
            <Form.Label className="u-fontMedium">Description</Form.Label>
            <Form.Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginLeft: "8%" }}>
            <Button.Label>Add new recommendation</Button.Label>
          </Button>
        </Form>
      </div>
    </div>
  );
}
