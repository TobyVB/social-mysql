import { GoEyeClosed, GoEye } from "react-icons/go";
import { useState, useEffect, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function NavLayout() {
  const [loggedAs, setLoggedAs] = useContext(LoginContext);

  // console.log(loggedAs[0].user.username);

  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState(false);
  const [navAnim, setNavAnim] = useState("");
  const [hideEye, setHideEye] = useState(true);

  useEffect(() => {
    if (loggedAs.user === null) {
      navigate("/");
    }
  }, []);

  function openNav(arg) {
    navOpen
      ? [setNavAnim("navClose"), setNavOpen(false)]
      : [setNavAnim("navOpen"), setNavOpen(true)];
    if (arg === "logout") {
      localStorage.removeItem("user");
      setLoggedAs({
        // user: JSON.parse(localStorage.getItem("user")),
        // authenticated: JSON.parse(localStorage.getItem("user")) !== null,
      });
      setHideEye(true);
      navigate("/login");
    }
  }

  const [navTogClass, setNavTogClass] = useState("tempHide");

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setHideEye(false);
    } else if (loggedAs.user === "guest") {
      setHideEye(false);
    }
  }, [navOpen]);

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
      {(hideEye === false || loggedAs.user === "guest") && (
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
      )}
      {(hideEye === false || loggedAs.user === "guest") && (
        <div
          className="flex justify-between backdrop-blur-sm wide-nav text-center fixed w-screen p-3 bg-opacity-50 bg-black"
          style={{ zIndex: "2" }}
        >
          <p className="text-white text-2xl ">
            hello{" "}
            {loggedAs.user && loggedAs.user === "guest"
              ? "guest"
              : loggedAs.user && loggedAs.user.username}
          </p>
          <div className="text-white font-light  text-3xl  flex gap-10 float-right mr-10">
            <NavLink onClick={openNav} to="uploaded">
              Uploaded
            </NavLink>
            <NavLink onClick={openNav} to="liked">
              Liked
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
            <NavLink onClick={() => openNav("logout")} to="/">
              Logout
            </NavLink>
          </div>
        </div>
      )}
      <div
        className={`${navAnim}  overflow-x-hidden outlet-container`}
        style={{
          minWidth: "100vw",
          maxWidth: "100vw",
          maxHeight: "100vh",
          zIndex: "1",
        }}
      >
        <Outlet context={[hideEye, setHideEye]} />
        <section
          className="flex justify-center flex-col py-10"
          style={{ background: "black", color: "white" }}
        >
          <div className="footer-links flex gap-2 mx-auto mb-5">
            <div className="footer-halves flex gap-2">
              <NavLink to="uploaded">UPLOADED</NavLink>
              <NavLink to="liked">LIKED</NavLink>
              <NavLink to="discover">DISCOVER</NavLink>
            </div>
            <div className="footer-halves flex gap-2">
              <NavLink to="create">CREATE</NavLink>
              <NavLink to="about">ABOUT</NavLink>
              <NavLink to="/ ">LOGOUT</NavLink>
            </div>
          </div>

          <p className="mx-auto">
            <span>TalkSpace </span>&copy; 2023
          </p>
        </section>
      </div>
      <div className="login-bg-2 w-screen h-screen">
        <div className="text-center fixed w-screen h-screen">
          <p className="text-white text-2xl mt-5">
            hello{" "}
            {loggedAs.user && loggedAs.user === "guest"
              ? "guest"
              : loggedAs.user && loggedAs.user.username}
          </p>
          <div className="text-white font-extrabold text-2xl flex flex-col gap-4 pt-48">
            <NavLink onClick={openNav} to="uploaded">
              Uploaded
            </NavLink>
            <NavLink to="liked" onClick={openNav}>
              Liked
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
            <NavLink to="/" onClick={() => openNav("logout")}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
