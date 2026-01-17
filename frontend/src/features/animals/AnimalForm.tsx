import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { animalsService, Animal } from "../../api/animalsService";
import toast from "react-hot-toast";

const schema = z.object({
  especie: z.string().optional(),
  fechaIngreso: z.string().optional().nullable(),
  edad: z.string().optional().nullable(),
  peso: z.number().optional().nullable(),
  estado: z.enum(["saludable", "enfermo", "vendido", "muerto"]).optional(),
  cantidad: z.number().int().nonnegative().optional(),
  observaciones: z.string().optional()
});
type FormData = z.infer<typeof schema>;

export default function AnimalForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(!!id);
  const loadedRef = useRef(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit"
  });

  useEffect(() => {
    if (id && !loadedRef.current) {
      loadedRef.current = true;
      animalsService.get(id)
        .then((animal) => {
          // Transformar fecha ISO a formato YYYY-MM-DD para el input
          const formData: FormData = {
            ...animal,
            fechaIngreso: animal.fechaIngreso
              ? new Date(animal.fechaIngreso).toISOString().split('T')[0]
              : animal.fechaIngreso,
          };
          reset(formData);
        })
        .catch(() => {
          toast.error("No se pudo cargar el animal");
        })
        .finally(() => setPageLoading(false));
    } else if (!id && !loadedRef.current) {
      loadedRef.current = true;
      setPageLoading(false);
      reset({ cantidad: 1, estado: "saludable" });
    }
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (id) {
        await animalsService.update(id, data);
        toast.success("Animal actualizado");
      } else {
        await animalsService.create(data);
        toast.success("Animal creado");
      await queryClient.invalidateQueries({ queryKey: ["animals"] });
      }
      navigate("/animals");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error al guardar");
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl mb-4">{id ? "Editar Animal" : "Nuevo Animal"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Especie</label>
          <input {...register("especie")} className="w-full border p-2 rounded" />
          {errors.especie && <span className="text-red-600 text-sm">{errors.especie.message}</span>}
        </div>

        <div>
          <label className="block">Fecha de Ingreso</label>
          <input type="date" {...register("fechaIngreso")} className="w-full border p-2 rounded" />
          {errors.fechaIngreso && <span className="text-red-600 text-sm">{errors.fechaIngreso.message}</span>}
        </div>

        <div>
          <label className="block">Edad</label>
          <input type="text" placeholder="ej: 2 años" {...register("edad")} className="w-full border p-2 rounded" />
          {errors.edad && <span className="text-red-600 text-sm">{errors.edad.message}</span>}
        </div>

        <div>
          <label className="block">Peso (kg)</label>
          <input type="number" step="0.01" {...register("peso", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.peso && <span className="text-red-600 text-sm">{errors.peso.message}</span>}
        </div>

        <div>
          <label className="block">Estado</label>
          <select {...register("estado")} className="w-full border p-2 rounded">
            <option value="">Seleccionar estado</option>
            <option value="saludable">Saludable</option>
            <option value="enfermo">Enfermo</option>
            <option value="vendido">Vendido</option>
            <option value="muerto">Muerto</option>
          </select>
          {errors.estado && <span className="text-red-600 text-sm">{errors.estado.message}</span>}
        </div>

        <div>
          <label className="block">Cantidad</label>
          <input type="number" {...register("cantidad", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.cantidad && <span className="text-red-600 text-sm">{errors.cantidad.message}</span>}
        </div>

        <div>
          <label className="block">Observaciones</label>
          <textarea {...register("observaciones")} className="w-full border p-2 rounded" />
          {errors.observaciones && <span className="text-red-600 text-sm">{errors.observaciones.message}</span>}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? "Guardando..." : id ? "Guardar" : "Crear"}
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/animals")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}