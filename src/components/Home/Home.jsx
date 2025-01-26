import { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext.jsx";
import Post from "../Post/Post.jsx";
import categories from "../../utils/categories.js";
import style from "./Home.module.scss";

export default function Home() {
  const { posts } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  return (
    <div className={style.home}>
      <h1>All Your Posts</h1>
      <div className={style.categoriesWrapper}>
        <ul className={style.categories}>
          {categories.map((category) => (
            <li key={category.value}>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={
                  selectedCategories.includes(category.name)
                    ? style.selected
                    : ""
                }
              >
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
      </div>
      <ul className={style.posts}>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
