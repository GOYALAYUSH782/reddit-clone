import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactTimeago from "react-timeago";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { ADD_COMMENT } from "../../graphql/mutations";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

type FormData = {
  comment: string;
};

const PostPage = () => {
  const {
    query: { postId },
  } = useRouter();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
  });

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  });

  const post: Post = data?.getPostByPostId;

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log(data);

    const notification = toast.loading("Posting your comment...");

    await addComment({
      variables: {
        post_id: postId,
        text: data?.comment,
        username: session?.user?.name,
      },
    });

    setValue("comment", "");
    toast.success("Comment successfully added!", {
      id: notification,
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-7">
      <Post post={post} />

      {post && (
        <>
          <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
            <p className="text-sm">
              Comment as{" "}
              <span className="text-red-500">{session?.user?.name}</span>
            </p>
            <form
              className="flex space-y-2 flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <textarea
                {...register("comment")}
                disabled={!session}
                className="h-24 rounded-md border p-2 pl-4 outline-none border-gray-200 disabled:bg-gray-50"
                placeholder={
                  session
                    ? "What are your thoughts?"
                    : "Please sign in to comment"
                }
              />
              <button
                disabled={!session}
                type="submit"
                className="rounded-full bg-red-500 p-3 text-white font-semibold disabled:bg-gray-200"
              >
                Comment
              </button>
            </form>
          </div>

          <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
            <hr className="py-2" />

            {post?.comments?.map((comment) => (
              <div
                className="relative flex items-center space-x-2 space-y-5"
                key={comment.id}
              >
                <hr className="absolute top-10 left-7 z-0 h-16 border" />
                <div className="z-50">
                  <Avatar seed={comment?.username} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 py-2">
                    <span className="font-semibold text-gray-600">
                      {comment.username}
                    </span>{" "}
                    • <ReactTimeago date={comment.created_at} />
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostPage;
