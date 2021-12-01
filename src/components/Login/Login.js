import React, { useState } from "react";
import "@ahaui/css/dist/index.min.css";
import { Form, Button } from "@ahaui/react";

const Login = ({postAuth}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    postAuth({ username, password })

    setUserName('')
    setPassword('')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="password">
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
    </div>
  );
};

export default Login;
