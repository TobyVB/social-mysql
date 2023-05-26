import { useState, useRef, useEffect } from "react";

export default function Create() {
  const [memeObj, setMemeObj] = useState({ bg: "", topText: "", botText: "" });
  console.log(memeObj);
  const divRef = useRef(null);
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const [selected, setSelected] = useState(0);

  const divWidth = 400;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setMemeObj((prev) => ({ ...prev, bg: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;
          const aspectRatio = naturalWidth / naturalHeight;
          const height = Math.round(divWidth / aspectRatio);
          divRef.current.style.height = `${height}px`;
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile, divWidth]);

  useEffect(() => {
    if (selected === 1) {
      adjustTextareaHeight(1);
    } else if (selected === 2) {
      adjustTextareaHeight(2);
    }
  }, [memeObj]);

  const adjustTextareaHeight = (num) => {
    let textarea;
    if (num === 1) {
      textarea = textareaRef.current;
    } else if (num === 2) {
      textarea = textareaRef2.current;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="bg-slate-500 min-h-screen">
      <section className="p-20 ">
        <h1 className="text-6xl text-white text-center">Create</h1>
      </section>
      <section className="flex flex-col pb-5">
        <label className="block mx-auto text-2xl text-white">
          Your Image File
        </label>

        <input
          className="block mx-auto"
          type="file"
          name="myImage"
          accept="image/png image/gif image/jpeg image/jpg"
          onChange={handleFileInputChange}
        />
      </section>

      <section>
        <div
          ref={divRef}
          style={{
            backgroundImage: `url(${
              selectedFile ? URL.createObjectURL(selectedFile) : ""
            })`,
            backgroundSize: "cover",
            width: `${divWidth}px`,
          }}
          className="w-80 m-auto text-black-50 flex flex-col justify-between text-center bg-contain"
        >
          <textarea
            placeholder="enter top text here"
            onClick={() => setSelected(1)}
            ref={textareaRef}
            value={memeObj.topText}
            onChange={(e) =>
              setMemeObj((prev) => ({ ...prev, topText: e.target.value }))
            }
            style={{ textShadow: "1px 1px 1px black" }}
            className="bg-transparent text-center text-white shadow-black"
          />
          <textarea
            placeholder="enter bottom text here"
            onClick={() => setSelected(2)}
            ref={textareaRef2}
            value={memeObj.botText}
            onChange={(e) =>
              setMemeObj((prev) => ({ ...prev, botText: e.target.value }))
            }
            style={{ textShadow: "1px 1px 1px black" }}
            className="bg-transparent text-center text-white shadow-black"
          />
        </div>
      </section>
      <button className="block border-neutral-800 border-2 rounded p-1 mx-auto mt-5">
        Publish
      </button>
    </div>
  );
}
