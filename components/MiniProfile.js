import React from "react";

function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 -scroll-ml-10">
      <picture>
        <img
          className="h-16 rounded-full border p-[2px]"
          src="./avatar.jpeg"
          alt="avatar"
        />
      </picture>
      <div className="flex-1 ml-4">
        <h2 className="font-bold">text</h2>
        <h3 className="text-sm text-gray-400">Welcome to insta</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm">Sign out</button>
    </div>
  );
}

export default MiniProfile;
