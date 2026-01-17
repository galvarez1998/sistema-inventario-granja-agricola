# Frontend - Sistema de Inventario Granja

Stack: React + TypeScript + Vite + Tailwind + React Query

Instalación:
1. Ir a la carpeta frontend:
   cd frontend
2. Instalar dependencias:
   npm ci
3. Copiar .env.example a .env:
   cp .env.example .env
   ajustar VITE_API_URL si es necesario
4. Levantar en modo dev:
   npm run dev
5. Abrir: http://localhost:5173

Generar factura PDF:
- Al registrar una venta (SalesForm) se generará un PDF simple con jsPDF.

Notas de seguridad:
- Token en localStorage (simple y solicitado). Considera migrar a HttpOnly cookies + refresh tokens para mayor seguridad.
- Asegurar CORS en backend (origen: http://localhost:5173).

Tests:
- npm test (usa Vitest)