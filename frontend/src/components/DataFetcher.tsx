import React from 'react';

interface LoadingStateProps {
  isLoading: boolean;
  error?: Error | null;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
}

/**
 * Componente para manejar estados de carga y error
 */
export const DataFetcher: React.FC<LoadingStateProps> = ({
  isLoading,
  error,
  children,
  loadingMessage = 'Cargando...',
  errorMessage,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2" />
          <p className="text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-semibold">Error al cargar</p>
        <p className="text-sm">{errorMessage || error.message}</p>
      </div>
    );
  }

  return <>{children}</>;
};

interface EmptyStateProps {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Componente para mostrar cuando no hay datos
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No hay datos disponibles',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4">📭</div>
      <p className="text-gray-600 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
