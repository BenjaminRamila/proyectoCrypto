import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./contexts/userContext";
import All from "./views/All";
import Header from "./views/Header";
import Historial from "./views/Historial";
import Login from "./views/Login";
import Main from "./views/Main";
import Register from "./views/Register";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { toggle } = React.useContext(ThemeContext);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    var temp = "";
    if (toggle) {
      temp = "dark-mode";
    } else {
      temp = "";
    }
    setTheme(temp);
  }, [toggle]);
  console.log({ toggle });
  return (
    <div className="App" className={theme}>
      <UserProvider>
        <Router>
          <Header />

          <Switch>
            <Route path="/login">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <Login />
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
            </Route>
            <Route path="/register">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <Register />
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
            </Route>
            <Route path="/all">
              <All />
            </Route>
            <Route path="/historial">
              <Historial />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
