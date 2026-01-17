import { AxiosError } from 'axios';
import { FORM_MESSAGES } from '../constants/constants';

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

/**
 * Extrae el mensaje de error de una excepción Axios
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    return data?.message || error.message || FORM_MESSAGES.ERROR_GENERIC;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return FORM_MESSAGES.ERROR_GENERIC;
};

/**
 * Valida si un error es de autenticación
 */
export const isAuthError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 401 || error.response?.status === 403;
  }
  return false;
};

/**
 * Valida si un error es de validación
 */
export const isValidationError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 400;
  }
  return false;
};

/**
 * Valida si es error de recurso no encontrado
 */
export const isNotFoundError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 404;
  }
  return false;
};
