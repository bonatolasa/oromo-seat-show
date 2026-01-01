export interface Movie {
  id: string;
  title: string;
  titleOromo?: string;
  poster: string;
  backdrop?: string;
  genre: string[];
  duration: number;
  rating: number;
  releaseDate: string;
  language: string;
  synopsis: string;
  director: string;
  cast: string[];
  status: 'now_showing' | 'coming_soon';
  trailerUrl?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  theater: string;
  screen: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip';
  status: 'available' | 'selected' | 'booked';
  price: number;
}

export interface Booking {
  id: string;
  movieId: string;
  showtimeId: string;
  seats: Seat[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  ticketCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}
