import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ProfileInput from "./pages/ProfileInput";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/input" element={<ProfileInput />} />
        <Route path="/results" element={<Results />} />

        {/* IMPORTANT: DO NOT place any routes below this. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;