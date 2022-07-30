import React from "react";

function Story({ user }) {
  const { username, img } = user;
  return (
    <div>
      <picture>
        <img
          src={img}
          alt="username"
          className="h-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
        />
      </picture>

      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}

export default Story;
