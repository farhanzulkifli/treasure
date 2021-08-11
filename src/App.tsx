import React from "react";
import "./App.css";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/firstlayer/secondlayer/Dashboard";
import Register from "./components/Register";
import Tweets from "./components/firstlayer/secondlayer/Tweets";
import AboutUs from "./components/firstlayer/secondlayer/AboutUs";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/tweets" component={Tweets} />
          <Route path="/aboutus" component={AboutUs} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
