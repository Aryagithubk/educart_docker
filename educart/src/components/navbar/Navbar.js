import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
  const { cart } = useContext(GlobalContext);
  return (
    <div className="navbar">
      <Link to="/">
        <h2>EduCart
        </h2>
      </Link>
      <ul className="navbar-ul">
        <Link to="/cart">
          <li>
            &#128722;{" "}
            <span className="card-count" style={{ color: "red" }}>
              ({cart.length})
            </span>
          </li>
        </Link>
        <Link to="/orders">
          <li>Orders</li>
        </Link>
        <button className="nav-btn">Hi, Krisha</button>
      </ul>
    </div>
  );
};

export default Navbar;
