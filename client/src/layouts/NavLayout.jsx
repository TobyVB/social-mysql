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
        className="backdrop-blur-sm wide-nav text-center fixed w-screen p-3 bg-opacity-50 bg-black"
        style={{ zIndex: "2" }}
      >
        <div className="text-white font-light  text-3xl  flex gap-10 float-right mr-10">
          <NavLink onClick={openNav} to="feed">
            Feed
          </NavLink>
          <NavLink onClick={openNav} to="discover">
            Discover
          </NavLink>

          <NavLink onClick={openNav} to="create">
            Create
          </NavLink>
          <NavLink onClick={openNav} to="about">
            About
          </NavLink>
          <NavLink onClick={openNav} to="/">
            Logout
          </NavLink>
        </div>
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
        <section
          className="h-20 flex justify-center flex-col"
          style={{ background: "black", color: "white" }}
        >
          <div className="flex gap-2 mx-auto">
            <NavLink to="feed">FEED</NavLink>
            <NavLink to="discovery">DISCOVERY</NavLink>
            <NavLink to="create">CREATE</NavLink>
            <NavLink to="about">ABOUT</NavLink>
            <NavLink to="/ ">LOGOUT</NavLink>
          </div>

          <p className="mx-auto">&copy; 2023</p>
        </section>
      </div>
      <div className="login-bg-2 w-screen h-screen">
        <div className="text-center fixed w-screen h-screen">
          <div className="text-white font-extrabold text-2xl flex flex-col gap-4 pt-48">
            <NavLink to="feed" onClick={openNav}>
              Feed
            </NavLink>
            <NavLink to="discover" onClick={openNav}>
              Discover
            </NavLink>
            <NavLink to="create" onClick={openNav}>
              Create
            </NavLink>
            <NavLink to="about" onClick={openNav}>
              About
            </NavLink>
            <NavLink to="/" onClick={openNav}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
