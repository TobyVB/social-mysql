import { useState, useRef } from "react";

export default function Create() {
  const [memeObj, setMemeObj] = useState({ bg: "", topText: "", botText: "" });
  return (
    <div className="bg-slate-500 min-h-screen">
      <section className="p-20 ">
        <h1 className="text-6xl text-white text-center">Create</h1>
      </section>
      <section>
        <div className=" bg-red-400  h-80 w-80 m-auto text-black-50 flex flex-col justify-between text-center">
          <input
            style={{ textShadow: "1px 1px 1px black" }}
            className="bg-transparent text-center text-white shadow-black"
            placeholder="top text"
          />
          <input
            style={{ textShadow: "1px 1px 1px black" }}
            className="bg-transparent text-center text-white shadow-black"
            placeholder="bottom text"
          />
        </div>
      </section>
      <button className="mx-auto">Publish</button>
    </div>
  );
}
