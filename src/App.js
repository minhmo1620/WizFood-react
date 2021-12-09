import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login/Login";
import Message from "./components/Message/Message";
import Home from "./components/Home";
import Box from "./components/Box";
import CreateOption from "./components/CreateOption";
import VoteOptions from "./components/VoteOptions";
import { isLoggedIn } from "./auth.js";
import Logout from "./components/Logout";

const About = () => <h3>Logged in as {localStorage.getItem("username")}</h3>;

export function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  // Signup
  const signup = async (body) => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error("Register Failed!");
        }
        return res.json();
      })
      .then((data) => {
        alert("Signup Successfully!");
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  // Login
  const login = async (body) => {
    console.log(body);
    fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error("Login Failed!");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username);

        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  if (loggedIn) {
    return (
      <Router>
        <Switch>
          <Route exact path="/boxes/:box_id/vote" component={VoteOptions} />
          <Route exact path="/boxes/:box_id/create" component={CreateOption} />
          <Route exact path="/boxes/:box_id" component={Box} />
          <Route exact path="/" component={Home} />
          <Route exact path="/wizaid" component={Message} />
          <Route exact path="/about" component={About} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup">
            <Signup postUsers={signup} />
          </Route>
          <Route exact path="/login">
            <Login postAuth={login} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
