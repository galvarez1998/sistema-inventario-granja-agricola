import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productService, Product } from "../../api/productService";

const productSchema = z.object({
  tipo: z.enum(["carne", "huevo", "miel"]),
  procedencia: z.string().optional(),
  peso: z.number().optional(),
  fechaSacrificio: z.string().optional(),
  fechaCaducidad: z.string().optional(),
  cantidadHuevos: z.number().optional(),
  fechaRecoleccionHuevos: z.string().optional(),
  cantidadMiel: z.number().optional(),
  fechaExtraccionMiel: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: product } = useQuery<Product>(
    ["product", id],
    () => productService.get(id!),
    { enabled: isEdit }
  );

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { tipo: "carne" }
  });

  const tipo = watch("tipo");

  useEffect(() => {
    if (product) {
      const formData: ProductFormData = {
        tipo: product.tipo,
        procedencia: product.procedencia ?? undefined,
        peso: product.peso ?? undefined,
        fechaSacrificio: product.fechaSacrificio ?? undefined,
        fechaCaducidad: product.fechaCaducidad ?? undefined,
        cantidadHuevos: product.cantidadHuevos ?? undefined,
        fechaRecoleccionHuevos: product.fechaRecoleccionHuevos ?? undefined,
        cantidadMiel: product.cantidadMiel ?? undefined,
        fechaExtraccionMiel: product.fechaExtraccionMiel ?? undefined,
      };
      reset(formData);
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEdit) {
        await productService.update(id!, data);
        toast.success("Producto actualizado");
      } else {
        await productService.create(data);
        toast.success("Producto creado");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
      navigate("/products");
    } catch {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">{isEdit ? "Editar Producto" : "Nuevo Producto"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Tipo</label>
          <select {...register("tipo")} className="w-full border px-2 py-1">
            <option value="carne">Carne</option>
            <option value="huevo">Huevo</option>
            <option value="miel">Miel</option>
          </select>
          {errors.tipo && <span className="text-red-600">{errors.tipo.message}</span>}
        </div>

        {tipo === "carne" && (
          <>
            <div>
              <label>Procedencia</label>
              <input {...register("procedencia")} className="w-full border px-2 py-1" />
            </div>
            <div>
              <label>Peso (kg)</label>
              <input {...register("peso", { valueAsNumber: true })} type="number" step="0.1" className="w-full border px-2 py-1" />
            </div>
            <div>
              <label>Fecha de Sacrificio</label>
              <input {...register("fechaSacrificio")} type="date" className="w-full border px-2 py-1" />
            </div>
            <div>
              <label>Fecha de Caducidad</label>
              <input {...register("fechaCaducidad")} type="date" className="w-full border px-2 py-1" />
            </div>
          </>
        )}

        {tipo === "huevo" && (
          <>
            <div>
              <label>Cantidad de Huevos</label>
              <input {...register("cantidadHuevos", { valueAsNumber: true })} type="number" min="0" className="w-full border px-2 py-1" />
            </div>
            <div>
              <label>Fecha de Recolección</label>
              <input {...register("fechaRecoleccionHuevos")} type="date" className="w-full border px-2 py-1" />
            </div>
          </>
        )}

        {tipo === "miel" && (
          <>
            <div>
              <label>Cantidad de Miel (L)</label>
              <input {...register("cantidadMiel", { valueAsNumber: true })} type="number" step="0.1" min="0" className="w-full border px-2 py-1" />
            </div>
            <div>
              <label>Fecha de Extracción</label>
              <input {...register("fechaExtraccionMiel")} type="date" className="w-full border px-2 py-1" />
            </div>
          </>
        )}

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Guardar</button>
          <button type="button" onClick={() => navigate("/products")} className="bg-gray-400 text-white px-4 py-2 rounded flex-1">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
