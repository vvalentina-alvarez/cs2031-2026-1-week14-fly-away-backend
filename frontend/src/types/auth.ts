export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
}
