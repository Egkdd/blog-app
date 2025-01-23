import {useState} from "react";
import categories from "../../../data/categories.js";
import style from "./EditForm.module.scss";

export default function EditForm({ post, editPost, closeModal }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      ...post,
      title,
      description,
      category,
      updatedAt: new Date().toISOString(),
    };

    editPost(updatedPost);
    closeModal();
  };


  return (
    <form onSubmit={handleSubmit} className={style.editForm}>
      <h2>Edit Form</h2>
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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit">Save Post</button>
    </form>
  );
}