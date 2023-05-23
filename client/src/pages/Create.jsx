import { useState } from "react";

export default function Create() {
  const [texts, setTexts] = useState([
    // { text: "hi", left: "ml-2", top: "mt-2" },
    // { text: "hello", left: "ml-4", top: "mt-4" },
  ]);
  const [selected, setSelected] = useState(0);
  const handleChange = (e, idx) => {
    const { value } = e.target;

    setTexts((prev) => {
      const newData = [...prev];

      newData[idx] = { ...newData[idx], text: value };

      return newData;
    });
  };

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", ""); // Set data to enable dragging
    setIsDragging(true);
  };

  const handleDrag = (event) => {
    if (isDragging) {
      const input = event.target;
      const inputRect = input.getBoundingClientRect();

      const newLeft = event.clientX - inputRect.width / 2;
      const newTop = event.clientY - inputRect.height / 2;

      setLeft(newLeft);
      setTop(newTop);
    }
  };
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  function Inputs() {
    console.log(texts);
    return texts.map((text, idx) => {
      return (
        <input
          key={idx}
          // className={`${text.top} ${text.left}`}
          style={{ marginLeft: `${left}px`, marginTop: `${top}px` }}
          value={text.text}
          onChange={(e) => handleChange(e, idx)}
          autoFocus={selected === idx}
          onClick={() => setSelected(idx)}
          draggable
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      );
    });
  }
  function createInput() {
    setTexts((prev) => [...prev, { text: "", left: "ml-6", top: "mt-6" }]);
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
