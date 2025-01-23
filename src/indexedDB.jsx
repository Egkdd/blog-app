import { openDB } from "idb";

const DB_NAME = "blogApp";
const STORE_NAME = "postsStore";

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    },
  });
  return db;
};

export const addPostToDB = async (post) => {
  const db = await initDB();
  await db.add(STORE_NAME, post); 
};

export const getAllPostsFromDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME); 
};
