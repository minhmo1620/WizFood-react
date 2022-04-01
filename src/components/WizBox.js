import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "@ahaui/react";

import MainHeader from "../components/Headers/MainHeader";

import "../custom.css";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function WizBox() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const goToBox = (box_id) => {
    history.push("/boxes/" + box_id);
  };

  return (
    <div>
      <MainHeader />
      <div className="Grid u-marginBottomSmall">
        <div className="u-sizeFull lg:u-size1of12"></div>
        <div className="u-sizeFull lg:u-size10of12">
          <h4 className="u-marginTopSmall">Create new WizBox</h4>
          <div className="u-paddingExtraSmall">
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
            <div className="u-flex u-flexWrap b-highlight u-marginBottomSmall">
              {boxes.map((box) => (
                <div key={box.id} className="u-paddingExtraSmall b-highlight">
                  <Button onClick={() => goToBox(box.id)}>Box {box.id}</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="u-sizeFull lg:u-size1of12"></div>
      </div>
      <div></div>
    </div>
  );
}
