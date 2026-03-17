import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadPage from "./components/UploadPage";
import HistoryPage from "./components/HistoryPage";
import MeetingPage from "./components/MeetingPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/meetings/:meetingId" element={<MeetingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
