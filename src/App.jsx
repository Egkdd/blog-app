import { PostProvider } from "./context/PostContext";
import { Route, Routes } from "react-router-dom";
import { About, Form, Header, Home, Search } from "./components/index.jsx";

export default function App() {
  return (
    <PostProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </PostProvider>
  );
}
