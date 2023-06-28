import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../App";

export default function Discover() {
  const [memes, setMemes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedAs, setLoggedAs] = useContext(LoginContext);
  const [likedData, setLikedData] = useState({});
  const [likes, setLikes] = useState();
  const [likeIds, setLikeIds] = useState();
  const [allLikes, setAllLikes] = useState();
  const [update, setUpdate] = useState(false);

  console.log(loggedAs);

  useEffect(() => {
    if (loggedAs) {
      const fetchAllLikes = async () => {
        const res = await axios.get("http://localhost:8800/likes");
        const allLikes = res.data;
        const filteredLikeObj = allLikes.filter(
          (obj) => obj.user_id === loggedAs.user.id
        );
        const likedImages = filteredLikeObj.map((obj) => obj.public_id);
        setLikeIds(likedImages);
        setLikes(filteredLikeObj);
        setAllLikes(res.data);
      };
      fetchAllLikes();
    }
  }, [update]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
    console.log("testing");
  }, []);

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

  async function handleLike(meme) {
    axios
      .post("http://localhost:8800/likes ", {
        ...likedData,
        publicId: meme.publicId,
        likedBy: loggedAs.user.id,
      })
      .then(() => {
        setUpdate((prev) => !prev);
      });
  }

  async function handleUnLike(meme) {
    let likeId;
    likes.map((like) => {
      if (like.public_id === meme.publicId) {
        likeId = like.id;
      }
    });
    console.log(likeId);

    await axios.delete(`http://localhost:8800/likes/${likeId}`).then(() => {
      setUpdate((prev) => !prev);
    });
  }

  function Meme(props) {
    console.log(props.meme);
    let name;
    users.map((user) => {
      if (props.meme.createdBy === user.id) {
        return (name = user.username);
      }
    });
    let likeCount = 0;
    allLikes &&
      allLikes.map((like) => {
        if (props.meme.publicId === like.public_id) {
          likeCount++;
        }
      });
    return (
      <>
        <div className="relative meme mx-auto pt-20">
          <div className="flex justify-between">
            <p className="text-white text-l mb-2">posted by: {name}</p>
            <p className="text-white">👍 {likeCount}</p>
          </div>
          <img src={props.meme.img} />
          <div className="flex">
            <div className="mx-auto flex gap-3  mt-2">
              {loggedAs.user.id === props.meme.createdBy && (
                <button
                  className="accent-btn"
                  onClick={() => handleDelete(props.meme)}
                >
                  Delete
                </button>
              )}
              {loggedAs.user.id !== props.meme.createdBy &&
              likeIds &&
              !likeIds.includes(props.meme.publicId) ? (
                <button
                  className="accent-btn "
                  onClick={() => handleLike(props.meme)}
                >
                  Like
                </button>
              ) : (
                loggedAs.user.id !== props.meme.createdBy && (
                  <button
                    className="accent-btn "
                    onClick={() => handleUnLike(props.meme)}
                  >
                    unLike
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className=" bg-slate-500 min-h-screen py-20">
      <section className="flex justify-center">
        <div className="inline-flex flex-col gap-5 my-32 ">
          {memes.map((meme, idx) => {
            return <Meme key={idx} idx={idx} meme={meme} />;
          })}
        </div>
      </section>
    </div>
  );
}
