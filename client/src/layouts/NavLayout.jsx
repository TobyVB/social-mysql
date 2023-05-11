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
        minHeight: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
      className=" login-bg -z-20"
    >
      <div
        className={`fixed text-white right-10 top-5 cursor-pointer z-20`}
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
        style={{ minWidth: "100vw" }}
      >
        <Outlet />
        <section style={{ background: "black", color: "white" }}>
          <h1>Footer</h1>
        </section>
      </div>
      <div className=" text-center fixed right-10 -z-0" style={{}}>
        <ul className="pb-20 text-white  font-extrabold  text-3xl mt-40 flex flex-col gap-3">
          <NavLink to="home">
            <li onClick={openNav}>Home</li>
          </NavLink>
          <NavLink to="create">
            <li onClick={openNav}>Create</li>
          </NavLink>
          <NavLink to="about">
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
