import * as React from "react";
import { NavLink } from "react-router-dom";

function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <div className="navbar">
      
    <nav>
    <a href="/" className="brand-logo"> Lulu blog</a>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink
            to=""
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="blog"
            style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
          >
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
}
export default NavList