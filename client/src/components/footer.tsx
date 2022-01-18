import React from "react";
import MenuItem from "./menu-item";
import LogoutButton from "../containers/logout-button";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";

export default function Footer() {
  return (
    <footer className="shrink-0 fixed bg-slate-500 text-cyan-800 bottom-0 w-full p-5">
      <div className="flex items-center my-0 mx-auto">
        <MenuItem to="/">
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem to="/cart">
          <CartIcon />
          Cart
        </MenuItem>
        <MenuItem to="/profile">
          <ProfileIcon />
          Profile
        </MenuItem>
        <LogoutButton />
      </div>
    </footer>
  );
}
