import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
    $image: String!
  ) {
    insertPost(
      body: $body
      subreddit_id: $subreddit_id
      title: $title
      username: $username
      image: $image
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      created_at
      post_id
      id
      text
      username
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      created_at
      post_id
      id
      upvote
      username
    }
  }
`;
