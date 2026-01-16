# Sistema de Inventario para Granja Agrícola Multiespecie

Descripción
- Backend: Node.js + TypeScript + Express + TypeORM
- Base de datos: PostgreSQL
- Frontend: React (Vite) — panel administrativo básico
- Autenticación: JWT
- Documentación API: Swagger UI (/docs)

Estructura principal
/src
  /models
  /controllers
  /services
  /routes
  /database
  /auth
/docs
/config

Requisitos
- Node.js >= 16
- PostgreSQL

Instalación (backend)
1. Clonar repositorio
2. Copiar `.env.example` a `.env` y ajustar variables
3. Instalar dependencias:
   - cd backend
   - npm install
4. Ejecutar migrations:
   - npm run typeorm:migrate
5. Correr el servidor:
   - npm run dev
6. Swagger UI:
   - http://localhost:4000/docs

Instalación (frontend)
1. cd frontend
2. npm install
3. npm run dev
4. Abrir http://localhost:5173

Docker (opcional)
- docker-compose.yml incluido para levantar backend + postgres

Migraciones
- Se usan migrations de TypeORM. Incluyo un ejemplo en /src/migrations.

Endpoints principales (resumen)
- Auth: POST /api/auth/register, POST /api/auth/login
- Animals: CRUD en /api/animals
- Products: CRUD en /api/products
- Movements: POST /api/movements (nacimiento, venta, muerte, compra)
- Production: POST /api/production (huevos, miel, ganancia peso)
- Sales: POST /api/sales
- Dashboard: GET /api/dashboard/summary

Extras
- Exportes: services sugeridos para PDF/Excel (jsPDF, exceljs)
- Roles de usuario: admin / worker

Soporte
- Usuario actual: galvarez1998 (si quieres que suba a GitHub, indícame repo/owner)
