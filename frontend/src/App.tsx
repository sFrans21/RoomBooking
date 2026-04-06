import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import RoomList from "./pages/RoomList";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem("access_token");
    return !!token;
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="font-bold text-2xl text-blue-600 tracking-tight"
            >
              Room <span className="text-gray-800">Booking</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Cari Ruang
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/my-bookings"
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Pesanan Saya
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<RoomList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/book/:roomId" element={<BookingForm />} />
          </Routes>
        </main>

        <footer className="text-center py-10 text-gray-400 text-sm">
          &copy; 2026 Luarsekolah Room Booking System. Built with 💙
        </footer>
      </div>
    </Router>
  );
}

export default App;
