import { createContext, useContext, useState, useEffect } from "react";
import { getAllPostsFromDB, addPostToDB, initDB } from "../indexedDB.jsx";

const PostContext = createContext();

export const usePosts = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPostsFromDB();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const addPost = async (newPost) => {
    try {
      await addPostToDB(newPost);
      const updatedPosts = await getAllPostsFromDB();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const deletePost = async (id) => {
    const db = await initDB();
    await db.delete("postsStore", id);
    const updatedPosts = await getAllPostsFromDB();
    setPosts(updatedPosts);
  };

  const editPost = async (updatedPost) => {
    const db = await initDB();
    await db.put("postsStore", updatedPost);
    const updatedPosts = await getAllPostsFromDB();
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, editPost }}>
      {children}
    </PostContext.Provider>
  );
};
