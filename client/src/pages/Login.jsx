import { useState } from "react";

export default function Login() {
  const [signup, setSignup] = useState(true);

  return (
    <div className=" h-screen flex content-center text-3xl login-bg text-white">
      {signup ? (
        <div className=" backdrop-brightness-75 text-center gap-5 inline-flex flex-col border border-zinc-100 m-auto p-10">
          <h1 className="text-5xl pb-20 bg-clip-text text-transparent  font-extrabold text-transparent text-8xl  login-text">
            Login
          </h1>
          <input className="p-2" type="email" />
          <input className="p-2" type="password" />
          <button className="bg-slate-400 p-2 border border-zinc-100">
            login
          </button>
          <button className="p-2">continue as guest</button>
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
  );
}
