import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/post/:id" element={<PostPage />} /> */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
