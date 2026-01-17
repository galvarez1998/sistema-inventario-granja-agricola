import React from "react";

export default function ConfirmDialog({ onConfirm, onCancel, message }: { onConfirm: () => void; onCancel: () => void; message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-4">{message || "¿Estás seguro?"}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-3 py-1 border rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">Confirmar</button>
        </div>
      </div>
    </div>
  );
}