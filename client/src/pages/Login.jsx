import { useState, useEffect, useContext } from "react";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
import { LoginContext } from "../App";
import { GoThumbsup } from "react-icons/go";

export default function Login() {
  const [loggedAs, setLoggedAs] = useContext(LoginContext);
  const [hideEye, setHideEye] = useOutletContext();
  const [signup, setSignup] = useState(false);
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

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
          setLoggedAs((prev) => {
            return { ...prev, user: response.data[0] };
          });
          navigate("/discover");
          setHideEye(false);
        }
      });
  };

  const guestSignin = async () => {
    setLoggedAs({ user: "guest", authenticated: false });
    navigate("/discover");
  };

  return (
    <div className="login-main overflow-hidden min-h-screen flex flex-col content-center bg-slate-700">
      <div className="mx-auto bg-clip-text text-transparent  font-extrabold text-transparent text-5xl  login-text my-28">
        <h1 className="text-xl">The</h1>
        <h1 className="pb-3">ImageSpace</h1>
      </div>
      <div className="login-bg-2 mx-auto mb-32 inline-flex rounded-lg">
        {!signup ? (
          <div className=" backdrop-brightness-75 p-10">
            <h1 className="pb-10 text-white text-center font-extrabold  text-2xl">
              Login
            </h1>
            <div className="inline-flex flex-col gap-5 max-h-72">
              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 "
                type="email"
              />
              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 "
                type="password"
              />
              <button
                className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100"
                onClick={() => signIn()}
              >
                login
              </button>
              <button
                className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100"
                onClick={guestSignin}
              >
                continue as guest
              </button>
              <button
                onClick={() => setSignup(true)}
                className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100"
              >
                register
              </button>
            </div>
          </div>
        ) : (
          <div className="backdrop-brightness-75  p-10 ">
            <h1 className="pb-10 text-white text-center font-extrabold  text-2xl ">
              Register
            </h1>
            <div className="inline-flex flex-col gap-5 max-h-72">
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
                className="p-2"
                placeholder="Password"
                type="password"
                onChange={(e) => setPasswordReg(e.target.value)}
              />
              <button
                className="text-white bg-opacity-30 bg-white p-2 border border-zinc-100"
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
          </div>
        )}
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}
