import Image from "next/image";
import React from "react";
import {
  HomeIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import {
  SparklesIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  PlusIcon,
  SpeakerWaveIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
      <div className="relative w-20 h-10 flex-shrink-0 cursor-pointer">
        {/* <Image src={"https://links.papareact.com/fqy"} layout="fill" alt="" /> */}
        <Link href="/">
          <Image
            objectFit="contain"
            src={
              "https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"
            }
            layout="fill"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          placeholder="Search Reddit"
          type="text"
          className="flex-1 outline-none bg-transparent"
        />
        <button type="button" hidden />
      </form>

      <div className="mx-5 items-center hidden space-mx-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />

        <hr className="h-10 mx-2 border border-gray-100" />

        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon className="icon" />
      </div>
      <div className="ml-5 items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 lg:flex p-2 border border-gray-100"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              alt=""
              layout="fill"
            />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">Sign Out</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 lg:flex p-2 border border-gray-100"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              alt=""
              layout="fill"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
};

export default Header;
