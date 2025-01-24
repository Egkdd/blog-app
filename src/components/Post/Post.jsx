import { useState } from "react";
import { usePosts } from "../../context/PostContext";
import Form from "../Form/Form.jsx";
import style from "./Post.module.scss";

export default function Post({ post }) {
  const { deletePost, editPost } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.post}>
      <h2 className={style.title}>{post.title}</h2>
      <p className={style.description}>{post.description}</p>
      <p className={style.category}>{post.category}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
      {post.updatedAt && (
        <p>Updated at: {new Date(post.updatedAt).toLocaleDateString()}</p>
      )}
      <button onClick={handleEditClick} className={style.button}>
        Edit
      </button>
      <button onClick={() => deletePost(post.id)} className={style.button}>
        Delete
      </button>

      {isModalOpen && (
        <Form
          post={post}
          addPost={usePosts().addPost}
          editPost={editPost}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
