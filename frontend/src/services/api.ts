const BASE_URL = "http://127.0.0.1:8000/api";

export interface BookingPayload {
  room: number;
  start_time: string;
  end_time: string;
}

export const fetchRooms = async () => {
  const response = await fetch(`${BASE_URL}/rooms/`);
  if (!response.ok) throw new Error("Gagal mengambil data ruangan");
  return response.json();
};

export const createBooking = async (bookingData: BookingPayload) => {
  const response = await fetch(`${BASE_URL}/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};
