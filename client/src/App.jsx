import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavLayout from "./layouts/NavLayout";

import "./App.css";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Create from "./pages/Create";

function App() {
  // What's the point in this site?
  // It's another practice site for sure. Wouldn't be the job tracker site, because that's the other project.
  // Alright this will be a meme making site, but it's social media.
  // There will be no comments or anything, and the meme will be ranked by shares and or likes/ saves/ some shizz
  // Maybe there could be comments, but that won't be included initially.. something to think about and consider both options.

  return (
    <BrowserRouter>
      <Routes>
        <Route to="/" element={<NavLayout />}>
          <Route index element={<Login />} />
          <Route path="home" element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="create" element={<Create />} />
          {/* <Route index element={<Store />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} /> */}
        </Route>
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
