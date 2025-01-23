import style from "./Post.module.scss";

export default function Post({ post, handleEditClick, deletePost }) {
  return (
    <div className={style.post}>
      <h2 className={style.title}>{post.title}</h2>
      <p className={style.description}>{post.description}</p>
      <p className={style.category}>{post.category}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
      {post.updatedAt && (
        <p>Updated at: {new Date(post.updatedAt).toLocaleDateString()}</p>
      )}
      <button onClick={() => handleEditClick(post)}>Edit</button>
      <button onClick={() => deletePost(post.id)}>Delete</button>
    </div>
  );
}
