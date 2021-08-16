import React from "react";
import "./App.css";
import { Route, Redirect,Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Dashboard from "./components/Dashboard";
import Register from "./pages/Register";
// import Tweets from "./components/Tweets";
// import AboutUs from "./components/AboutUs";
// import RealMap from "./components/RealMap"; 
// import Messages from "./components/Messages";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          {/* <Route path="/tweets" component={Tweets} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/realmap" component={RealMap} />
          <Route path="/messages" component={Messages} /> */}
          <Redirect to="/" />
        </Switch>
    </div>
  );
}

export default App;
