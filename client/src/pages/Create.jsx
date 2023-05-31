import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";

export default function Create() {
  const [memeObj, setMemeObj] = useState({ bg: "", topText: "", botText: "" });
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

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

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    console.log(file);
    if (file) {
      Resizer.imageFileResizer(
        file,
        3000, // Max width
        3000, // Max height
        "jpeg", // Output format
        5, // Max file size in KB
        0, // Rotation
        (compressedImage) => {
          console.log("Compressed Image:", compressedImage);
          // Perform further actions with the compressed image, such as uploading it to a server
          setMemeObj((prev) => ({ ...prev, bg: compressedImage }));
        },
        "base64", // Output type
        200 // Quality (optional)
      );
    }
  };

  const publish = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/memes ", memeObj);
      console.log(memeObj);
      navigate("/discover");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-500 min-h-screen py-48">
      {/* <section className="p-20 ">
        <h1 className="text-6xl text-white text-center">Create</h1>
      </section> */}
      <section className="flex flex-col pb-5">
        <label className="block mx-auto text-2xl text-white">
          Your Image File
        </label>

        <input
          className="block mx-auto"
          type="file"
          name="myImage"
          accept="image/png image/gif image/jpeg image/jpg image/HEIC"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </section>

      <section>
        <div className="create-image  m-auto text-black-50 flex flex-col justify-between text-center bg-contain">
          <textarea
            placeholder="enter top text here"
            onClick={() => setSelected(1)}
            ref={textareaRef}
            value={memeObj.topText}
            onChange={(e) =>
              setMemeObj((prev) => ({ ...prev, topText: e.target.value }))
            }
            style={{ textShadow: "1px 1px 1px black" }}
            className="create-input bg-transparent text-center text-white shadow-black"
          />
          <img src={memeObj.bg} style={{ width: "90vw" }} className="mx-auto" />

          <textarea
            placeholder="enter bottom text here"
            onClick={() => setSelected(2)}
            ref={textareaRef2}
            value={memeObj.botText}
            onChange={(e) =>
              setMemeObj((prev) => ({ ...prev, botText: e.target.value }))
            }
            style={{ textShadow: "1px 1px 1px black" }}
            className="create-input bg-transparent text-center text-white shadow-black"
          />
        </div>
      </section>
      <button
        onClick={publish}
        className="block border-neutral-800 border-2 rounded p-1 mx-auto mt-5"
      >
        Publish
      </button>
    </div>
  );
}
