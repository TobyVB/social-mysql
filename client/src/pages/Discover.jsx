import { useEffect, useState } from "react";
import axios from "axios";

export default function Discover() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchAllMemes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/memes");
        setMemes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMemes();
  }, []);

  const handleDelete = async (meme) => {
    console.log("this is publicId " + meme.publicId);
    try {
      await axios.delete(`http://localhost:8800/memes/${meme.id}`).then(() => {
        try {
          axios.delete(`http://localhost:8000/delete/${meme.publicId}`);
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
    setMemes((prev) => {
      return prev.filter((item) => item.id !== meme.id);
    });
  };

  function Meme(props) {
    console.log(props.meme);
    return (
      <>
        <div className="py-20 flex flex-col">
          <p className="m-0 -mb-10 text-center text-white z-50 text-xl">
            {props.meme.topText}
          </p>
          <div>
            <img className="px-20" src={props.meme.img} />
          </div>
          <p className="m-0 -mt-10 text-center text-white text-xl">
            {props.meme.botText}
          </p>
        </div>
        <div className="mx-auto flex gap-3 -mt-20 mb-20">
          <button
            className="accent-btn "
            onClick={() => handleDelete(props.meme)}
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
