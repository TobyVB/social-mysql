import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavLayout from "./layouts/NavLayout";

import "./App.css";
import Discover from "./pages/Discover";
import { Liked } from "./pages/Liked";
import About from "./pages/About";
import Create from "./pages/Create";

export const LoginContext = createContext();

function App() {
  const [loggedAs, setLoggedAs] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    authenticated: JSON.parse(localStorage.getItem("user")) !== null,
  });
  return (
    <LoginContext.Provider value={[loggedAs, setLoggedAs]}>
      <BrowserRouter>
        <Routes>
          <Route to="/" element={<NavLayout />}>
            <Route index element={<Login />} />
            <Route path="liked" element={<Liked />} />
            <Route path="discover" element={<Discover />} />
            <Route path="about" element={<About />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
