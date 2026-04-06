import { useEffect, useState, useCallback } from "react";
import { fetchMyBookings, deleteBooking } from "../services/api";

interface Booking {
  id: number;
  room_name: string;
  start_time: string;
  end_time: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchMyBookings();
      setBookings(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal memuat data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCancel = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
      try {
        await deleteBooking(id);
        alert("Pesanan berhasil dibatalkan!");
        setLoading(true);
        loadData();
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Gagal membatalkan";
        alert(errorMessage);
      }
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Memuat riwayat pesanan...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Riwayat Pemesanan Saya
        </h1>
        <button
          onClick={loadData}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
          <strong>Gagal Memuat:</strong> {error}
        </div>
      )}

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-5 font-semibold text-gray-700">Ruangan</th>
              <th className="p-5 font-semibold text-gray-700">Waktu</th>
              <th className="p-5 font-semibold text-gray-700 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-400">
                  Belum ada pesanan.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="p-5 font-bold text-blue-600">
                    {b.room_name || `Room #${b.id}`}
                  </td>
                  <td className="p-5 text-gray-600">
                    {new Date(b.start_time).toLocaleString("id-ID")}
                  </td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
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
