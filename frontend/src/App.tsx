import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomList from "./pages/RoomList";
import BookingForm from "./pages/BookingForm";
import Login from "./pages/Login"; // Tambahkan import ini

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="font-bold text-xl text-blue-600">
              Luarsekolah Booking
            </div>
            <a
              href="/login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Login
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:roomId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
