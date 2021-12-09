import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@ahaui/css/dist/index.min.css";
import { Form, Button } from "@ahaui/react";

import "./Login/Login.css";

const Signup = ({postUsers}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    postUsers({ username, password })

    setUserName('')
    setPassword('')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="Login-Text-custom">
          <Form.Input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="password" className="Login-Text-custom">
          <Form.Input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <Button.Label>Signup</Button.Label>
        </Button>
      </Form>
      <div>
        <p>Already registered ?</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
