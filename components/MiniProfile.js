import { useSession, signOut } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-center justify-between mt-14 ml-10 -scroll-ml-10">
      <picture>
        <img
          className="h-16 rounded-full border p-[2px]"
          src={session?.user.image}
          alt="avatar2"
        />
      </picture>
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to insta</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm">
        Sign out
      </button>
    </div>
  );
}

export default MiniProfile;
