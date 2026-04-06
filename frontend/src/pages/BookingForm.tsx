// src/pages/BookingForm.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking, type BookingData } from "../services/api";

export default function BookingForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState<Record<string, string[]> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload: BookingData = {
        room: parseInt(roomId!),
        start_time: startTime,
        end_time: endTime,
      };
      await createBooking(payload);
      alert("Booking Berhasil!");
      navigate("/");
    } catch (err: unknown) {
      const errorData = err as Record<string, string[]>;

      if (errorData.non_field_errors) {
        alert("Pemesanan Gagal: " + errorData.non_field_errors[0]);
      } else {
        setError(errorData);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Pemesanan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Waktu Mulai
          </label>
          <input
            type="datetime-local"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Waktu Selesai
          </label>
          <input
            type="datetime-local"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
            {Object.keys(error).map((key) => (
              <p key={key}>
                <span className="font-bold capitalize">{key}:</span>{" "}
                {Array.isArray(error[key])
                  ? error[key].join(", ")
                  : String(error[key])}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
        >
          Konfirmasi Pemesanan
        </button>
      </form>
    </div>
  );
}
