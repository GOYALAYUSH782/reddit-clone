import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  topic: string;
  index: number;
};
const SubredditRow = ({ topic, index }: Props) => {
  return (
    <div className="flex items-center space-x-2 bg-white px-4 py-2 last:rounded-b border-t ">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatar seed={`/subreddit/${topic}`} />
      <p className="truncate flex-1">{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="text-white bg-blue-500 px-3 rounded-full cursor-pointer">
          View
        </div>
      </Link>
    </div>
  );
};

export default SubredditRow;
