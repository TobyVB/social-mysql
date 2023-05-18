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
      className=" login-bg -z-20 "
    >
      <div
        className={`nav-tog fixed text-white right-10 top-5 cursor-pointer z-20 `}
        onClick={openNav}
      >
        {navOpen ? (
          <GoEyeClosed className={navTogClass} size="30px" />
        ) : (
          <GoEye className={navTogClass} size="30px" />
        )}
      </div>
      <div
        className=" wide-nav text-center fixed mt-4 w-screen"
        style={{ zIndex: "2" }}
      >
        <ul className="  bg-opacity-50  text-white  font-light  text-3xl  flex justify-around">
          <NavLink to="home">
            <li onClick={openNav}>Home</li>
          </NavLink>
          <div className="flex justify-items-end gap-10">
            <NavLink to="create">
              <li onClick={openNav}>Create</li>
            </NavLink>
            <NavLink to="about">
              <li onClick={openNav}>About</li>
            </NavLink>
            <NavLink to="/">
              <li onClick={openNav}>Logout</li>
            </NavLink>
          </div>
        </ul>
      </div>
      <div
        className={`${navAnim}  overflow-x-hidden outlet-container`}
        style={{
          minWidth: "100vw",
          maxWidth: "100vw",
          maxHeight: "100vh",
          zIndex: "1",
        }}
      >
        <Outlet />
        <section style={{ background: "black", color: "white" }}>
          <h1>Footer</h1>
        </section>
      </div>
      <div className="w-screen h-screen">
        <div className="text-center fixed w-screen h-screen">
          <ul className="text-white font-extrabold text-2xl flex flex-col gap-4 pt-48">
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
    </div>
  );
}
