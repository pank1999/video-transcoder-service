import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faInstagram,
  faGithub,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="p-10 flex justify-center align-middle flex-col bg-pink-700">
      <div className=" text-center">
        <span>
          Made with love by{" "}
          <span className="text-white"> Pandas Codding School ( PCS )</span>{" "}
        </span>
      </div>
      <div className="flex justify-center align-middle mt-5">
        <a href="https://www.linkedin.com/in/pankaj-kumar-pandey/">
          <FontAwesomeIcon
            icon={faLinkedinIn}
            className="text-2xl mr-2 cursor-pointer"
          />
        </a>
        <a href="https://instagram.com/pankaj_developer.in">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-2xl  mr-2 cursor-pointer"
          />
        </a>
        <a href="https://github.com/pank1999">
          <FontAwesomeIcon
            icon={faGithub}
            className="text-2xl  mr-2 cursor-pointer"
          />
        </a>
        <a href="https://twitter.com/Pankajp56829682">
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-2xl  mr-2 cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
