import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LikedQuotes from "./pages/LikedQuotes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liked" element={<LikedQuotes />} />
    </Routes>
  );
}
