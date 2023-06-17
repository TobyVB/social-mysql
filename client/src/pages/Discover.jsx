import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";

export default function Discover() {
  // On this page all of the most trending memes
  // taken from this site.

  const [memes, setMemes] = useState([]);

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
    return (
      <>
        <div className="py-20">
          <p className="-mb-10 text-center text-white">{props.meme.topText}</p>
          <img className="px-20" src={props.meme.img} />
          <p className="-mt-10 text-center text-white text-4xl">
            {props.meme.botText}
          </p>
        </div>
        <div className="mx-auto flex gap-3 -mt-20 mb-20">
          <button
            className="accent-btn "
            onClick={() => handleDelete(props.meme.id)}
          >
            Delete
          </button>
          <button className="accent-btn ">Update</button>
        </div>
      </>
    );
  }

  return (
    <div className=" bg-slate-500 min-h-screen py-20">
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
