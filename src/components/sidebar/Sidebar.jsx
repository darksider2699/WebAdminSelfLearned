import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import sidebar_item from "../../assets/JsonData/sidebar_routes.json";
import logo from "../../assets/images/mgm-group-Logo-2015.png";
const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const activeItem = sidebar_item.findIndex(
    (item) => item.route === props.location.pathname
  );
  return (
    <div className="sidebar">
       <div className="sidebar__logo">
      {  <img src={logo} alt="viet anh dep zai hihi"  className="image"/>}
      </div> 
      {sidebar_item.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
