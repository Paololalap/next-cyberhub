"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCheck,
  Trash2,
  Pin,
  PinOff,
  SquarePen,
  Ellipsis,
} from "lucide-react"; // Import the icons
import { useSession } from "next-auth/react";

export const Communityposts = ({ author }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const [editingComment, setEditingComment] = useState(null);
const [dropdownVisible, setDropdownVisible] = useState(null);
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/thread");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to toggle post expansion
  const toggleExpanded = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, expanded: !post.expanded } : post,
      ),
    );
  };

  // Function to handle comment text change
  const handleCommentChange = (postId, event) => {
    setCommentTexts((prevCommentTexts) => ({
      ...prevCommentTexts,
      [postId]: event.target.value,
    }));
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (postId) => {
    const commentText = commentTexts[postId] || "";

    // Check if the comment text is empty
    if (!commentText.trim()) {
      // If the comment is empty, return early without submitting
      return;
    }

    try {
      let pinStatus = "unpinned"; // Default pinStatus

      // Check if the user is an admin
      if (session?.user?.role === "admin") {
        pinStatus = "pinned";
      }

      // Fetch API endpoint for adding a comment
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: author,
          content: commentText,
          pinStatus: pinStatus,
          userID: session?.user?._id,
        }),
      });

      // If the request is successful, update the state with the new comment
      if (response.ok) {
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

  // Function to fetch comments for a specific post
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

  // Function to handle click on "Show Comments" button
  const handleCommentsClick = async (postId) => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((post) => post._id === postId);
    if (postIndex !== -1) {
      if (
        !updatedPosts[postIndex].comments ||
        updatedPosts[postIndex].comments.length === 0
      ) {
        const comments = await fetchComments(postId);
        updatedPosts[postIndex].comments = comments;
      }
      updatedPosts[postIndex].showComments =
        !updatedPosts[postIndex].showComments;
      setPosts(updatedPosts);
    }
  };

  // Function to handle comment deletion
  const handleCommentDelete = async (postId, commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== commentId,
                ),
              };
            }
            return post;
          });
        });
      } else {
        console.error("Failed to delete comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Function to handle pinning/unpinning comments
  const handlePinComment = async (postId, commentId, currentPinStatus) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pinStatus: currentPinStatus === "pinned" ? "unpinned" : "pinned",
        }),
      });

      if (response.ok) {
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: post.comments.map((comment) => {
                  if (comment._id === commentId) {
                    return {
                      ...comment,
                      pinStatus:
                        currentPinStatus === "pinned" ? "unpinned" : "pinned",
                    };
                  }
                  return comment;
                }),
              };
            }
            return post;
          });
        });
      } else {
        console.error("Failed to update pin status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };

  // Function to handle initiating comment edit
  const initiateCommentEdit = (postId, commentId, currentContent) => {
    setEditingComment({ postId, commentId, content: currentContent });
  };

  // Function to handle saving edited comment
  const handleSaveCommentEdit = async () => {
    const { postId, commentId, content } = editingComment;
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      });

      if (response.ok) {
        // Update the state with the edited comment content
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: post.comments.map((comment) => {
                  if (comment._id === commentId) {
                    return {
                      ...comment,
                      content: content,
                    };
                  }
                  return comment;
                }),
              };
            }
            return post;
          });
        });
        // Clear editing state
        setEditingComment(null);
      } else {
        console.error("Failed to update comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Function to handle canceling comment edit
  const cancelCommentEdit = () => {
    setEditingComment(null);
  };
const toggleDropdown = (postId) => {
  setDropdownVisible(dropdownVisible === postId ? null : postId);
};
  // Render UI
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 py-2">
      {posts.map((post) => (
        <div
          key={post._id}
          className="w-screen bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg"
        >
          <div className="mb-2 flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-gray-700">
              {post.author[0]}
            </div>
            <div className="ml-2 w-full px-2 py-2">{post.author}</div>
            <div className="relative inline-block text-left">
              <Ellipsis
                onClick={() => toggleDropdown(post._id)}
                className="cursor-pointer"
              />
              {dropdownVisible === post._id && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    onClick={() => handlePostReport(post._id)}
                    className="block cursor-pointer px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-100"
                  >
                    Report Post
                  </div>
                  {(session?.user?.role === "admin" ||
                    session?.user?._id === post.userID) && (
                    <div
                      onClick={() => handlePostDelete(post._id)}
                      className="block cursor-pointer px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                    >
                      Delete Post
                    </div>
                  )}
                </div>
              )}
            </div>
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
          <div className="border-2 border-solid border-black">
            <img src={post.imglink} alt="Post Image" />
          </div>
          <div className="my-4 flex justify-center border-b-2 border-t-2 border-black">
            <button
              className="px-4 py-4 font-bold"
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
                  <div
                    key={comment._id}
                    className="mb-2 border-2 border-black p-2"
                  >
                    <div className="flex items-center">
                      {/* Render icon based on pinStatus */}
                      {session?.user?.role === "admin" ? (
                        comment.pinStatus === "pinned" ? (
                          <Pin
                            className="mr-2 cursor-pointer text-green-500"
                            onClick={() =>
                              handlePinComment(
                                post._id,
                                comment._id,
                                comment.pinStatus,
                              )
                            }
                          />
                        ) : (
                          <PinOff
                            className="mr-2 cursor-pointer text-red-500"
                            onClick={() =>
                              handlePinComment(
                                post._id,
                                comment._id,
                                comment.pinStatus,
                              )
                            }
                          />
                        )
                      ) : (
                        comment.pinStatus === "pinned" && (
                          <CheckCheck className="mr-2 text-green-500" />
                        )
                      )}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold text-gray-700">
                        {comment.author[0]}
                      </div>
                      <div className="ml-2 w-full px-2 py-2">
                        {editingComment &&
                        editingComment.commentId === comment._id ? (
                          <input
                            type="text"
                            value={editingComment.content}
                            onChange={(e) =>
                              setEditingComment({
                                ...editingComment,
                                content: e.target.value,
                              })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                          />
                        ) : (
                          comment.content
                        )}
                      </div>
                      {/* Render edit icon if the session.user._id is the same as the comment userId */}
                      {session?.user?._id === comment.userID && (
                        <SquarePen
                          className="ml-auto cursor-pointer text-blue-500"
                          onClick={() =>
                            initiateCommentEdit(
                              post._id,
                              comment._id,
                              comment.content,
                            )
                          }
                        />
                      )}
                      {/* Render delete button for comments if the user is an admin */}
                      {session?.user?.role === "admin" && (
                        <button
                          onClick={() =>
                            handleCommentDelete(post._id, comment._id)
                          }
                          className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <Trash2 className="mr-1 inline-block h-6 w-6" />
                          Delete
                        </button>
                      )}
                    </div>
                    {/* Render save and cancel buttons when editing a comment */}
                    {editingComment &&
                      editingComment.commentId === comment._id && (
                        <div className="mt-2 flex">
                          <button
                            onClick={handleSaveCommentEdit}
                            className="mr-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelCommentEdit}
                            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                  </div>
                ))
              )}
              {/* Comment Input Field and Button */}
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  value={commentTexts[post._id] || ""}
                  onChange={(event) => handleCommentChange(post._id, event)}
                  placeholder="Write a comment..."
                  className="mr-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                />
                <button
                  onClick={() => handleCommentSubmit(post._id)}
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
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
