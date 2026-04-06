import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import RoomList from "./pages/RoomList";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem("access_token");
    return !!token;
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="font-bold text-2xl text-blue-600">
              Room Booking
            </Link>

            {/* Navigasi hanya muncul jika sudah login */}
            {isLoggedIn && (
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Cari Ruang
                </Link>
                <Link
                  to="/my-bookings"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Pesanan Saya
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            {isLoggedIn ? (
              // Rute untuk user yang sudah Login
              <>
                <Route path="/" element={<RoomList />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/book/:roomId" element={<BookingForm />} />
                {/* Redirect jika akses /login saat sudah login */}
                <Route path="/login" element={<RoomList />} />
              </>
            ) : (
              // Rute untuk Guest (Hanya Login & Register)
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Paksa semua rute lain ke halaman Login jika belum masuk */}
                <Route path="*" element={<Login />} />
              </>
            )}
          </Routes>
        </main>

        <footer className="text-center py-10 text-gray-400 text-sm">
          &copy; Room Booking System.
        </footer>
      </div>
    </Router>
  );
}

export default App;
