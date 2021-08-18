import React from "react";
import "./App.css";
import { Route, Redirect,Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import CreateProfile from "./components/CreateProfile";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/createprofile" component={CreateProfile} />
          <Redirect to="/" />
        </Switch>
    </div>
  );
}

export default App;
