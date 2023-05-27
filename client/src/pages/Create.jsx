import { useState, useRef, useEffect } from "react";

export default function Create() {
  const [memeObj, setMemeObj] = useState({ bg: "", topText: "", botText: "" });
  console.log(memeObj);
  const divRef = useRef(null);
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const [selected, setSelected] = useState(0);

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

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const width = divRef.current.offsetWidth;
        console.log("Width:", width);
        // You can store the width in the component state or perform any other necessary actions

        // Adjust the height based on the aspect ratio of the currently selected background image
        const backgroundImageUrl = divRef.current.style.backgroundImage
          .slice(4, -1)
          .replace(/"/g, "");
        const tempImg = new Image();
        tempImg.src = backgroundImageUrl;
        tempImg.onload = () => {
          const aspectRatio = tempImg.width / tempImg.height;
          const height = width / aspectRatio;
          divRef.current.style.height = `${height}px`;
        };
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize initially to get the width on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const aspectRatio = image.width / image.height;
          const width = divRef.current.offsetWidth;
          const height = width / aspectRatio;
          divRef.current.style.backgroundImage = `url(${event.target.result})`;
          divRef.current.style.height = `${height}px`;
        };
      };
      reader.readAsDataURL(file);
    }
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
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </section>

      <section>
        <div
          ref={divRef}
          style={{
            backgroundSize: "cover",
          }}
          className="create-image  m-auto text-black-50 flex flex-col justify-between text-center bg-contain"
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
            className="create-input bg-transparent text-center text-white shadow-black"
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
      <button className="block border-neutral-800 border-2 rounded p-1 mx-auto mt-5">
        Publish
      </button>
    </div>
  );
}
