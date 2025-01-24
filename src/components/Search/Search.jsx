import { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext.jsx";
import Post from "../Post/Post.jsx";
import style from "./Search.module.scss";

export default function Search() {
  const { posts } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts.length]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setHasSearched(true);
    if (searchQuery.trim() === "") {
      setFilteredPosts([]);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
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

      {hasSearched && (
        <ul className={style.posts}>
          {filteredPosts.length === 0 ? (
            <li className={style.none}>No posts found...</li>
          ) : (
            filteredPosts.map((post) => (
              <li key={post.id}>
                <Post post={post} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
