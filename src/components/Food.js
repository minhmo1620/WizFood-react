import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "@ahaui/react";

import MainHeader from "../components/Headers/MainHeader";

import "../custom.css";

const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

export default function Food() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [preference, setPreference] = useState("");
  const [cookingMethod, setCookingMethod] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [vegeterian, setVegeterian] = useState("");
  const preferenceList = [
    "",
    "african",
    "americas",
    "asian",
    "european",
    "oceanic",
  ];
  const cookingMethodList = ["", "bake", "fry", "boil", "stew", "grill"];

  const history = useHistory();

  // Create a new box
  const createNewFood = async (body) => {
    console.log(body);
    fetch(`${SERVER_URL}/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(body),
    }).then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        alert("Added New Food Successfully!");
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewFood({
      name: name,
      preference: preference,
      cooking_method: cookingMethod,
      calories: parseInt(calories),
      ingredients: ingredients,
      vegeterian: true ? vegeterian === "yes" : false,
      origin: origin
    });

    setName("");
    setCalories("");
    setOrigin("");
    setPreference("");
    setCookingMethod("");
    setIngredients("");
  };

  return (
    <div>
      <MainHeader />
      <div>
        <h4>Add new food to your library</h4>
        <Form>
          <Form.Group controlId="name" className="Text-custom">
            <Form.Label>Food name</Form.Label>
            <Form.Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </Form.Group>

          <Form.Group controlId="preference" className="Text-custom">
            <Form.Label>Preference</Form.Label>
            <Form.Input
              type="text"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              placeholder="vietnam"
            />
            <Form.Select onChange={(e) => setPreference(e.target.value)}>
              {preferenceList.map((preferenceOption, index) => (
                <option
                  key={index}
                  label={preferenceOption}
                  value={preferenceOption}
                  name={`preference-${preferenceOption}`}
                />
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="origin" className="Text-custom">
            <Form.Label>Country origin</Form.Label>
            <Form.Input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="vietnam"
            />
          </Form.Group>

          <Form.Group controlId="vegeterian" className="Text-custom">
            <Form.Label>Vegeterian</Form.Label>
            <Form.Select onChange={(e) => setVegeterian(e.target.value)}>
              {["yes", "no"].map((booleanValue, index) => (
                <option
                  key={index}
                  label={booleanValue}
                  value={booleanValue}
                  name={`vegetarian-${booleanValue}`}
                />
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="cooking_method" className="Text-custom">
            <Form.Label>Cooking Method</Form.Label>
            <Form.Input
              type="text"
              value={cookingMethod}
              onChange={(e) => setCookingMethod(e.target.value)}
              placeholder="vietnam"
            />
            <Form.Select onChange={(e) => setCookingMethod(e.target.value)}>
              {cookingMethodList.map((methodOption, index) => (
                <option
                  key={index}
                  label={methodOption}
                  value={methodOption}
                  name={`cooking-${methodOption}`}
                />
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="calories" className="Text-custom">
            <Form.Label>Calories</Form.Label>
            <Form.Input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories of the food"
            />
          </Form.Group>

          <Form.Group controlId="ingredients" className="Text-custom">
            <Form.Label>Ingredients</Form.Label>
            <Form.Input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Please separate ingredients by comma"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            <Button.Label>Create</Button.Label>
          </Button>
        </Form>
      </div>
      <p></p>
    </div>
  );
}
