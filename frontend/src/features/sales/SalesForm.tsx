import React from "react";
import { useForm } from "react-hook-form";
import { salesService } from "../../api/salesService";
import Layout from "../../components/Layout";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

export default function SalesForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const sale = await salesService.create(data);
      toast.success("Venta registrada");
      // Generar factura simple con jsPDF
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Factura - Granja", 10, 20);
      doc.setFontSize(12);
      doc.text(`ID Venta: ${sale.id}`, 10, 30);
      doc.text(`Tipo: ${sale.tipo}`, 10, 40);
      doc.text(`Referencia: ${sale.referenciaId}`, 10, 50);
      doc.text(`Cantidad: ${sale.cantidad}`, 10, 60);
      doc.text(`Precio total: ${sale.precioTotal}`, 10, 70);
      doc.save(`factura_${sale.id}.pdf`);
    } catch (err) {
      toast.error("Error al registrar venta");
    }
  };
  return (
    <Layout>
      <div className="p-4 max-w-xl">
        <h2 className="mb-4">Registrar Venta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label>Tipo</label>
            <select {...register("tipo")} className="w-full border p-2 rounded">
              <option value="producto">Producto</option>
              <option value="animal">Animal</option>
            </select>
          </div>
          <div>
            <label>Referencia ID</label>
            <input {...register("referenciaId")} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label>Cantidad</label>
            <input type="number" {...register("cantidad", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label>Precio total</label>
            <input type="number" step="0.01" {...register("precioTotal", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registrar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}