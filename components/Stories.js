import minifaker from "minifaker";
import "minifaker/locales/en";
import { useState, useEffect } from "react";
import Story from "./Story";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  const [currentUser] = useRecoilState(userState);

  useEffect(() => {
    const storyUsers = minifaker.array(20, (index) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      //used 'https://pravatar.cc' to get random avatars
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: index,
    }));
    setStoryUsers(storyUsers);
  }, []);
  return (
    <div
      className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none
    "
    >
      {currentUser && (
        <Story
          img={currentUser?.userImg}
          username={currentUser?.username}
          isUser="true"
        />
      )}
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div>
  );
}

export default Stories;
