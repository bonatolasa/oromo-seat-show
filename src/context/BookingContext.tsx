import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, Showtime, Seat, Booking } from '@/types/movie';

interface BookingState {
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  selectedSeats: Seat[];
  booking: Booking | null;
}

interface BookingContextType extends BookingState {
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clearSeats: () => void;
  getTotalAmount: () => number;
  confirmBooking: () => Booking;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BookingState>({
    selectedMovie: null,
    selectedShowtime: null,
    selectedSeats: [],
    booking: null,
  });

  const setSelectedMovie = (movie: Movie | null) => {
    setState(prev => ({ ...prev, selectedMovie: movie }));
  };

  const setSelectedShowtime = (showtime: Showtime | null) => {
    setState(prev => ({ ...prev, selectedShowtime: showtime, selectedSeats: [] }));
  };

  const addSeat = (seat: Seat) => {
    setState(prev => ({
      ...prev,
      selectedSeats: [...prev.selectedSeats, { ...seat, status: 'selected' }],
    }));
  };

  const removeSeat = (seatId: string) => {
    setState(prev => ({
      ...prev,
      selectedSeats: prev.selectedSeats.filter(s => s.id !== seatId),
    }));
  };

  const clearSeats = () => {
    setState(prev => ({ ...prev, selectedSeats: [] }));
  };

  const getTotalAmount = () => {
    return state.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const confirmBooking = (): Booking => {
    const booking: Booking = {
      id: `BK${Date.now()}`,
      movieId: state.selectedMovie?.id || '',
      showtimeId: state.selectedShowtime?.id || '',
      seats: state.selectedSeats,
      totalAmount: getTotalAmount(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ticketCode: `ORM${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };
    setState(prev => ({ ...prev, booking }));
    return booking;
  };

  const resetBooking = () => {
    setState({
      selectedMovie: null,
      selectedShowtime: null,
      selectedSeats: [],
      booking: null,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setSelectedMovie,
        setSelectedShowtime,
        addSeat,
        removeSeat,
        clearSeats,
        getTotalAmount,
        confirmBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
