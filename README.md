# 🌾 Sistema de Inventario Granja Agrícola

Un sistema completo y moderno de gestión de inventario para granjas agrícolas, desarrollado con tecnologías de punta. Permite la administración integral de animales, productos, producción, ventas, movimientos y colmenas.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dashboard](#dashboard)
- [Módulos Principales](#módulos-principales)
- [Tecnologías](#tecnologías)
- [Guía de Uso](#guía-de-uso)
- [API](#api)
- [Seguridad](#seguridad)

## ✨ Características Principales

### 🐄 Gestión de Animales
- Registro completo de animales (especie, peso, edad, estado)
- Seguimiento de fecha de ingreso
- Estados: saludable, enfermo, vendido, muerto
- Búsqueda, filtrado y edición
- Eliminación con confirmación

### 📦 Gestión de Productos
- Registro de productos (carne, huevo, miel)
- Control de procedencia y peso
- Fechas de sacrificio y caducidad
- Trazabilidad completa
- Gestión de inventario

### 📊 Producción Agrícola
- Registro de producción de huevos
- Control de producción de miel
- Ganancia de peso en animales
- Histórico de todas las producciones
- Reportes por tipo

### 💰 Sistema de Ventas
- Registro de ventas (productos o animales)
- Generación automática de facturas PDF
- Precio total y cantidad
- Notas de transacciones
- Historial completo de ventas

### 📍 Gestión de Movimientos
- Registro de movimientos (nacimiento, muerte, venta, compra)
- Trazabilidad completa
- Historial de cambios
- Clasificación por tipo

### 🐝 Gestión de Colmenas
- Registro de colmenas activas
- Ubicación geográfica
- Última producción registrada
- Control de producción de miel
- Monitoreo de actividad

### 👥 Autenticación y Roles
- Sistema de login seguro con JWT
- Roles: admin, worker, viewer
- Control de acceso basado en roles
- Sesiones persistentes
- Cierre de sesión seguro

## 🔧 Requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 12+
- Git

## 📥 Instalación

### 1. Clonar el Repositorio

```bash
git clone <tu-repo>
cd sistema-inventario-granja-agricola
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/granja
JWT_SECRET=tu_jwt_secret_aqui
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

Inicializar base de datos:
```bash
npm run typeorm migration:run
```

Ejecutar seeds (crear usuario admin):
```bash
npm run seed
```

Iniciar backend:
```bash
npm run dev
```

Backend disponible en: `http://localhost:3000`
Swagger UI: `http://localhost:3000/docs`

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env`:
```env
VITE_API_URL=http://localhost:3000
```

Iniciar frontend:
```bash
npm run dev
```

Frontend disponible en: `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
sistema-inventario-granja-agricola/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Controladores de rutas
│   │   ├── models/             # Entidades TypeORM
│   │   ├── services/           # Lógica de negocio
│   │   ├── routes/             # Rutas API
│   │   ├── middlewares/        # Middleware personalizado
│   │   ├── dtos/               # Data Transfer Objects
│   │   ├── migrations/         # Migraciones de BD
│   │   ├── auth/               # Autenticación JWT
│   │   ├── docs/               # Documentación Swagger
│   │   └── index.ts            # Punto de entrada
│   ├── tests/                  # Tests unitarios y e2e
│   ├── jest.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── features/           # Módulos de características
│   │   │   ├── animals/        # Gestión de animales
│   │   │   │   ├── AnimalList.tsx
│   │   │   │   └── AnimalForm.tsx
│   │   │   ├── products/       # Gestión de productos
│   │   │   ├── production/     # Gestión de producción
│   │   │   ├── sales/          # Gestión de ventas
│   │   │   ├── movements/      # Gestión de movimientos
│   │   │   ├── hives/          # Gestión de colmenas
│   │   │   └── auth/           # Autenticación
│   │   ├── pages/              # Páginas principales
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── ProductionPage.tsx
│   │   │   ├── SalesPage.tsx
│   │   │   ├── MovementsPage.tsx
│   │   │   └── HivesPage.tsx
│   │   ├── components/         # Componentes reutilizables
│   │   ├── hooks/              # Custom hooks
│   │   ├── api/                # Servicios API
│   │   ├── utils/              # Funciones auxiliares
│   │   ├── constants/          # Constantes globales
│   │   └── App.tsx             # Punto de entrada
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## 📊 Dashboard

El Dashboard proporciona una vista general completa y detallada de la operación agrícola.

### Componentes Principales

#### 1. Tarjetas de Estadísticas
- **Total de Animales** 🐄: Cantidad total de animales en la granja
- **Total Miel** 🍯: Litros totales de miel producidos
- **Carne Producida** 🥩: Kilogramos totales de carne
- **Huevos** 🥚: Cantidad total de huevos registrados
- **Ventas Totales** 💰: Monto total generado por ventas

#### 2. Gráficos Visuales

**Animales por Especie** (Gráfico de Barras)
- Distribución visual de todas las especies
- Facilita identificar cuál es el grupo más grande
- Actualización en tiempo real

**Distribución de Producción** (Gráfico Doughnut)
- Proporción de cada tipo de producción
- Miel, carne y huevos
- Visualización clara de prioridades

#### 3. Secciones de Información

**Resumen Rápido**
- Total de animales
- Colmenas activas
- Movimientos registrados
- Transacciones completadas

**Estado de Animales**
- ✓ Saludable
- ⚠ Enfermo
- 🏷 Vendido
- ✕ Muerto

**Información del Sistema**
- Estado del sistema
- Sincronización de datos
- Versión del software

### Consejos de Uso
- Mantén actualizados los registros de animales
- Registra cada movimiento y transacción
- Revisa regularmente los reportes de producción

## 🎯 Módulos Principales

### 🐄 Animales

**Rutas:**
```
GET    /animals                - Listar todos los animales
POST   /animals                - Crear nuevo animal
GET    /animals/:id            - Obtener animal específico
PUT    /animals/:id            - Actualizar animal
DELETE /animals/:id            - Eliminar animal
```

**Campos:**
- Especie (requerido)
- Cantidad
- Peso (kg)
- Edad
- Estado (saludable, enfermo, vendido, muerto)
- Fecha de Ingreso
- Observaciones

**Rutas Web:**
```
/animals                    - Listado de animales
/animals/new               - Crear nuevo animal
/animals/:id/edit          - Editar animal
```

### 📦 Productos

**Rutas:**
```
GET    /products               - Listar todos los productos
POST   /products               - Crear nuevo producto
GET    /products/:id           - Obtener producto específico
PUT    /products/:id           - Actualizar producto
DELETE /products/:id           - Eliminar producto
```

**Tipos de Productos:**
- **Carne**: peso, fecha de sacrificio, fecha de caducidad
- **Huevo**: cantidad, fecha de recolección
- **Miel**: cantidad, fecha de extracción

**Rutas Web:**
```
/products                  - Listado de productos
/products/new             - Crear nuevo producto
/products/:id/edit        - Editar producto
```

### 📊 Producción

**Rutas:**
```
GET    /production             - Listar todos los registros
POST   /production             - Registrar nueva producción
GET    /production/:id         - Obtener registro específico
PUT    /production/:id         - Actualizar producción
DELETE /production/:id         - Eliminar producción
```

**Tipos de Producción:**
- Huevos
- Miel
- Peso de animales

**Rutas Web:**
```
/production                - Listado de producción
/production/new           - Registrar nueva producción
/production/:id/edit      - Editar producción
```

### 💰 Ventas

**Rutas:**
```
GET    /sales                  - Listar todas las ventas
POST   /sales                  - Crear nueva venta
GET    /sales/:id              - Obtener venta específica
PUT    /sales/:id              - Actualizar venta
DELETE /sales/:id              - Eliminar venta
```

**Funcionalidades:**
- Generar factura PDF automáticamente
- Registrar tipo (producto/animal)
- Precio total y cantidad
- Notas de transacciones

**Rutas Web:**
```
/sales                     - Listado de ventas
/sales/new                - Crear nueva venta
/sales/:id/edit           - Editar venta
```

### 📍 Movimientos

**Rutas:**
```
GET    /movements              - Listar todos los movimientos
POST   /movements              - Registrar nuevo movimiento
GET    /movements/:id          - Obtener movimiento específico
PUT    /movements/:id          - Actualizar movimiento
DELETE /movements/:id          - Eliminar movimiento
```

**Tipos de Movimientos:**
- Nacimiento
- Muerte
- Venta
- Compra

**Rutas Web:**
```
/movements                 - Listado de movimientos
/movements/new            - Registrar nuevo movimiento
/movements/:id/edit       - Editar movimiento
```

### 🐝 Colmenas

**Rutas:**
```
GET    /hives                  - Listar todas las colmenas
POST   /hives                  - Crear nueva colmena
GET    /hives/:id              - Obtener colmena específica
PUT    /hives/:id              - Actualizar colmena
DELETE /hives/:id              - Eliminar colmena
```

**Campos:**
- Nombre (requerido)
- Última Producción (L)
- Ubicación

**Rutas Web:**
```
/hives                     - Listado de colmenas
/hives/new                - Crear nueva colmena
/hives/:id/edit           - Editar colmena
```

### 👤 Autenticación

**Rutas:**
```
POST   /auth/login             - Login de usuario
POST   /auth/register          - Registro de usuario
GET    /auth/me                - Datos del usuario actual
POST   /auth/logout            - Logout seguro
```

**Credenciales por Defecto:**
```
Email: admin@example.com
Contraseña: admin123
```

## 🛠️ Tecnologías

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Node.js | 18+ | Runtime de JavaScript |
| Express | 4+ | Framework web |
| TypeScript | 5+ | Tipado estático |
| TypeORM | 0.3+ | ORM para base de datos |
| PostgreSQL | 12+ | Base de datos relacional |
| JWT | - | Autenticación segura |
| Zod | - | Validación de datos |
| Jest | - | Testing |

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18+ | Biblioteca UI |
| TypeScript | 5+ | Tipado estático |
| Vite | 4+ | Build tool |
| Tailwind CSS | 3+ | Framework CSS |
| React Query | 4+ | Gestión de estado servidor |
| React Hook Form | 7+ | Gestión de formularios |
| Zod | - | Validación de esquemas |
| Chart.js | 4+ | Gráficos |
| React Router | 6+ | Enrutamiento |
| Axios | - | Cliente HTTP |
| React Hot Toast | - | Notificaciones |

## 📖 Guía de Uso

### 1. Iniciar Sesión

1. Accede a `http://localhost:5173`
2. Usa las credenciales:
   - Email: `admin@example.com`
   - Contraseña: `admin123`
3. Haz clic en "Iniciar Sesión"

### 2. Crear un Nuevo Animal

1. Navega a "Animales" en el menú
2. Haz clic en el botón "Nuevo"
3. Completa el formulario:
   - **Especie**: tipo de animal (requerido)
   - **Cantidad**: número de animales
   - **Peso**: peso en kilogramos
   - **Edad**: edad del animal
   - **Estado**: selecciona el estado actual
   - **Fecha de Ingreso**: fecha de llegada a la granja
   - **Observaciones**: notas adicionales
4. Haz clic en "Guardar"
5. Serás redirigido al listado de animales

### 3. Editar un Animal

1. Desde el listado de animales
2. Haz clic en "Editar" en la fila correspondiente
3. Modifica los datos necesarios
4. Haz clic en "Guardar"
5. La lista se actualizará automáticamente

### 4. Registrar una Venta

1. Navega a "Ventas"
2. Haz clic en "Nueva"
3. Completa los datos:
   - **Tipo**: selecciona Producto o Animal
   - **Referencia ID**: ID del producto/animal vendido
   - **Cantidad**: cantidad vendida
   - **Precio Total**: monto de la venta
   - **Fecha**: fecha de la transacción
   - **Notas**: detalles adicionales
4. Haz clic en "Guardar"
5. Se generará automáticamente una factura PDF

### 5. Consultar el Dashboard

1. Desde la página principal
2. Visualiza todos los indicadores principales
3. Revisa los gráficos de distribución
4. Consulta el estado general de la granja
5. Revisa los consejos de uso

## 🔌 API - Endpoints Completos

### Base URL
```
http://localhost:3000/api
```

### Autenticación
```
POST   /auth/login              - Login
POST   /auth/register           - Registro
GET    /auth/me                 - Datos del usuario
POST   /auth/logout             - Logout
```

### Animales
```
GET    /animals                 - Listar todos
POST   /animals                 - Crear nuevo
GET    /animals/:id             - Obtener uno
PUT    /animals/:id             - Actualizar
DELETE /animals/:id             - Eliminar
```

### Productos
```
GET    /products                - Listar todos
POST   /products                - Crear nuevo
GET    /products/:id            - Obtener uno
PUT    /products/:id            - Actualizar
DELETE /products/:id            - Eliminar
```

### Producción
```
GET    /production              - Listar todos
POST   /production              - Crear nuevo
GET    /production/:id          - Obtener uno
PUT    /production/:id          - Actualizar
DELETE /production/:id          - Eliminar
```

### Ventas
```
GET    /sales                   - Listar todas
POST   /sales                   - Crear nueva
GET    /sales/:id               - Obtener una
PUT    /sales/:id               - Actualizar
DELETE /sales/:id               - Eliminar
```

### Movimientos
```
GET    /movements               - Listar todos
POST   /movements               - Crear nuevo
GET    /movements/:id           - Obtener uno
PUT    /movements/:id           - Actualizar
DELETE /movements/:id           - Eliminar
```

### Colmenas
```
GET    /hives                   - Listar todas
POST   /hives                   - Crear nueva
GET    /hives/:id               - Obtener una
PUT    /hives/:id               - Actualizar
DELETE /hives/:id               - Eliminar
```

### Dashboard
```
GET    /dashboard/summary       - Resumen general
```

## 🔒 Seguridad

### Implementaciones Actuales

1. **Autenticación JWT**
   - Tokens seguros
   - Expiración automática
   - Validación en cada request

2. **Control de Acceso Basado en Roles (RBAC)**
   - Rol: admin (acceso completo)
   - Rol: worker (acceso limitado)
   - Rol: viewer (solo lectura)

3. **Validación de Datos**
   - Validación con Zod en backend
   - Validación en formularios en frontend
   - Sanitización de entradas

4. **CORS**
   - Configurado para desarrollo
   - Requiere ajuste para producción

5. **Middlewares de Seguridad**
   - Autenticación en rutas protegidas
   - Validación de roles
   - Gestión de errores

### Mejoras Recomendadas para Producción

- [ ] Migrar tokens JWT a HttpOnly cookies
- [ ] Implementar refresh tokens
- [ ] Agregar rate limiting
- [ ] Implementar CSRF protection
- [ ] Usar HTTPS en producción
- [ ] Securizar variables de entorno
- [ ] Implementar audit logging
- [ ] Habilitar headers de seguridad
- [ ] Configurar CSP
- [ ] Implementar 2FA

## 🧪 Testing

### Backend

```bash
cd backend
npm test                        # Ejecutar todos los tests
npm test -- --coverage         # Con coverage
npm test -- --watch           # Modo watch
```

### Frontend

```bash
cd frontend
npm test                        # Ejecutar todos los tests
npm test -- --coverage         # Con coverage
npm test -- --watch           # Modo watch
```

## 📦 Build y Deployment

### Backend

```bash
cd backend
npm run build                   # Compilar TypeScript
npm start                       # Ejecutar en producción
```

### Frontend

```bash
cd frontend
npm run build                   # Build optimizado
npm run preview                 # Preview del build
```

## 📝 Scripts Disponibles

### Backend

```bash
npm run dev                     # Iniciar en modo desarrollo
npm run build                   # Compilar TypeScript
npm run start                   # Ejecutar compilado
npm test                        # Tests
npm run typeorm                 # Comandos TypeORM
npm run typeorm:migrate         # Ejecutar migraciones
npm run seed                    # Ejecutar seeds
```

### Frontend

```bash
npm run dev                     # Iniciar Vite dev server
npm run build                   # Build para producción
npm run preview                 # Preview del build
npm test                        # Tests
npm run lint                    # Linting
```

## 🐛 Troubleshooting

### Error de conexión a BD

```bash
# Verificar que PostgreSQL está corriendo
psql -U usuario -d granja -c "SELECT 1"

# Revisar variables de entorno
cat .env | grep DATABASE_URL
```

### Token expirado

- Cierra sesión y vuelve a iniciar
- Limpia localStorage si es necesario
- Considera implementar refresh tokens

### Caché de React Query

- StaleTime: 5 minutos
- CacheTime: 10 minutos
- Se invalida automáticamente en create/update/delete

## 📚 Documentación Adicional

- [README Backend](backend/README_BACKEND.md)
- [README Frontend](frontend/README_FRONTEND.md)
- [Estructura del Proyecto](frontend/PROJECT_STRUCTURE.md)
- [Mejores Prácticas](frontend/BEST_PRACTICES.md)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -m 'Agrega mejora'`)
4. Push (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 📞 Soporte

Para reportar bugs o solicitar features, abre un Issue en el repositorio.

---

**Desarrollado con ❤️ para la gestión agrícola moderna** 🌾
