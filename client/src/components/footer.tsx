import MenuItem from "./menu-item";
import LogoutButton from "../containers/logout-button";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CartIcon } from "../assets/icons/cart.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white text-slate-800 sticky">
      <div className="flex items-center mx-auto max-w-xs p-2">
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
