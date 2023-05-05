import { GoEyeClosed, GoEye } from "react-icons/go";
import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
export default function NavLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const [navAnim, setNavAnim] = useState("");

  function openNav() {
    navOpen
      ? [setNavAnim("navClose"), setNavOpen(false)]
      : [setNavAnim("navOpen"), setNavOpen(true)];
  }

  const [navTogClass, setNavTogClass] = useState("tempHide");

  return (
    <div
      style={{
        maxWidth: "100vw",
        display: "flex",
        overflow: "hidden",
      }}
      className=" login-bg"
    >
      <div
        className={`fixed text-white right-10 top-5 cursor-pointer`}
        onClick={openNav}
      >
        {navOpen ? (
          <GoEyeClosed className={navTogClass} size="30px" />
        ) : (
          <GoEye className={navTogClass} size="30px" />
        )}
      </div>
      <div
        className={`${navAnim}  overflow-x-hidden outlet-container`}
        style={{ minWidth: "100vw", maxHeight: "100vh" }}
      >
        <Outlet />
        <section style={{ background: "black", color: "white" }}>
          <h1>Footer</h1>
        </section>
      </div>
      <div className=" text-center" style={{ minWidth: "300px" }}>
        <ul className="pb-20 text-white  font-extrabold  text-3xl mt-40 flex flex-col gap-3">
          <NavLink to="home">
            <li onClick={openNav}>Home</li>
          </NavLink>
          <NavLink>
            <li onClick={openNav}>Create</li>
          </NavLink>
          <NavLink>
            <li onClick={openNav}>About</li>
          </NavLink>
          <NavLink to="/">
            <li onClick={openNav}>Logout</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
