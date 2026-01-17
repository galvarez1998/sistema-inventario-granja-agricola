import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { salesService, Sale } from "../../api/salesService";

const saleSchema = z.object({
  tipo: z.enum(["producto", "animal"]),
  referenciaId: z.string().min(1, "ID de referencia requerido"),
  precioTotal: z.number().min(0, "Debe ser mayor a 0"),
  cantidad: z.number().min(1, "Debe ser al menos 1"),
  fecha: z.string(),
  notas: z.string().optional(),
});

type SaleFormData = z.infer<typeof saleSchema>;

export default function SalesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: sale } = useQuery<Sale>(
    ["sale", id],
    () => salesService.get(id!),
    { enabled: isEdit }
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
    defaultValues: { 
      tipo: "producto",
      fecha: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    if (sale) {
      const formData: SaleFormData = {
        tipo: sale.tipo,
        referenciaId: sale.referenciaId,
        precioTotal: sale.precioTotal,
        cantidad: sale.cantidad,
        fecha: sale.fecha instanceof Date ? sale.fecha.toISOString().split('T')[0] : new Date(sale.fecha).toISOString().split('T')[0],
        notas: sale.notas ?? undefined,
      };
      reset(formData);
    }
  }, [sale, reset]);

  const onSubmit = async (data: SaleFormData) => {
    try {
      const payload = {
        ...data,
        fecha: new Date(data.fecha),
      };
      if (isEdit) {
        await salesService.update(id!, payload);
        toast.success("Venta actualizada");
      } else {
        await salesService.create(payload);
        toast.success("Venta creada");
      await queryClient.invalidateQueries({ queryKey: ["sales"] });
      }
      navigate("/sales");
    } catch {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">{isEdit ? "Editar Venta" : "Nueva Venta"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Tipo</label>
          <select {...register("tipo")} className="w-full border px-2 py-1">
            <option value="producto">Producto</option>
            <option value="animal">Animal</option>
          </select>
          {errors.tipo && <span className="text-red-600">{errors.tipo.message}</span>}
        </div>
        <div>
          <label>ID de Referencia</label>
          <input {...register("referenciaId")} className="w-full border px-2 py-1" />
          {errors.referenciaId && <span className="text-red-600">{errors.referenciaId.message}</span>}
        </div>
        <div>
          <label>Cantidad</label>
          <input {...register("cantidad", { valueAsNumber: true })} type="number" min="1" className="w-full border px-2 py-1" />
          {errors.cantidad && <span className="text-red-600">{errors.cantidad.message}</span>}
        </div>
        <div>
          <label>Precio Total</label>
          <input {...register("precioTotal", { valueAsNumber: true })} type="number" step="0.01" min="0" className="w-full border px-2 py-1" />
          {errors.precioTotal && <span className="text-red-600">{errors.precioTotal.message}</span>}
        </div>
        <div>
          <label>Fecha</label>
          <input {...register("fecha")} type="date" className="w-full border px-2 py-1" />
          {errors.fecha && <span className="text-red-600">{errors.fecha.message}</span>}
        </div>
        <div>
          <label>Notas</label>
          <textarea {...register("notas")} className="w-full border px-2 py-1" rows={3} />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Guardar</button>
          <button type="button" onClick={() => navigate("/sales")} className="bg-gray-400 text-white px-4 py-2 rounded flex-1">Cancelar</button>
        </div>
      </form>
    </div>
  );
}