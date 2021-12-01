import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login/Login";
import Message from "./components/Message/Message";
import Home from "./components/Home"
import { PrivateRoute } from "./PrivateRoute.jsx";
import {isLoggedIn} from './auth.js';

// const Home = ()=> <h3>Logged in as {localStorage.getItem("username")}</h3>

function App() {
  // Signup
  const signup = async (body) => {
    console.log(body);
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);
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
    }).then(res => res.json())
    .then(data=>{
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('username', data.username);

      if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
        window.location.replace("/")
      } else{
          alert(data.error);
      }
    }).catch(err => console.log(err));;
  };

  return (
    <Router>
      <div className="App">
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/" component={Home} />
        <Route exact path="/signup">
          <Signup postUsers={signup} />
        </Route>
        <Route exact path="/login">
          <Login postAuth={login} />
        </Route>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/wizaid" component={Message} />
      </div>
    </Router>
  );
}

export default App;
