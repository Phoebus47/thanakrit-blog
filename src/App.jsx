import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./contexts/authentication.jsx";
import { Toaster } from "sonner";

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <div className="App">
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      
      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App;
