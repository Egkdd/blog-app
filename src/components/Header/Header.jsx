import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import Form from "../Form/Form.jsx";
import style from "./Header.module.scss";
import logo from "../../assets/logo.svg";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const { addPost } = usePosts();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setPostToEdit(null);
  };

  const location = useLocation();

  return (
    <div className={style.navigation}>
      <img src={logo} alt="Logo icon" />
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? style.active : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? style.active : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={location.pathname === "/search" ? style.active : ""}
            >
              Search
            </Link>
          </li>
        </ul>
      </nav>

      <button onClick={openModal} className={style.button}>
        New Post
      </button>

      {isModalOpen && (
        <Form
          post={postToEdit}
          addPost={addPost}
          editPost={usePosts().editPost}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
