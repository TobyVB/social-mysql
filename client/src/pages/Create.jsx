import { useState, useRef } from "react";

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

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const MoveableInput = (props) => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setInitialPosition({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        setPosition({
          x: event.clientX - initialPosition.x,
          y: event.clientY - initialPosition.y,
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <div
        className="moveable-div p-10 bg-black"
        style={{ top: position.y, left: position.x, position: "absolute" }}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
      >
        <input
          key={props.idx}
          value={props.text.text}
          onChange={(e) => handleChange(e, props.idx)}
          autoFocus={selected === props.idx}
          onClick={() => setSelected(props.idx)}
        />
      </div>
    );
  };

  function Inputs() {
    console.log(texts);
    return texts.map((text, idx) => {
      return <MoveableInput text={text} idx={idx} />;
    });
  }
  function createInput() {
    setTexts((prev) => [...prev, { text: "" }]);
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
