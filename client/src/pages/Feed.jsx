import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Feed() {
  // On this page all of the most trending memes
  // taken from this site.

  const dummyMemes = [1, 2, 3, 4, 5];
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/memes");
        console.log(res);
        setMemes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/memes/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  function Meme(props) {
    return (
      <>
        <div
          className=" border-2 border-x-stone-950 px-20 py-10"
          style={{ backgroundImage: `url(${props.meme.bg})` }}
        >
          <p className="p-10">{props.meme.topText}</p>
          <p className="p-10">{props.meme.botText}</p>
        </div>
        <div className="mx-auto flex gap-3">
          <button onClick={() => handleDelete(props.meme.id)}>Delete</button>
          <button>Update</button>
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
            return <Meme key={idx} meme={meme} />;
          })}
        </div>
      </section>
    </div>
  );
}
