import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    } catch (err: unknown) {
      const errorData = err as Record<string, string[]>;
      alert("Gagal daftar: " + JSON.stringify(errorData));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Daftar Akun
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
          Daftar Sekarang
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 font-bold">
          Login
        </Link>
      </p>
    </div>
  );
}
