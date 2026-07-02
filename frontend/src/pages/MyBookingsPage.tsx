import { useEffect, useState } from 'react';
import { getBooking } from '../api/flightApi';
import type { BookingDetail } from '../types/flight';
import { getBookingIds, setBookingIds } from '../utils/storage';
import { getErrorMessage } from '../utils/errorHandler';
import { useAuth } from '../hooks/useAuth';
import BookingCard from '../components/BookingCard';
import ErrorAlert from '../components/ErrorAlert';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //perfil cargue para saber de qué usuario son las reservas
    if (!user) return;

    let active = true;
    const ids = getBookingIds(user.username);

    if (ids.length === 0) {
      setBookings([]);
      setLoading(false);
      return;
    }

    //id guardado con GET /flights/book/{id}.
    Promise.allSettled(ids.map((id) => getBooking(id)))
      .then((results) => {
        if (!active) return;

        const fulfilled = results
          .filter((r): r is PromiseFulfilledResult<BookingDetail> => r.status === 'fulfilled')
          .map((r) => r.value);

        const mine = fulfilled.filter((b) => b.customerId === user.id);

        setBookingIds(user.username, mine.map((b) => b.id));

        setBookings(mine);
      })
      .catch((err) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mis reservas</h1>
        <p className="text-sm text-slate-500">
          Reservas guardadas en este navegador (localStorage).
        </p>
      </div>

      <ErrorAlert message={error} />

      {loading ? (
        <p className="text-slate-500">Cargando reservas...</p>
      ) : bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          Aún no tienes reservas. Ve a{' '}
          <a href="/search" className="font-medium text-brand-600 hover:underline">
            buscar vuelos
          </a>{' '}
          para reservar uno.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {bookings.map((b, i) => (
            <BookingCard key={b.id} booking={b} displayNumber={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
