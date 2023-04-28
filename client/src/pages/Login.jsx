import { useState } from "react";

export default function Login() {
  const [signup, setSignup] = useState(true);

  return (
    <div className=" h-screen flex flex-col content-center text-3x bg-slate-700 ">
      <h1 className="text-center text-5xl pb-20 bg-clip-text text-transparent  font-extrabold text-transparent text-8xl  login-text my-28">
        The TalkSpace 2.0
      </h1>
      <div
        className="login-bg-2"
        style={{
          display: "inline-flex",
          margin: "0 auto",
          padding: ".15em",
          borderRadius: "3px",
        }}
      >
        {signup ? (
          <div className=" backdrop-brightness-75 text-center gap-5 inline-flex flex-col  mx-auto p-10 bg-login">
            <h1 className="pb-20 text-white  font-extrabold  text-6xl">
              Login
            </h1>
            <input className="p-2" type="email" />
            <input className="p-2" type="password" />
            <button className="text-white bg-opacity-30 bg-white p-2 border border-zinc-100">
              login
            </button>
            <button className="p-2 text-white">continue as guest</button>
          </div>
        ) : (
          <div>
            <h1>Register</h1>
            <input type="text" />
            <input type="email" />
            <input type="password" />
          </div>
        )}
      </div>
    </div>
  );
}
