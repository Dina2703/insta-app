import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  //get data from useSession and call it 'session'
  const { data: session } = useSession();

  console.log(comments);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes, session.user.uid]);

  async function sendComment(e) {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  }

  return (
    <div className="bg-white my-7 border  rounded-md">
      {/*Post Header */}
      <div
        className="flex
       items-center p-5"
      >
        <picture>
          <img
            src={userImg}
            alt="avatar"
            className="h-12 rounded-full object-cover border p-1 mr-3"
          />
        </picture>
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/*Post Header */}
      <picture>
        <img src={img} alt="feed" className="object-cover w-full" />
      </picture>
      {/*post Buttons */}

      {session && (
        <div className="flex justify-between px-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-400"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}

            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className=" btn" />
        </div>
      )}

      {/*Post Comments*/}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-2" key={comment.id}>
              <picture>
                <img
                  className="h-7 rounded-full object-cover"
                  src={comment.data().userImage}
                  alt="user-image"
                />
              </picture>

              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}
      {/*Post Input box*/}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200 "
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
