import React from "react";

function Story({ user }) {
  const { username, img } = user;
  return (
    <div>
      <picture>
        <img src={img} alt="username" />
      </picture>

      <p>{username}</p>
    </div>
  );
}

export default Story;
