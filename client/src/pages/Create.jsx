import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Create() {
  const [keys, setKeys] = useState();
  const [memeObj, setMemeObj] = useState({ img: "", topText: "", botText: "" });
  const [imgData, setImgData] = useState();
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const [cloudName, setCloudName] = useState();
  const [uploadPreset, setUploadPreset] = useState();

  useEffect(() => {
    const getKeys = async () => {
      try {
        const res = await axios.get("http://localhost:8000/keys");
        setCloudName(res.data.cloudName);
        setUploadPreset(res.data.uploadPreset);
        setKeys(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getKeys();
  }, []);

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

  const [imageDataUrl, setImageDataUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageDataUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    setImgData(formData);
  };

  const [ready, setReady] = useState(false);

  const publish = async (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imgData
      )
      .then((res) =>
        axios.post("http://localhost:8800/memes ", {
          ...memeObj,
          img: res.data.secure_url,
        })
      )
      .then((err) => console.log(err))
      .then(() => setReady(true));
  };

  useEffect(() => {
    if (ready) {
      navigate("/discover");
    }
  }, [ready]);

  return (
    <div className="bg-slate-500 min-h-screen py-48">
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
          <img
            src={imageDataUrl}
            style={{ width: "90vw" }}
            className="mx-auto"
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
            className="create-input bg-transparent text-center text-white shadow-black"
          />
        </div>
      </section>
      <button
        onClick={publish}
        className="publish block border-neutral-800 border-2 rounded p-1 mx-auto mt-5"
      >
        Publish
      </button>
    </div>
  );
}
