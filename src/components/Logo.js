import React from "react";
import Image from "../static/images/logo.png";

const Logo = (props) => {
  return <img alt="Logo" src={Image} {...props} />;
};

export default Logo;
