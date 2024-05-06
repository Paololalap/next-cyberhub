"use client";
import React, { useState, useEffect } from "react";

export const Communityposts = ({ author }) => {
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  useEffect(() => {
    // Fetch posts from the API
    fetch("/api/thread")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const toggleExpanded = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, expanded: !post.expanded } : post
      )
    );
  };

  const handleCommentChange = (postId, event) => {
    setCommentTexts((prevCommentTexts) => ({
      ...prevCommentTexts,
      [postId]: event.target.value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = commentTexts[postId] || "";

    // Check if the comment text is empty
    if (!commentText.trim()) {
      // If the comment is empty, return early without submitting
      return;
    }

    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: author,
          content: commentText,
        }),
      });
      if (response.ok) {
        // Update state with the new comment
        const newComment = await response.json();
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: [...post.comments, newComment.comment],
              };
            }
            return post;
          });
        });
        // Clear the comment input field after submission
        setCommentTexts((prevCommentTexts) => ({
          ...prevCommentTexts,
          [postId]: "",
        }));
      } else {
        console.error("Failed to submit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`/api/comments/${postId}`);
      const data = await response.json();
      return data.comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const handleCommentsClick = async (postId) => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((post) => post._id === postId);
    if (postIndex !== -1) {
      if (
        !updatedPosts[postIndex].comments ||
        updatedPosts[postIndex].comments.length === 0
      ) {
        const comments = await fetchComments(postId); // Fetch comments for the specific post
        updatedPosts[postIndex].comments = comments;
      }
      updatedPosts[postIndex].showComments =
        !updatedPosts[postIndex].showComments;
      setPosts(updatedPosts);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 py-2">
      {posts.map((post) => (
        <div
          key={post._id}
          className="w-screen sm:max-w-2xl p-6 bg-white sm:rounded-lg shadow-md"
        >
          <div className="flex items-center mb-2">
            <div className="font-bold text-2xl rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-700">
              {post.author[0]}
            </div>
            <div className="ml-2 w-full px-2 py-2">{post.author}</div>
          </div>
          <div className="ml-2 w-full px-2 py-2">
            {post.expanded ? post.content : `${post.content.slice(0, 150)}...`}
            <button
              onClick={() => toggleExpanded(post._id)}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {post.expanded ? "See less" : "See more"}
            </button>
          </div>
          <div className="border-solid border-2 border-black">
            <img src={post.imglink} alt="Post Image" />
          </div>
          <div className="my-4 flex justify-center border-b-2 border-t-2 border-black">
            <button
              className="font-bold py-4 px-4"
              onClick={() => handleCommentsClick(post._id)}
            >
              {post.showComments ? "Hide Comments" : "Show Comments"} (
              {post.comments ? post.comments.length : 0})
            </button>
          </div>
          {post.showComments && (
            <div className="p-4">
              {post.comments.length === 0 ? (
                <p>No comments yet, you are the first one to comment.</p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment._id} className="mb-2 border-2 border-black">
                    <div className="flex items-center p-2">
                      <div className="font-bold text-2xl rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-700">
                        {comment.author[0]}
                      </div>
                      <div className="ml-2 w-full px-2 py-2">
                        {comment.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {/* Comment Input Field and Button */}
              <div className="flex items-center mt-4">
                <input
                  type="text"
                  value={commentTexts[post._id] || ""}
                  onChange={(event) => handleCommentChange(post._id, event)}
                  placeholder="Write a comment..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none"
                />
                <button
                  onClick={() => handleCommentSubmit(post._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

