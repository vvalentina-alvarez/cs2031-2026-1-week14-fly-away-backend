import type { BookingDetail } from '../types/flight';
import { formatDisplayDate } from '../utils/dateUtils';

interface Props {
  booking: BookingDetail;
  //número secuencial POR USUARIO (posición en su lista). Si no se pasa, se usa el id real.
  displayNumber?: number;
}

//detalle de una reserva (GET /flights/book/{id})
export default function BookingCard({ booking, displayNumber }: Props) {
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">
          Vuelo {booking.flightNumber}
        </h3>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          Reserva #{displayNumber ?? booking.id}
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <Detail label="Salida" value={formatDisplayDate(booking.estDepartureTime)} />
        <Detail label="Llegada" value={formatDisplayDate(booking.estArrivalTime)} />
        <Detail label="Fecha de reserva" value={formatDisplayDate(booking.bookingDate)} />
        <Detail
          label="Pasajero"
          value={`${booking.customerFirstName} ${booking.customerLastName}`}
        />
      </dl>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="text-slate-700">{value}</dd>
    </div>
  );
}
