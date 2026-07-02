export interface FlightSearchItem {
  id: number;
  airlineName: string;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  availableSeats: number;
}

export interface FlightSearchResponse {
  items: FlightSearchItem[];
}

export interface FlightSearchParams {
  flightNumber?: string;
  airlineName?: string;
  estDepartureTimeFrom?: string;
  estDepartureTimeTo?: string;
}

export interface NewBookingRequest {
  flightId: number;
}


export interface NewIdResponse {
  id: number;
}

export interface BookingDetail {
  id: number;
  bookingDate: string;
  flightId: number;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
}
