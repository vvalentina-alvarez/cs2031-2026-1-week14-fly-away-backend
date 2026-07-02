import api from './client';
import type { UserRegisterRequest, CurrentUser } from '../types/user';
import type { NewIdResponse } from '../types/flight';

//POST /users/register crea usuario rol USER, devuelve id
export async function register(payload: UserRegisterRequest): Promise<NewIdResponse> {
  const { data } = await api.post<NewIdResponse>('/users/register', payload);
  return data;
}

//GET /users/current perfil del usuario autenticado
export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get<CurrentUser>('/users/current');
  return data;
}
