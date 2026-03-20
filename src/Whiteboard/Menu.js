import React from "react";
import rectangleIcon from "../resources/icons/rectangle.svg";
import { toolTypes } from "../constants"; 

const IconButton = ({ src, type }) => {
  return (
    <button className="menu_button">
      <img width="80%" height="80%" src={src} />
    </button>
  );
};

const Menu = () => {
  return (
    <div className="menu_container">
      <IconButton src={rectangleIcon} type={toolTypes.RECTANGLE} />
    </div>
  );
};

export default Menu;
