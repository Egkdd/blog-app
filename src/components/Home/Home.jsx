import { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext.jsx";
import categories from "../../data/categories.js";
import EditForm from "../Forms/EditForm/EditForm.jsx";
import style from "./Home.module.scss";
import Post from "../Post/Post.jsx";
import Form from "../Forms/Form.jsx";

export default function Home() {
  const { posts, deletePost, editPost } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleClearFilter = () => {
    setSelectedCategories([]);

    setFilteredPosts(posts);
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        selectedCategories.includes(post.category)
      );

      setFilteredPosts(filtered);
    }
  }, [selectedCategories, posts]);

  const handleEditClick = (post) => {
    setIsEditing(true);
    setEditPostData(post);
  };

  const closeModal = () => {
    setIsEditing(false); // Закриваємо модальне вікно після редагування
    setEditPostData(null);
  };

  return (
    <div>
      <h1>All Your Posts</h1>
      <ul className={style.categories}>
        {categories.map((category) => (
          <li key={category.value}>
            <button onClick={() => handleCategoryClick(category.name)}>
              {category.name}
            </button>
          </li>
        ))}
        <li>
          <button className={style.clear} onClick={handleClearFilter}>
            Clear Filter
          </button>
        </li>
      </ul>
      {isEditing && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <button onClick={closeModal} className={style.closeButton}>
              X
            </button>
            <EditForm
              post={editPostData}
              editPost={editPost}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      <ul className={style.posts}>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <Post
              post={post}
              handleEditClick={handleEditClick}
              deletePost={deletePost}
              openModal={openModal}
            />
          </li>
        ))}
      </ul>
      </div>
  );
}
