import { useState } from "react";

export default function Login() {
  const [signup, setSignup] = useState(true);

  return (
    <>
      {signup ? (
        <div>
          <h1>Login</h1>
          <input type="email" />
          <input type="password" />
        </div>
      ) : (
        <div>
          <h1>Register</h1>
          <input type="text" />
          <input type="email" />
          <input type="password" />
        </div>
      )}
    </>
  );
}
