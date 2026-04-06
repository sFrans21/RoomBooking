const BASE_URL = "http://127.0.0.1:8000/api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface BookingData {
  room: number;
  start_time: string;
  end_time: string;
}

export const fetchRooms = async () => {
  const response = await fetch(`${BASE_URL}/rooms/`);
  if (!response.ok) throw new Error("Gagal mengambil data ruangan");
  return response.json();
};

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Username atau Password salah");
  const data = await response.json();
  localStorage.setItem("access_token", data.access);
  return data;
};

export const createBooking = async (bookingData: BookingData) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${BASE_URL}/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};

export const fetchMyBookings = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${BASE_URL}/bookings/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
    throw new Error("Sesi habis, silakan login kembali");
  }

  if (!response.ok) throw new Error("Gagal mengambil riwayat pesanan");
  return response.json();
};

export const deleteBooking = async (id: number) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${BASE_URL}/bookings/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Gagal membatalkan pesanan");
  }

  return true;
};
