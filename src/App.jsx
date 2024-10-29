import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AllRuns from "./pages/AllRuns";
import AllShoes from "./pages/AllShoes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-shoes" element={<AllShoes />} />
        <Route path="/all-runs" element={<AllRuns />} />
      </Routes>
    </Router>
  );
}
