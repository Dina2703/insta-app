import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div>
      <div
        className="flex items-center justify-between max-w-6xl
      "
      >
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png"
            className="object-contain"
            layout="fill"
            alt="logo"
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png"
            className="object-contain"
            layout="fill"
            alt="logo2"
          />
        </div>
        <h1>Right Side</h1>
      </div>
    </div>
  );
}

export default Header;
