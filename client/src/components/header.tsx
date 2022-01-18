import React from "react";

import dog1 from "../assets/images/dog-1.png";
import dog2 from "../assets/images/dog-2.png";
import dog3 from "../assets/images/dog-3.png";

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;

function pickAvatarByEmail(email: string) {
  const charCode = email.toLowerCase().charCodeAt(0) - offset;
  const percentile = Math.max(0, Math.min(max, charCode)) / max;
  return avatars[Math.round(maxIndex * percentile)];
}

interface HeaderProps {
  image?: string | any;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ image, children = "Explorer: " }) => {
  const email = atob(localStorage.getItem("token") as string);
  const avatar = image || pickAvatarByEmail(email);

  return (
    <div className="sticky top-6 h-24 flex items-center mt-1 ml-5 ">
      <img
        className="h-24 mr-5 rounded-full max-h-min max-w-min"
        src={avatar}
        alt="Explorer Avatar"
      />
      <div>
        <h2>{children}</h2>
        <h5 className="mt-3 text-cyan-500">{email}</h5>
      </div>
    </div>
  );
};

export default Header;
