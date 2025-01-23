import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import AddForm from "../Forms/AddForm/AddForm";
import style from "./Header.module.scss";
import logo from "../../assets/logo2.svg";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.navigation}>
      <img src={logo} alt="Logo icon" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </nav>

      <button onClick={openModal}>New Post</button>

      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <button onClick={closeModal} className={style.closeButton}>
              X
            </button>
            <AddForm addPost={usePosts().addPost} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
