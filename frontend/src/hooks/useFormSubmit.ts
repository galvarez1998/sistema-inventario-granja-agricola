import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FORM_MESSAGES } from '../constants/constants';
import { getErrorMessage } from '../utils/errorHandler';

interface UseFormSubmitOptions {
  onSuccess?: (message?: string) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Hook personalizado para manejo común de envío de formularios
 */
export const useFormSubmit = (options: UseFormSubmitOptions = {}) => {
  const navigate = useNavigate();
  const {
    onSuccess,
    onError,
    redirectTo,
    successMessage = FORM_MESSAGES.SUCCESS_CREATE,
    errorMessage = FORM_MESSAGES.ERROR_SAVE,
  } = options;

  const handleSubmit = useCallback(
    async (submitFn: () => Promise<any>) => {
      try {
        await submitFn();
        toast.success(successMessage);
        onSuccess?.();
        
        if (redirectTo) {
          setTimeout(() => navigate(redirectTo), 500);
        }
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(errorMessage === FORM_MESSAGES.ERROR_SAVE ? message : errorMessage);
        onError?.(error instanceof Error ? error : new Error(message));
      }
    },
    [navigate, redirectTo, successMessage, errorMessage, onSuccess, onError]
  );

  return { handleSubmit };
};

/**
 * Hook para manejo de eliminar registros con confirmación
 */
export const useDeleteHandler = () => {
  const handleDelete = useCallback(async (deleteFn: () => Promise<void>, label: string = 'registro') => {
    if (!window.confirm(`¿Seguro que deseas eliminar este ${label}?`)) {
      return false;
    }

    try {
      await deleteFn();
      toast.success(FORM_MESSAGES.SUCCESS_DELETE);
      return true;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(FORM_MESSAGES.ERROR_DELETE);
      console.error('Delete error:', error);
      return false;
    }
  }, []);

  return { handleDelete };
};
