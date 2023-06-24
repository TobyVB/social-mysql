import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../App";

export default function Create() {
  const [keys, setKeys] = useState();
  const [memeObj, setMemeObj] = useState({ img: "" });
  const [imgData, setImgData] = useState();
  const navigate = useNavigate();
  const [cloudName, setCloudName] = useState();
  const [uploadPreset, setUploadPreset] = useState();
  const [imageDataUrl, setImageDataUrl] = useState("");

  const [loggedAs, setLoggedAs] = useContext(LoginContext);

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

  const handleUrl = (e) => {};

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
          publicId: res.data.public_id,
          createdBy: loggedAs.user.id,
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
        <label className="block mx-auto text-2xl text-white mb-10">
          Your Image File
        </label>
        <input
          className="block mx-auto"
          type="file"
          name="myImage"
          accept="image/png image/gif image/jpeg image/jpg image/HEIC"
          onChange={handleFileChange}
        />
        <input
          placeholder="This element probably needs more work, and it's value needs to be stored"
          className="block mx-auto"
          type="text"
          name="linkImage"
          accept="image/png image/gif image/jpeg image/jpg image/HEIC"
          onChange={handleUrl}
        />
      </section>

      <section>
        <div className="create-image  m-auto text-black-50 flex flex-col justify-between text-center bg-contain">
          <div>
            {imageDataUrl === "" ? (
              <div
                className="mx-auto"
                style={{ width: "90vw", height: "30vw" }}
              ></div>
            ) : (
              <img
                src={imageDataUrl}
                style={{ width: "90vw" }}
                className="mx-auto"
              />
            )}
          </div>
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
