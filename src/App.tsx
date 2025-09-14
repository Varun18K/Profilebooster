import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Existing pages
import Landing from "./pages/Landing";
import ProfileInput from "./pages/ProfileInput";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing / Main flow */}
        <Route path="/" element={<Landing />} />
        <Route path="/input" element={<ProfileInput />} />
        <Route path="/results" element={<Results />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
