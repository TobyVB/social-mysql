import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";

export default function Discover() {
  // On this page all of the most trending memes
  // taken from this site.

  const [memes, setMemes] = useState([]);
  const [memesReady, setMemesReady] = useState(false);

  function converter(data) {
    const blob = new Blob([data], { type: "image/jpg" }); // Modify the MIME type as per your image format
    const dataURL = URL.createObjectURL(blob);
    return dataURL;
  }

  useEffect(() => {
    const fetchAllMemes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/memes");
        setMemes(
          res.data.map((meme) => {
            return { ...meme, bg: meme.bg };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMemes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/memes/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    memes.forEach((meme) => {
      console.log(JSON.stringify(meme.bg));
    });
  }, [memes]);

  function Meme(props) {
    console.log(`data:image/jpeg;base64,${props.meme.bg[0]}`);

    return (
      <>
        <div
          className=" border-2 border-x-stone-950 px-20 py-10"
          style={{
            backgroundImage: `url(data:image/jpeg;base64,${props.meme.bg})`,
          }}
        >
          <p className="p-10">{props.meme.topText}</p>
          <p className="p-10">{props.meme.botText}</p>
        </div>
        <div className="mx-auto flex gap-3">
          <button onClick={() => handleDelete(props.meme.id)}>Delete</button>
          <button>Update</button>
          <img
            src={`data:image/jpeg;base64,${props.meme.bg[0]}`}
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      </>
    );
  }

  return (
    <div className=" bg-slate-500 min-h-screen py-20">
      {/* <section className="py-20">
        <h1 className="text-6xl text-white text-center">Discover</h1>
      </section> */}
      <section className="flex justify-center">
        <div className="inline-flex flex-col gap-5 my-32">
          {memes.map((meme, idx) => {
            return <Meme key={idx} idx={idx} meme={meme} />;
          })}
        </div>
      </section>
    </div>
  );
}
