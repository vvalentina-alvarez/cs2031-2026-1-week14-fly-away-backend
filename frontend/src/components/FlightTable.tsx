import type { FlightSearchItem } from '../types/flight';
import { formatDisplayDate } from '../utils/dateUtils';

interface Props {
  flights: FlightSearchItem[];
  isAuthenticated: boolean;
  onBook: (flight: FlightSearchItem) => void;
  bookingFlightId: number | null; //vuelo con reserva en curso
}

export default function FlightTable({ flights, isAuthenticated, onBook, bookingFlightId }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Número</th>
            <th className="px-4 py-3">Aerolínea</th>
            <th className="px-4 py-3">Salida</th>
            <th className="px-4 py-3">Llegada</th>
            <th className="px-4 py-3">Asientos</th>
            <th className="px-4 py-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {flights.map((flight) => {
            const noSeats = flight.availableSeats <= 0;
            const isBooking = bookingFlightId === flight.id;
            return (
              <tr key={flight.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{flight.flightNumber}</td>
                <td className="px-4 py-3">{flight.airlineName}</td>
                <td className="px-4 py-3">{formatDisplayDate(flight.estDepartureTime)}</td>
                <td className="px-4 py-3">{formatDisplayDate(flight.estArrivalTime)}</td>
                <td className="px-4 py-3">
                  <span
                    className={noSeats ? 'text-red-600' : 'text-slate-700'}
                  >
                    {flight.availableSeats}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {isAuthenticated ? (
                    <button
                      className="btn-primary"
                      onClick={() => onBook(flight)}
                      disabled={isBooking || noSeats}
                      title={noSeats ? 'Sin asientos disponibles' : 'Reservar este vuelo'}
                    >
                      {isBooking ? 'Reservando...' : 'Reservar'}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">Inicia sesión para reservar</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
