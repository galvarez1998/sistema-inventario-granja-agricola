import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Wrapper reutilizable para campos de formulario con etiqueta y mensajes de error
 */
export const FormField: React.FC<FormFieldProps> = ({ label, error, required, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

interface FormButtonsProps {
  isSubmitting?: boolean;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

/**
 * Botones estándar para formularios
 */
export const FormButtons: React.FC<FormButtonsProps> = ({
  isSubmitting = false,
  onCancel,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
}) => {
  return (
    <div className="flex gap-2 mt-6">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
      >
        {cancelLabel}
      </button>
    </div>
  );
};
