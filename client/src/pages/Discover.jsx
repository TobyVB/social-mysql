import { useEffect, useRef } from "react";

export default function Discover() {
  // On this page all of the most trending memes
  // taken from this site.

  const dummyMemes = [1, 2, 3, 4, 5];

  function Meme(props) {
    return (
      <div className=" border-4 border-red-600 bg-orange-300 px-20 py-10">
        <div className=" text-8xl shrink-0  bg-red-200 p-10">{props.meme}</div>
      </div>
    );
  }

  return (
    <div className=" bg-slate-500 min-h-screen py-20">
      {/* <section className="py-20">
        <h1 className="text-6xl text-white text-center">Discover</h1>
      </section> */}
      <section className="flex justify-center">
        <div className="inline-flex flex-col gap-5 my-32">
          {dummyMemes.map((meme, idx) => {
            return <Meme key={idx} meme={meme} />;
          })}
        </div>
      </section>
    </div>
  );
}
