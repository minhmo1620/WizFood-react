import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@ahaui/css/dist/index.min.css";
import { Form, Button } from "@ahaui/react";
import LoginHeader from "../Headers/LoginHeader";

import "./Login.css";

const Login = ({ postAuth }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    postAuth({ username, password });

    setUserName("");
    setPassword("");
  };

  return (
    <div>
      <LoginHeader />
      <Form onSubmit={handleSubmit}>
        <Form.Label className="u-text500 u-marginTopSmall">Login</Form.Label>
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
          <Button.Label>Login</Button.Label>
        </Button>
      </Form>
      <p></p>
      <div>
        <p className="u-marginTopSmall">Haven't registered ?</p>
        <Link to="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
