import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FORM_MESSAGES } from '../constants/constants';

/**
 * Hook wrapper para queries con configuración por defecto mejorada
 */
export function useDataQuery<TData = unknown, TError = Error>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
    ...options,
  });
}

/**
 * Hook para queries que deben refetchear cuando cambia un ID
 */
export function useDetailQuery<TData = unknown>(
  entityName: string,
  id: string | undefined,
  queryFn: (id: string) => Promise<TData>
) {
  return useDataQuery(
    [entityName, id],
    () => queryFn(id!),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 10, // 10 minutos
    }
  );
}
