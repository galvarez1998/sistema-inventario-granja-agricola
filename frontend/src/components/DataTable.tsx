import React from 'react';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableActionProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
}

interface DataTableProps<T extends { id: string }> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: (row: T) => TableActionProps[];
  emptyMessage?: string;
  loading?: boolean;
}

/**
 * Componente de tabla reutilizable con soporte para acciones
 */
export const DataTable = React.memo(function DataTable<T extends { id: string }>({
  columns,
  data,
  actions,
  emptyMessage = 'Sin datos',
  loading = false,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 text-sm text-gray-900">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right text-sm space-x-2 flex justify-end gap-2">
                  {actions(row).map((action, i) => (
                    <button
                      key={i}
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        action.variant === 'danger'
                          ? 'text-red-600 hover:bg-red-50 disabled:text-gray-400'
                          : 'text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

DataTable.displayName = 'DataTable';
