import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        {/* <Route index element={<Store />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// ###   C O M P O N E N T S  ###

// navbar
// customize profile data box
// ###  delete account
// ###  update profile image
// ###  update cover photo
// customize theme box
// create post

// register/login page  # sign in as a guest option #
// feedpage
// userpage

// Site Name Help Buy

// User requests Item
// Another User Finds the Item to sell it to them

// FOR NAV
// if I want to make the sites nav work similar to the Freewater site
// then I would put the nav as a layout. The inside of that have a div
// in that div would be an outlet. That div will shrink and move out of the
// page. That would make for a cool animation.
