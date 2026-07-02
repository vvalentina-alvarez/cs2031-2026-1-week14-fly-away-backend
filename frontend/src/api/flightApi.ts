import api from './client';
import type {
  FlightSearchParams,
  FlightSearchResponse,
  FlightSearchItem,
  NewBookingRequest,
  NewIdResponse,
  BookingDetail,
} from '../types/flight';

//GET /flights/search
export async function searchFlights(params: FlightSearchParams): Promise<FlightSearchItem[]> {
  //solo parámetros con valor
  const cleaned: Record<string, string> = {};
  (Object.keys(params) as (keyof FlightSearchParams)[]).forEach((key) => {
    const value = params[key];
    if (value && value.trim()) cleaned[key] = value.trim();
  });

  const { data } = await api.get<FlightSearchResponse>('/flights/search', { params: cleaned });
  return data.items;
}

//POST /flights/book reserva un vuelo para usuario autenticado
export async function bookFlight(payload: NewBookingRequest): Promise<NewIdResponse> {
  const { data } = await api.post<NewIdResponse>('/flights/book', payload);
  return data;
}

//GET /flights/book/{id} detalle de una reserva
export async function getBooking(id: number): Promise<BookingDetail> {
  const { data } = await api.get<BookingDetail>(`/flights/book/${id}`);
  return data;
}
