import "./App.css";
import "@ahaui/css/dist/index.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Chatbot from "react-chatbot-kit";

import Signup from "./components/Signup";
import Login from "./components/Login";
import ActionProvider from "./components/ActionProvider";
import MessageParser from "./components/MessageParser";
import config from "./config"
import Message from "./components/Message";

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
        <Route exact path="/wizaid">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </Route>
        <Route exact path='/test'>
          <Message />
        </Route>
      </div>
    </Router>
  );
}

export default App;
