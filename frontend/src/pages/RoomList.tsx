// src/pages/RoomList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRooms } from "../services/api";

interface Room {
  id: number;
  name: string;
  capacity: number;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms()
      .then((data) => setRooms(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Minimalist Tanpa Basa-Basi */}
      <header className="mb-20 mt-10 text-center">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter italic uppercase">
          Focus Mode:{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">
            ON.
          </span>
        </h1>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 bg-zinc-100 animate-pulse rounded-3xl border border-zinc-200"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group relative bg-white rounded-3xl border border-zinc-200 p-2 hover:border-slate-900 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-slate-200"
            >
              <div className="bg-zinc-50 rounded-[22px] p-8 h-full transition-colors group-hover:bg-white">
                <div className="flex justify-between items-start mb-10">
                  <span className="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-100">
                    Tersedia
                  </span>
                  <div className="text-slate-300 group-hover:text-indigo-500 transition-colors">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-3xl font-extrabold text-slate-900 mb-1 leading-none">
                  {room.name}
                </h3>

                <p className="text-slate-400 text-sm mb-12 font-medium">
                  <span className="text-rose-500 font-bold">
                    {room.capacity} Orang
                  </span>{" "}
                  Max Capacity
                </p>

                <Link
                  to={`/book/${room.id}`}
                  className="flex items-center justify-center w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs group-hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:scale-[1.03] active:scale-95"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
