import api from './client';
import type { AuthLoginRequest, AuthTokenResponse } from '../types/auth';

// POST /auth/login devuelve el JWT
export async function login(payload: AuthLoginRequest): Promise<AuthTokenResponse> {
  const { data } = await api.post<AuthTokenResponse>('/auth/login', payload);
  return data;
}
