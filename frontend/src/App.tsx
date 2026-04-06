// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomList from "./pages/RoomList";
import BookingForm from "./pages/BookingForm"; // Tambahkan baris ini!

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 mb-6">
          <div className="container mx-auto font-bold text-xl text-blue-600">
            Luarsekolah Booking
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/book/:roomId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
