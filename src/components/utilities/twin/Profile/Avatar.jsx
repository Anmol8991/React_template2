import React, { useState } from "react";

const Avatar = ({ profile }) => {
  return (
    <img
      src={profile}
      alt="user-img"
      className="img-thumbnail rounded-circle w-100 h-100 rounded-circle p-1"
      style={{ backgroundColor: "#ffffff"}}
    />
  );
};
export default Avatar;
