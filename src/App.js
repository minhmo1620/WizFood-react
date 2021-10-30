import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Message from "./components/Message/Message";

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
    const res = await fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Router>
      <div className="App">
        <Route exact path="/signup">
          <Signup postUsers={signup} />
        </Route>
        <Route exact path="/login">
          <Login postAuth={login} />
        </Route>
        <Route exact path='/wizaid'>
          <Message />
        </Route>
      </div>
    </Router>
  );
}

export default App;
