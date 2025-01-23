import style from "./Search.module.scss";
import { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext.jsx"; // Використовуємо контекст для отримання постів і функцій
import Post from "../Post/Post.jsx";
import EditForm from "../Forms/EditForm/EditForm.jsx";

export default function Search() {
  const { posts, deletePost, editPost } = usePosts(); // Отримуємо функції з контексту
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editPostData, setEditPostData] = useState(null);

  useEffect(() => {
    setFilteredPosts(posts); // Встановлюємо пости з контексту
  }, [posts]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleLocalEditClick = (post) => {
    setIsEditing(true);
    setEditPostData(post);
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditPostData(null);
  };

  return (
    <div className={style.search}>
      <h1>Search Posts</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button className={style.search} onClick={handleSearchClick}>
        Search
      </button>

      <ul className={style.posts}>
        {filteredPosts.length === 0 ? (
          <li className={style.none}>No posts found...</li>
        ) : (
          filteredPosts.map((post) => (
            <li key={post.id}>
              <Post
                post={post}
                handleEditClick={handleLocalEditClick} // Передаємо handleLocalEditClick
                deletePost={deletePost} // Передаємо deletePost
              />
            </li>
          ))
        )}
      </ul>

      {isEditing && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <button onClick={closeModal} className={style.closeButton}>
              X
            </button>
            <EditForm
              post={editPostData}
              editPost={editPost} // Передаємо editPost
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
