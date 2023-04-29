import { useState } from "react";
import { Outlet } from "react-router-dom";
export default function NavLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const [navAnim, setNavAnim] = useState("");

  function openNav() {
    navOpen
      ? [setNavAnim("navClose"), setNavOpen(false)]
      : [setNavAnim("navOpen"), setNavOpen(true)];
  }

  return (
    <div>
      <div
        className={`fixed text-white right-10 top-5 cursor-pointer`}
        onClick={openNav}
      >
        {navOpen ? "close nav" : "open nav"}
      </div>
      <div className={`${navAnim} h-screen overflow-hidden`}>
        <Outlet />
      </div>
    </div>
  );
}
