import { useState, useEffect, useContext } from "react";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Login() {
  const [hideEye, setHideEye] = useOutletContext();

  const [signup, setSignup] = useState(false);

  const navigate = useNavigate();

  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = async () => {
    axios
      .post("http://localhost:8800/register", {
        email: emailReg,
        username: usernameReg,
        password: passwordReg,
        id: nanoid(),
      })
      .then((response) => {
        console.log(response);
        navigate("/discover");
      });
  };

  const signIn = async () => {
    axios
      .post("http://localhost:8800/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
          localStorage.setItem("user", JSON.stringify(response.data[0]));
          navigate("/discover");
          setHideEye(false);
        }
      });
  };

  return (
    <div className="login-main overflow-hidden min-h-screen flex flex-col content-center text-3x bg-slate-700">
      <div className="mx-auto text-xl2 bg-clip-text text-transparent  font-extrabold text-transparent text-5xl  login-text my-28">
        <h1 className="text-xl">The</h1>
        <h1>ImageSpace</h1>
      </div>
      <div className="login-bg-2 mx-auto my-3 inline-flex rounded-lg p-1">
        {!signup ? (
          <div className=" backdrop-brightness-75 text-center gap-5 inline-flex flex-col  mx-auto p-10 bg-login">
            <h1 className="pb-20 text-white  font-extrabold  text-2xl -mb-10">
              Login
            </h1>
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2"
              type="email"
            />
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2"
              type="password"
            />
            <button
              className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100"
              // onClick={() => navigate("homepage")}
              onClick={() => signIn()}
            >
              login
            </button>
            <button className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100 text">
              continue as guest
            </button>
            <button
              onClick={() => setSignup(true)}
              className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100 text"
            >
              register
            </button>
          </div>
        ) : (
          <div className="backdrop-brightness-75 text-center gap-5 inline-flex flex-col  mx-auto px-10 pt-10 pb-4 bg-login">
            <h1 className="pb-14 text-white  font-extrabold  text-2xl ">
              Register
            </h1>
            <input
              className="p-2"
              placeholder="Username"
              type="text"
              onChange={(e) => setUsernameReg(e.target.value)}
            />
            <input
              className="p-2"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmailReg(e.target.value)}
            />
            <input
              className="p-2 pb-2 mb-0.5"
              placeholder="Password"
              type="password"
              onChange={(e) => setPasswordReg(e.target.value)}
            />
            <button
              className="text-white bg-opacity-30 bg-white p-2 border border-zinc-100"
              // onClick={() => navigate("homepage")}
              onClick={() => register()}
            >
              register
            </button>
            <button
              className="text-white bg-opacity-30 bg-white p-2 border border-zinc-100"
              onClick={() => setSignup(false)}
            >
              cancel
            </button>
          </div>
        )}
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}
