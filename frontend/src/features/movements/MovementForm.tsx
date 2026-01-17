import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { movementsService, Movement } from "../../api/movementsService";

const movementSchema = z.object({
  tipo: z.enum(["nacimiento", "muerte", "venta", "compra"]),
  especie: z.string().min(1, "Especie requerida"),
  cantidad: z.number().min(1, "Debe ser al menos 1"),
  notas: z.string().optional(),
  fecha: z.string(),
});

type MovementFormData = z.infer<typeof movementSchema>;

export default function MovementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: movement } = useQuery<Movement>(
    ["movement", id],
    () => movementsService.get(id!),
    { enabled: isEdit }
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MovementFormData>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      tipo: "nacimiento",
      fecha: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    if (movement) {
      const formData: MovementFormData = {
        tipo: movement.tipo,
        especie: movement.especie,
        cantidad: movement.cantidad,
        notas: movement.notas ?? undefined,
        fecha: typeof movement.fecha === 'string' ? movement.fecha : new Date(movement.fecha).toISOString().split('T')[0],
      };
      reset(formData);
    }
  }, [movement, reset]);

  const onSubmit = async (data: MovementFormData) => {
    try {
      if (isEdit) {
        await movementsService.update(id!, data);
        toast.success("Movimiento actualizado");
      } else {
        await movementsService.create(data);
        toast.success("Movimiento registrado");
      await queryClient.invalidateQueries({ queryKey: ["movements"] });
      }
      navigate("/movements");
    } catch {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">{isEdit ? "Editar Movimiento" : "Nuevo Movimiento"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Tipo</label>
          <select {...register("tipo")} className="w-full border px-2 py-1">
            <option value="nacimiento">Nacimiento</option>
            <option value="muerte">Muerte</option>
            <option value="venta">Venta</option>
            <option value="compra">Compra</option>
          </select>
          {errors.tipo && <span className="text-red-600">{errors.tipo.message}</span>}
        </div>
        <div>
          <label>Especie</label>
          <input {...register("especie")} className="w-full border px-2 py-1" />
          {errors.especie && <span className="text-red-600">{errors.especie.message}</span>}
        </div>
        <div>
          <label>Cantidad</label>
          <input {...register("cantidad", { valueAsNumber: true })} type="number" min="1" className="w-full border px-2 py-1" />
          {errors.cantidad && <span className="text-red-600">{errors.cantidad.message}</span>}
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
          <button type="button" onClick={() => navigate("/movements")} className="bg-gray-400 text-white px-4 py-2 rounded flex-1">Cancelar</button>
        </div>
      </form>
    </div>
  );
}