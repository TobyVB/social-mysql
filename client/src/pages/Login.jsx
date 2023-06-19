import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signup, setSignup] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="login-main overflow-hidden min-h-screen flex flex-col content-center text-3x bg-slate-700">
      <div className="mx-auto text-xl2 bg-clip-text text-transparent  font-extrabold text-transparent text-5xl  login-text my-28">
        <h1 className="text-xl">The</h1>
        <h1>ImageSpace</h1>
      </div>
      <div className="login-bg-2 mx-auto my-3 inline-flex rounded-lg p-1">
        {!signup ? (
          <div className=" backdrop-brightness-75 text-center gap-5 inline-flex flex-col  mx-auto p-10 bg-login">
            <h1 className="pb-20 text-white  font-extrabold  text-2xl">
              Login
            </h1>
            <h1 className="pb-20 text-transparent  font-extrabold  text-2xl -mt-40">
              Register
            </h1>
            <input className="p-2" type="email" />
            <input className="p-2" type="password" />
            <button
              className="text-white bg-opacity-10 bg-white p-2 border border-zinc-100"
              // onClick={() => navigate("homepage")}
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
            <input className="p-2" placeholder="Username" type="text" />
            <input className="p-2" placeholder="Email" type="email" />
            <input
              className="p-2 pb-2 mb-0.5"
              placeholder="Password"
              type="password"
            />
            <button
              className="text-white bg-opacity-30 bg-white p-2 border border-zinc-100"
              // onClick={() => navigate("homepage")}
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
    </div>
  );
}
