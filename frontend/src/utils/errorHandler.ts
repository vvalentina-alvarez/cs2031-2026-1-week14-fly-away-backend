import axios from 'axios';

//mensaje legible de error de axios
//reglas de negocio (ValidationException) -> ProblemDetail: { detail: "..." }
//validación de Jakarta (@Valid) -> texto plano: "Error en la validación: ..."

//traducción de los mensajes del backend (en inglés) a español amigable
const BACKEND_MESSAGES: Record<string, string> = {
  'Username already exists': 'El email ya está registrado.',
  'Password has no alphanumeric characters':
    'La contraseña debe tener al menos una mayúscula y un dígito.',
  'Username does not exist': 'Email o contraseña incorrectos.',
  'Cannot book a past flight': 'No puedes reservar un vuelo que ya partió.',
  'Overlapping flight found': 'Ya tienes una reserva que se cruza con este horario.',
  'You have already booked this flight': 'Ya reservaste este vuelo.',
  'Cannot reduce available seats less than zero':
    'No hay asientos disponibles en este vuelo.',
};

function translate(msg: string): string {
  return BACKEND_MESSAGES[msg.trim()] ?? msg;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    //no respuesta del servidor
    if (!error.response) {
      return 'No se pudo conectar con el servidor. ¿Está corriendo el backend en http://localhost:8080?';
    }

    const data = error.response.data;

    //problem detail
    if (data && typeof data === 'object' && 'detail' in data) {
      const detail = (data as { detail?: unknown }).detail;
      if (typeof detail === 'string' && detail.trim()) return translate(detail);
    }

    //responseEntity<String>: la validación de Jakarta manda un texto técnico con
    //nombres de clases Java. Lo reemplazamos por un mensaje amigable.
    if (typeof data === 'string' && data.trim()) {
      if (data.includes('Error en la validación')) {
        return 'Datos inválidos. Revisa que el nombre y apellido empiecen con mayúscula y que la contraseña tenga al menos 8 caracteres, una mayúscula y un dígito.';
      }
      return data;
    }

    switch (error.response.status) {
      case 401:
        return 'No autenticado. Inicia sesión para continuar.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 500:
        return 'Error interno del servidor. Verifica que el recurso exista.';
      default:
        return `Error inesperado (código ${error.response.status}).`;
    }
  }

  if (error instanceof Error) return error.message;
  return 'Ocurrió un error inesperado.';
}
