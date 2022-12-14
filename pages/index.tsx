import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });
  const subreddits: Subreddit[] = data?.getSubredditWithLimit;

  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit</title>
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />

        <div className="hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white sticky top-36 mx-5 mt-5 lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {subreddits?.map((subreddit, i) => (
              <SubredditRow
                topic={subreddit?.topic}
                index={i}
                key={subreddit.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
