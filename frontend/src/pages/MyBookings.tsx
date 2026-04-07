import { useEffect, useState, useCallback } from "react";
import { fetchMyBookings, deleteBooking } from "../services/api";

interface Booking {
  id: number;
  room_name: string;
  room: number;
  start_time: string;
  end_time: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (dateToFilter?: string) => {
    setLoading(true);
    try {
      const data = await fetchMyBookings(dateToFilter);
      setBookings(data);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal memuat data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(filterDate);
  }, [filterDate, loadData]);

  const handleCancel = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
      try {
        await deleteBooking(id);
        alert("Pesanan berhasil dibatalkan!");
        loadData(filterDate);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "Gagal membatalkan");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {error && (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl mb-6 border border-rose-100 text-sm font-bold">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">
            My <span className="text-indigo-600">Schedule</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Kelola semua pesanan ruanganmu di sini.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Filter by Date
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-white border-2 border-zinc-200 px-4 py-2.5 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all shadow-sm"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate("")}
              className="text-[10px] font-bold text-rose-500 uppercase text-right hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="p-6 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Ruangan
              </th>
              <th className="p-6 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Waktu
              </th>
              <th className="p-6 text-right font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-20 text-center animate-pulse font-bold text-slate-300 italic text-2xl"
                >
                  Updating schedule...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-20 text-center text-slate-400 font-medium italic"
                >
                  Tidak ada jadwal ditemukan.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-indigo-50/30 transition-colors group"
                >
                  <td className="p-6 font-extrabold text-slate-900 text-lg">
                    {b.room_name || `Room #${b.room}`}{" "}
                    {/* Properti b.room sekarang valid */}
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-slate-700">
                      {new Date(b.start_time).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-xs font-bold text-indigo-500 uppercase mt-1">
                      {new Date(b.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(b.end_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="bg-white text-rose-500 border-2 border-rose-100 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm"
                    >
                      Batal
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
