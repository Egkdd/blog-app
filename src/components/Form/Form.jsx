import { useState, useEffect } from "react";
import categories from "../../utils/categories.js";
import style from "./Form.module.scss";

export default function Form({ post, addPost, editPost, closeModal }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [description, setDescription] = useState(post ? post.description : "");
  const [category, setCategory] = useState(post ? post.category : "");
  const [error, setError] = useState("");

  const maxTitleLength = 30;
  const maxDescriptionLength = 500;

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setCategory(post.category);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length > maxTitleLength) {
      setError(`Title must be less than ${maxTitleLength} characters.`);
      return;
    }
    if (description.length > maxDescriptionLength) {
      setError(
        `Description must be less than ${maxDescriptionLength} characters.`
      );
      return;
    }

    if (title && description && category) {
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
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>{post ? "Edit Post" : "Add New Post"}</h2>
        <button onClick={closeModal} className={style.closeModal}>
          X
        </button>
        <form onSubmit={handleSubmit} className={style.form}>
          {error && <p className={style.error}>{error}</p>}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            maxLength={maxTitleLength}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            maxLength={maxDescriptionLength}
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
          <button type="submit" className={style.action}>
            {post ? "Save Post" : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
