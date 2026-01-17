# Guía de Buenas Prácticas - Frontend

## 📁 Estructura de Carpetas

```
src/
├── api/              # Servicios API y tipos
├── components/       # Componentes reutilizables
├── constants/        # Constantes globales
├── features/         # Componentes específicos de entidades
├── hooks/            # Custom hooks
├── pages/            # Páginas principales
├── styles/           # Estilos globales
├── types/            # Tipos TypeScript globales
└── utils/            # Funciones utilitarias
```

## 🎯 Principios de Diseño

### 1. **Reutilización de Componentes**
- Usar componentes base como `FormField`, `DataTable`, `DataFetcher`
- Evitar duplicación de código

```tsx
import { FormField, FormButtons } from '../components';

<FormField label="Nombre" error={errors.nombre?.message}>
  <input {...register('nombre')} />
</FormField>
```

### 2. **Manejo de Errores Consistente**
- Usar `useFormSubmit` hook para formularios
- Usar `useDeleteHandler` para eliminar registros

```tsx
const { handleSubmit } = useFormSubmit({
  successMessage: 'Guardado',
  redirectTo: '/products',
});

const onSubmit = (data) => {
  handleSubmit(() => productService.create(data));
};
```

### 3. **Constantes Centralizadas**
- No usar "strings mágicos" directamente en código
- Importar de `constants/index.ts`

```tsx
// ✅ Correcto
import { FORM_MESSAGES, ROUTES } from '../constants';
toast.success(FORM_MESSAGES.SUCCESS_CREATE);
navigate(ROUTES.PRODUCTS);

// ❌ Evitar
toast.success('Creado');
navigate('/products');
```

### 4. **Tipado Fuerte**
- Usar tipos explícitos, evitar `any`
- Exportar Input types desde servicios

```tsx
// ✅ Correcto
import { productService, ProductInput } from '../api/productService';

const onSubmit = async (data: ProductInput) => {
  await productService.create(data);
};
```

### 5. **Queries Optimizadas**
- Usar `useDataQuery` hook para obtener datos
- Configurar cache y stale time apropiadamente

```tsx
import { useDataQuery } from '../hooks';

const { data, isLoading, error } = useDataQuery(
  ['animals'],
  () => animalsService.list()
);
```

## 📋 Checklist para Nuevos Componentes

- [ ] Usar tipos explícitos (no `any`)
- [ ] Agregar comentarios JSDoc para funciones públicas
- [ ] Reutilizar componentes base cuando sea posible
- [ ] Manejar estados de loading/error
- [ ] Validar inputs con Zod
- [ ] Usar hooks reutilizables para lógica común
- [ ] Memoizar si es necesario (React.memo, useMemo)

## 🔐 Seguridad

- ✅ JWT token en localStorage (con plan de migrar a HttpOnly cookies)
- ✅ CORS validado en backend
- ✅ Validación en cliente con Zod
- ✅ Sanitización de errores mostrados al usuario

## 📊 Performance

- Usar `React.memo` para componentes que reciben props complejas
- Usar `useCallback` en manejadores de eventos complejos
- Lazy load pages con React.lazy si es necesario
- Configurar staleTime y gcTime en queries

## 🧪 Testing

- Escribir tests para hooks personalizados
- Escribir tests para funciones utilitarias
- Usar MSW para mockear APIs en tests

## 📚 Recursos

- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev)
