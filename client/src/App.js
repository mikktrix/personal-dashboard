import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Todo from "./pages/todo";
import Investing from "./pages/investing";

import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppNavbar />
          <Container>
            <Switch>
              <Route exact path="/" component={Todo} />
              <Route exact path="/invest" component={Investing} />
            </Switch>
          </Container>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
