import React from "react";
import { Route, Switch, Redirect  } from "react-router-dom";
import CheckInQuestion from "../pages/CheckInQuestion/CheckInQuestion";
import CovidTest from "../pages/CovidTest/CovidTest";
import Overview from "../pages/Overview/Overview";
import SituationsList from "../pages/SituationsList/SituationList";
import Checkout from "../pages/Checkout/Checkout";
import CovidInformation from "../pages/CovidInformation/CovidInformation";
import Account from "../pages/Account/Account";
  const Routes = () => {
    function isLoggedIn() {
     return !!localStorage.getItem('token')
     return true
   }
  return (
    <div>
      <Switch>
        <Route path="/checkin_status" component={Overview} />
        <Route path="/covid_test" component={CovidTest} />
        <Route path="/questions" component={CheckInQuestion} />
        <Route path="/situations_list" component={SituationsList} />
        <Route path="/checkout_status" component={Checkout}/>
        <Route path = "/covid_information" component={CovidInformation} />
        <Route path = "/account" component={Account} />
        <Route
                exact
                path="/"
                render={() => {
                    return (
                      isLoggedIn() ?
                      <Redirect to="/checkin_status" /> :
                      <Redirect to="/login" /> 
                    )
                }}
              />
      </Switch> 
    </div>
  );
};

export default Routes;
