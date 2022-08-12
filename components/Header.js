import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  // console.log(session);
  const [open, setOpen] = useRecoilState(modalState);

  const router = useRouter();

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div
        className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto
      "
      >
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png"
            className="object-contain"
            layout="fill"
            alt="logo"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png"
            className="object-contain"
            layout="fill"
            alt="logo2"
          />
        </div>

        {/*Search Form */}

        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <SearchIcon className="h-5 text-gray-500 " />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50  pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {/*Right Section of a Header */}
        <div className="flex space-x-4 items-center">
          <HomeIcon
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
            onClick={() => router.push("/")}
          />
          {session ? (
            <>
              <PlusCircleIcon
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                onClick={() => setOpen(true)}
              />
              <picture>
                <img
                  onClick={signOut}
                  src={session.user.image}
                  alt="avatar"
                  className="h-10 rounded-full cursor-pointer"
                />
              </picture>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
