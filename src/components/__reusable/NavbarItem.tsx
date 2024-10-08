import React from "react";
import { NavLink } from "react-router-dom";

interface NavbarItemProps {
  link: string;
  icon: React.ReactNode;
  label: string | null;
  replace?: boolean;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  link,
  icon,
  label,
  replace,
  onClick,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `block w-full p-1 my-2 rounded ${
          isActive ? "bg-[#E7E5E0] " : "bg-white"
        } hover:bg-[#E7E5E0] hover:`
      }
      onClick={onClick}
      reloadDocument={replace}
    >
      <div className="flex flex-row justify-start items-center space-x-3">
        <div className="w-8 h-8 lg:m-auto">{icon}</div>
        {label ? <h6 className="w-3/4 text-lg">{label}</h6> : <></>}
      </div>
    </NavLink>
  );
};

export default NavbarItem;
