import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      alert("Login Berhasil!");
      navigate("/");
    } catch {
      alert("Gagal Login. Cek kembali akun Anda.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Masuk ke Akun
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
          Login
        </button>
      </form>
    </div>
  );
}
