import React, { useState, useEffect } from "react";
import "./topnav.css";
import Dropdown from "../dropdown/Dropdown";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core/";
import { logout } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
    history.push("/login");
  };
  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "10px 0 20px 0px " }}
            name="add"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
