import minifaker from "minifaker";
import "minifaker/locales/en";
import { useState, useEffect } from "react";
import Story from "./Story";

function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);

  useEffect(() => {
    const storyUsers = minifaker.array(20, (index) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      //used 'https://pravatar.cc' to get random avatars
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: index,
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);
  return (
    <div
      className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none
    "
    >
      {storyUsers.map((user) => (
        <Story key={user.id} user={user} />
      ))}
    </div>
  );
}

export default Stories;
