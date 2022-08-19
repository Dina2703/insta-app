import { useEffect } from "react";
import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { userState } from "../atom/userAtom";
import { db } from "../firebase";

function Header() {
  // console.log(session);
  const [open, setOpen] = useRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(
            db,
            "users",
            user.auth.currentUser.providerData[0].uid
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
            console.log(currentUser);
          }
        };
        fetchUser();
      }
    });
  }, []);

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }

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
          {currentUser ? (
            <>
              <PlusCircleIcon
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                onClick={() => setOpen(true)}
              />
              <picture>
                <img
                  onClick={onSignOut}
                  src={currentUser.userImg}
                  alt="avatar"
                  className="h-10 rounded-full cursor-pointer"
                />
              </picture>
            </>
          ) : (
            <button onClick={() => router.push("/auth/signin")}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
