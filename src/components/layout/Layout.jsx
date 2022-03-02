import React from "react";
import SideBar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import "./layout.css";
import Routes from "../Routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../../pages/Login/Login";

const Layout = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route
          render={(props) => (
            <div className="layout">
              <SideBar {...props} />
              <div className="layout__content">
              <TopNav/>
                <div className="layout__content-main">
                  <Routes />
                </div>
              </div>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout;
