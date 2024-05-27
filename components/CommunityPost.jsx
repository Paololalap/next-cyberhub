"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CheckCheck,
  Ellipsis,
  Loader2,
  MessageCircle,
  Pin,
  PinOff,
  Search,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CommunityPosts({ author }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [visiblePostsCount, setVisiblePostsCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLoadMorePost, setIsLoadingLoadMorePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/thread");
      const data = await response.json();
      setPosts(data.posts);
      setFilteredPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    filterPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, searchQuery]);
  const filterPosts = () => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        return (
          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredPosts(filtered);
    }
  };
  // Function to toggle post expansion
  const toggleExpanded = (postId) => {
    setFilteredPosts((prevPosts) =>
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
    setIsLoading(true);
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
        setFilteredPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: [...post.comments, newComment.comment],
              };
            }
            setIsLoading(false);
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
    const updatedPosts = [...filteredPosts];
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
      setFilteredPosts(updatedPosts);
    }
  };

  // Function to handle comment deletion
  const handleCommentDelete = async (postId, commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFilteredPosts((prevPosts) => {
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
        setFilteredPosts((prevPosts) => {
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
        setFilteredPosts((prevPosts) => {
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

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch("/api/thread", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        setFilteredPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId),
        );
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const loadMorePosts = () => {
    setVisiblePostsCount((prevCount) => prevCount + 5);
  };

  function simulateEscKeyPress() {
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
      code: "Escape",
      which: 27,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  const handleKeyDown = (postId, event) => {
    if (event.key === "Enter") {
      handleCommentSubmit(postId);
    }
  };
  // Render UI
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 py-2">
      <div className="flex w-full flex-col items-center justify-center bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-md border border-gray-300 px-9 py-2 focus:outline-none focus-visible:ring focus-visible:ring-[#8a1438]"
          />
          <Search className="absolute left-2 top-1/2 size-5 -translate-y-1/2" />
        </div>
      </div>
      {filteredPosts.slice(0, visiblePostsCount).map((post) => (
        <div
          key={post._id}
          className="w-screen bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg"
        >
          <div className="mb-2 flex items-center">
            <Avatar className="grid place-items-center bg-gray-300 text-2xl font-bold text-gray-700">
              {/* {post.author[0]} */}
              {post.image ? post.image : post.author[0]}
            </Avatar>
            <div className="flex-1 px-2 py-2 font-bold">{post.author}</div>
            <div className="relative inline-block text-left">
              <Popover>
                <PopoverTrigger>
                  <Ellipsis />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {post._id && (
                    <>
                      <button className="block cursor-pointer px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-100">
                        Report Post
                      </button>
                      {(session?.user?.role === "admin" ||
                        session?.user?._id === post.userID) && (
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="block cursor-pointer px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                        >
                          Delete Post
                        </button>
                      )}
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="py-2 capitalize">
            {post.content.length > 250 ? (
              <>
                {post.expanded ? (
                  <span>{post.content}</span>
                ) : (
                  `${post.content.slice(0, 250)}...`
                )}
                &nbsp;
                <button
                  onClick={() => toggleExpanded(post._id)}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  {post.expanded ? "See less" : "See more"}
                </button>
              </>
            ) : (
              post.content
            )}
          </div>
          {post.imglink && (
            <div className="relative w-full">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={post.imglink}
                  fill
                  alt="Post Image"
                  className="rounded-md border border-black object-contain"
                />
              </AspectRatio>
            </div>
          )}
          <div className="mb-2 flex justify-center border-b border-black">
            <button
              className="my-1 flex gap-x-1 rounded-md p-3 font-bold transition-all hover:bg-gray-300"
              onClick={() => handleCommentsClick(post._id)}
            >
              <MessageCircle />
              {post.showComments ? "Hide Comments" : "Show Comments"} (
              {post.comments ? post.comments.length : 0})
            </button>
          </div>
          {post.showComments && (
            <div className="py-2">
              {post.comments.length === 0 ? (
                <p>No comments yet, you are the first one to comment.</p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment._id} className="group mt-2 first:mt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center">
                        <div
                          className={cn("flex", { "flex-1": editingComment })}
                        >
                          <Avatar className="grid place-items-center bg-gray-300 text-2xl font-bold text-gray-700">
                            {comment.author[0]}
                          </Avatar>
                          <div
                            className={cn(
                              "mx-2 rounded-lg bg-gray-300 px-2 py-2",
                              { "flex-1 bg-transparent p-0": editingComment },
                            )}
                          >
                            {editingComment &&
                            editingComment.commentId === comment._id ? (
                              <Textarea
                                value={editingComment.content}
                                onChange={(e) =>
                                  setEditingComment({
                                    ...editingComment,
                                    content: e.target.value,
                                  })
                                }
                                className="w-full text-base focus:outline-none"
                              />
                            ) : (
                              <>
                                <span className="font-bold">
                                  {comment.author}
                                </span>
                                <br />
                                <p>{comment.content}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <Popover>
                          <PopoverTrigger>
                            <div
                              className={cn(
                                "mr-2 grid size-8 place-items-center rounded-full transition-all hover:bg-black/50 hover:text-white",
                                editingComment && "hidden",
                              )}
                            >
                              <Ellipsis className="invisible group-hover:visible" />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-min p-0">
                            {session?.user?._id === comment.userID && (
                              <button
                                className="cursor-pointer whitespace-nowrap px-3 py-2 hover:rounded-t-md hover:bg-gray-300"
                                onClick={() => {
                                  initiateCommentEdit(
                                    post._id,
                                    comment._id,
                                    comment.content,
                                  );
                                  simulateEscKeyPress();
                                }}
                              >
                                Edit Comment
                              </button>
                            )}
                            {session?.user?.role === "admin" && (
                              <button
                                onClick={() => {
                                  handleCommentDelete(post._id, comment._id);
                                  simulateEscKeyPress;
                                }}
                                className="w-full whitespace-nowrap px-3 py-2 text-red-500 hover:rounded-b-md hover:bg-gray-300 hover:text-red-700 focus:outline-none"
                              >
                                Delete
                              </button>
                            )}
                          </PopoverContent>
                        </Popover>
                      </div>
                      {editingComment &&
                        editingComment.commentId === comment._id && (
                          <div className="flex gap-x-2">
                            <Button
                              onClick={handleSaveCommentEdit}
                              className="bg-[#8a1438] hover:bg-[#8a1438]"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingComment(null)}
                              variant="secondary"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      {/* Render icon based on pinStatus */}
                      <div className="self-start">
                        {session?.user?.role === "admin" ? (
                          comment.pinStatus === "pinned" ? (
                            <div className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-black/20">
                              <Pin
                                className="size-6 text-green-500"
                                onClick={() =>
                                  handlePinComment(
                                    post._id,
                                    comment._id,
                                    comment.pinStatus,
                                  )
                                }
                              />
                            </div>
                          ) : (
                            <div className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-black/20">
                              <PinOff
                                className="size-6 text-red-500"
                                onClick={() =>
                                  handlePinComment(
                                    post._id,
                                    comment._id,
                                    comment.pinStatus,
                                  )
                                }
                              />
                            </div>
                          )
                        ) : (
                          comment.pinStatus === "pinned" && (
                            <CheckCheck className="mr-2 text-green-500" />
                          )
                        )}
                      </div>
                    </div>
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
                  onKeyDown={(event) => handleKeyDown(post._id, event)}
                  className="mr-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                />
                <Button
                  onClick={() => handleCommentSubmit(post._id)}
                  className="bg-[#8a1438] hover:bg-[#8a1438]/90"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      {visiblePostsCount < posts.length && (
        <Button
          onClick={loadMorePosts}
          className="bg-[#8a1438] hover:bg-[#8a1438]/90"
        >
          {isLoadingLoadMorePost && (
            <Loader2 className="mr-2 size-4 animate-spin" />
          )}
          Load More
        </Button>
      )}
    </div>
  );
}
