import {useState} from "react";
import categories from "../../../data/categories.js";
import style from "./AddForm.module.scss";

export default function AddForm({ addPost, closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && category) {
      const newPost = { 
        title, 
        description, 
        category, 
        createdAt: new Date().toISOString() 
      };
      addPost(newPost); 
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.addForm}>
      <h2>Add New Form</h2>
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
      <button type="submit">Add Post</button>
    </form>
  );
}