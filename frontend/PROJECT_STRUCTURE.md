# Estructura del Proyecto Frontend

## 📂 Carpetas Principales

### `/api`
Contiene servicios API y tipos TypeScript para cada entidad.
- `animalsService.ts` - Servicio CRUD para animales
- `productService.ts` - Servicio CRUD para productos
- `productionService.ts` - Servicio para registros de producción
- `movementsService.ts` - Servicio para movimientos de animales
- `salesService.ts` - Servicio para ventas
- `hiveService.ts` - Servicio para colmenas
- `api.ts` - Configuración de Axios

**Patrón:** Cada servicio exporta `EntityType` e `EntityInput` para type-safety

### `/components`
Componentes reutilizables que se pueden usar en cualquier parte de la aplicación.
- `Header.tsx` - Barra de navegación
- `Layout.tsx` - Wrapper para páginas protegidas
- `FormField.tsx` - Wrapper para campos de formulario
- `DataFetcher.tsx` - Gestor de estados de carga/error
- `DataTable.tsx` - Tabla reutilizable con acciones
- `ConfirmDialog.tsx` - Diálogo de confirmación

### `/constants`
Valores constantes de la aplicación, evitando "magic strings".
- `constants.ts` - API config, tipos de entidades, mensajes, rutas

### `/features`
Componentes específicos de cada entidad (CRUD forms, listas).
- `/animals` - Componentes de animales
- `/products` - Componentes de productos
- `/production` - Componentes de producción
- `/movements` - Componentes de movimientos
- `/sales` - Componentes de ventas
- `/hives` - Componentes de colmenas
- `/auth` - Componentes de autenticación

### `/hooks`
Custom hooks reutilizables.
- `useAuth.tsx` - Contexto de autenticación
- `useFormSubmit.ts` - Manejo de envío de formularios
- `useDeleteHandler.ts` - Manejo de eliminación
- `useDataQuery.ts` - Wrapper para React Query

### `/pages`
Páginas principales de la aplicación.
- `Dashboard.tsx` - Panel principal
- `ProductsPage.tsx` - Lista de productos
- `ProductionPage.tsx` - Lista de producciones
- `SalesPage.tsx` - Lista de ventas
- `MovementsPage.tsx` - Lista de movimientos
- `HivesPage.tsx` - Lista de colmenas

### `/styles`
Estilos globales y configuración de Tailwind.
- `index.css` - Estilos globales

### `/utils`
Funciones utilitarias reutilizables.
- `errorHandler.ts` - Funciones para manejo de errores

## 🎯 Flujo de Datos

```
pages/ (punto de entrada)
  ↓
queries (useDataQuery hook)
  ↓
services (api/*)
  ↓
Backend (API REST)
```

## ✨ Patrones de Uso

### Crear una Nueva Página de CRUD

1. **Crear carpeta en `/features`**
   ```
   /features/myEntity/
   ├── MyEntityList.tsx
   ├── MyEntityForm.tsx
   └── index.ts
   ```

2. **Exportar desde servicios en `/api`**
   ```typescript
   export type MyEntity = { id: string; ... };
   export type MyEntityInput = Omit<MyEntity, 'id'>;
   ```

3. **Usar en componentes**
   ```typescript
   import { useDataQuery, useFormSubmit } from '../hooks';
   import { myEntityService, MyEntity } from '../api/myEntityService';
   
   const { data: entities } = useDataQuery(['entities'], () => myEntityService.list());
   ```

4. **Agregar ruta en App.tsx**
   ```typescript
   <Route path="/my-entities" element={<MyEntityList />} />
   ```

5. **Agregar link en Header.tsx**
   ```typescript
   { label: "My Entities", path: "/my-entities" }
   ```

## 🚀 Optimizaciones Aplicadas

- ✅ React Query con cache configuration
- ✅ Componentes reutilizables
- ✅ Type-safe services
- ✅ Manejo centralizado de errores
- ✅ Constantes centralizadas
- ✅ Custom hooks para lógica común
