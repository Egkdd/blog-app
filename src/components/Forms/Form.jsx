import { useState, useEffect } from "react";
import categories from "../../data/categories.js";
import style from "./Form.module.scss";

export default function Form({ post = "", addPost, editPost, closeModal }) {
  const [title, setTitle] = useState(post?.title || ""); // Use optional chaining and default value
  const [description, setDescription] = useState(post?.description || "");
  const [category, setCategory] = useState(post?.category || "");
  

  useEffect(() => {
    if (post) {
      // Only update state if post exists
      setTitle(post.title);
      setDescription(post.description);
      setCategory(post.category);
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (title && description && category) {
    // Check if all fields are filled
    if (post) {
      const updatedPost = {
        ...post,
        title,
        description,
        category,
        updatedAt: new Date().toISOString(),
      };
      editPost(updatedPost);
    } else {
      const newPost = {
        title,
        description,
        category,
        createdAt: new Date().toISOString(),
      };
      addPost(newPost);
    }
    closeModal();
  }

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <button onClick={closeModal} className={style.closeButton}>
          X
        </button>
        <form onSubmit={handleSubmit} className={style.form}>
          <h2>{post ? "Edit Form" : "Add Form"}</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button type="submit">{post ? "Save" : "Add"}</button>
        </form>
      </div>
    </div>
  );
}
