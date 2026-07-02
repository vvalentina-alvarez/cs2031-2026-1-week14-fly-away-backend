import { useState, type FormEvent } from 'react';
import { searchFlights, bookFlight, getBooking } from '../api/flightApi';
import type { FlightSearchItem, BookingDetail } from '../types/flight';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errorHandler';
import { toISOStringZ } from '../utils/dateUtils';
import { addBookingId } from '../utils/storage';
import FlightTable from '../components/FlightTable';
import BookingCard from '../components/BookingCard';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

export default function FlightSearchPage() {
  const { isAuthenticated, user } = useAuth();

  //filtros
  const [flightNumber, setFlightNumber] = useState('');
  const [airlineName, setAirlineName] = useState('');
  const [departureFrom, setDepartureFrom] = useState(''); //datetime-local
  const [departureTo, setDepartureTo] = useState('');

  //resultados
  const [flights, setFlights] = useState<FlightSearchItem[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  //reserva
  const [bookingFlightId, setBookingFlightId] = useState<number | null>(null);
  const [bookError, setBookError] = useState<string | null>(null);
  const [bookSuccess, setBookSuccess] = useState<string | null>(null);
  const [lastBooking, setLastBooking] = useState<BookingDetail | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setBookError(null);
    setBookSuccess(null);
    setLastBooking(null);
    setSearching(true);
    try {
      const results = await searchFlights({
        flightNumber,
        airlineName,
        estDepartureTimeFrom: departureFrom ? toISOStringZ(departureFrom) : undefined,
        estDepartureTimeTo: departureTo ? toISOStringZ(departureTo) : undefined,
      });
      setFlights(results);
    } catch (err) {
      setSearchError(getErrorMessage(err));
      setFlights(null);
    } finally {
      setSearching(false);
    }
  };

  const handleBook = async (flight: FlightSearchItem) => {
    setBookError(null);
    setBookSuccess(null);
    setLastBooking(null);
    setBookingFlightId(flight.id);
    try {
      const { id } = await bookFlight({ flightId: flight.id });
      if (user) addBookingId(user.username, id); //guardar id por usuario para "Mis Reservas"
      setBookSuccess(`¡Reserva creada! ID de reserva: ${id} (vuelo ${flight.flightNumber}).`);

      //detalle de la reserva
      try {
        const detail = await getBooking(id);
        setLastBooking(detail);
      } catch {
      }
    } catch (err) {
      setBookError(getErrorMessage(err));
    } finally {
      setBookingFlightId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Buscar vuelos</h1>
        <p className="text-sm text-slate-500">
          Filtra por número de vuelo, aerolínea y rango de fechas de salida.
        </p>
      </div>

      <form onSubmit={handleSearch} className="card space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="flightNumber">
              Número de vuelo
            </label>
            <input
              id="flightNumber"
              className="input"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="LA123"
            />
          </div>
          <div>
            <label className="label" htmlFor="airlineName">
              Aerolínea
            </label>
            <input
              id="airlineName"
              className="input"
              value={airlineName}
              onChange={(e) => setAirlineName(e.target.value)}
              placeholder="LATAM"
            />
          </div>
          <div>
            <label className="label" htmlFor="departureFrom">
              Salida desde
            </label>
            <input
              id="departureFrom"
              type="datetime-local"
              className="input"
              value={departureFrom}
              onChange={(e) => setDepartureFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="departureTo">
              Salida hasta
            </label>
            <input
              id="departureTo"
              type="datetime-local"
              className="input"
              value={departureTo}
              onChange={(e) => setDepartureTo(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={searching}>
          {searching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      <ErrorAlert message={searchError} />
      <ErrorAlert message={bookError} />
      <SuccessAlert message={bookSuccess} />

      {lastBooking && (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Detalle de tu reserva
          </h2>
          <BookingCard booking={lastBooking} />
        </div>
      )}

      {!isAuthenticated && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Inicia sesión para poder reservar vuelos.
        </p>
      )}

      {flights !== null && flights.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No se encontraron vuelos con esos criterios. Prueba con otros filtros.
        </div>
      )}

      {flights !== null && flights.length > 0 && (
        <FlightTable
          flights={flights}
          isAuthenticated={isAuthenticated}
          onBook={handleBook}
          bookingFlightId={bookingFlightId}
        />
      )}
    </div>
  );
}
