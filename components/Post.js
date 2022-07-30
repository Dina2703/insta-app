import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

function Post({ post }) {
  const { id, username, userImg, img, caption } = post;
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
      <div className="flex justify-between px-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
        </div>
        <BookmarkIcon className=" btn" />
      </div>

      {/*Post Comments*/}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>
      {/*Post Input box*/}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          className="border-none flex-1 focus:ring-0"
          type="text"
          placeholder="Enter your comment..."
        />
        <button className="text-blue-400 font-bold">Post</button>
      </form>
    </div>
  );
}

export default Post;
