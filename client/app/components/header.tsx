import Image from "next/image";
import React from "react";
import Button from "./button";

const Header = () => {
  const handleClick = () => {
    console.log("I clicked");
  };
  return (
    <div className="shadow-xl sticky top-0 bg-white p-2">
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className=""
      >
        <div>
          <Image
            src="/images/logo1.png"
            style={{ height: "70px", width: "120px" }}
            height={50}
            width={150}
            alt="logo"
          />
        </div>
        <div className="">
          <Button label="Dashboard" solid onSubmit={handleClick()} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
