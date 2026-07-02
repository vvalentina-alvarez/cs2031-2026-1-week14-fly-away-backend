export interface UserRegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

//respuesta de GET /users/current
//back mapea a UserNoPasswordDTO, solo expone estos campos
//username = email

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
