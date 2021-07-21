import React, { useState, useEffect } from "react";
import logout from "../actions/logout";
import { useUser } from "../contexts/userContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import Switches from "../components/ButtonSwitch";


const Header = () => {
  const { user, setUser } = useUser();
  const history = useHistory();

  const [theme, setTheme] = useState('');
  const [navTheme, setNavTheme] = useState('');
  const { toggle, toggleFunction } = React.useContext(ThemeContext);

  useEffect(() => {
    var temp = "";
    if (toggle) {
      temp = "dark-mode";
    } else {
      temp = "";
    }
    setTheme(temp);
  }, [toggle]);

  useEffect(() => {
    var temp = "";
    if (toggle) {
      temp = "navbar dark-mode";
    } else {
      temp = "navbar navbar-light bg-light";
    }
    setNavTheme(temp);
  }, [toggle]);
  

  const logOut = async () => {
    const { success } = await logout();
    if (success) setUser(null);
    else window.alert("Error, could not log out");
    history.push("/");
  };

  const renderHeader = () => {
    if (user) {
      return (
        <>
         <header className={theme} >
             <h3>Coding Dojo Exchange</h3>
             <div className="menu">
                 <Link className={theme} to="/">Dashboard</Link>
                 <Link to="/historial">Historial de Compras</Link>
             </div>
             <div className="menubuttons">
               <Switches />
             ¡Hola {user.firstName+'!'} &nbsp;{" "}
                <button onClick={logOut} className="btn-secondary">
                  Cerrar Sesion
                </button>
             </div>
         </header>
        </>
      );
    } else {
      return (
        <>
          <nav className={navTheme}>
            <div className="container-fluid">
              <span className="navbar-text">
                <Link to="/" className="nodecoration">
                  <h3>Coding Dojo Exchange</h3>
                </Link>
              </span>
              <span className="navbar-text">
                <Link to="/register">
                  <button className="btn-secondary m-1">Registrarse</button>
                </Link>
                <Link to="/login">
                  <button className="btn-primary">Iniciar Sesión</button>
                </Link>
              </span>
            </div>
          </nav>
        </>
      );
    }
  };

  return <div>{renderHeader()}</div>;
};

export default Header;
