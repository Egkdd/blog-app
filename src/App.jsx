import React from "react";
import { PostProvider } from "./context/PostContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About.jsx";
import Search from "./components/Search/Search.jsx";
import { Route, Routes } from "react-router-dom";
import AddForm from "./components/Forms/AddForm/AddForm.jsx";

export default function App() {
  return (
    <PostProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </PostProvider>
  );
}
