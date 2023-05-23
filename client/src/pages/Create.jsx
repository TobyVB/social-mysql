import { useState } from "react";

export default function Create() {
  const [texts, setTexts] = useState([
    // { text: "hi", left: "ml-2", top: "mt-2" },
    // { text: "hello", left: "ml-4", top: "mt-4" },
  ]);
  function Inputs() {
    console.log(texts);
    return texts.map((text, idx) => {
      return (
        <input
          key={idx}
          className={`${text.top} ${text.left}`}
          value={text.text}
        />
      );
    });
  }
  function createInput() {
    setTexts((prev) => [
      ...prev,
      { text: "greetings", left: "ml-6", top: "mt-6" },
    ]);
  }
  return (
    <div className="bg-slate-500 min-h-screen">
      <section className="p-20 ">
        <h1 className="text-6xl text-white text-center">Create</h1>
      </section>
      <section>
        <button onClick={createInput}>add text</button>
      </section>
      <section>
        <div className=" bg-red-400  h-80 w-80 m-auto text-black-50">
          <Inputs />
        </div>
      </section>
    </div>
  );
}
