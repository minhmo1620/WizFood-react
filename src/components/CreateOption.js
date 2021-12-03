import React from "react";
import { useParams, useHistory } from "react-router";
import { Form, Button } from "@ahaui/react";

function CreateOption() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const { box_id } = useParams();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name,
      description,
    };

    fetch(`http://localhost:5000/boxes/${box_id}/options`, {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="option_name">
        <Form.Label>Name</Form.Label>
        <Form.Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Option's name"
        />
      </Form.Group>
      <Form.Group controlId="option_description">
        <Form.Label>Description</Form.Label>
        <Form.Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Option's description"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        <Button.Label>Create a new option</Button.Label>
      </Button>
    </Form>
  );
}

export default CreateOption;
