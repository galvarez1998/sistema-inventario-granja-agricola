// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Entity Types
export const ENTITY_TYPES = {
  ANIMAL: {
    ESTADO: ['saludable', 'enfermo', 'vendido', 'muerto'] as const,
    DEFAULT_CANTIDAD: 1,
    DEFAULT_ESTADO: 'saludable' as const,
  },
  PRODUCT: {
    TIPO: ['carne', 'huevo', 'miel'] as const,
    DEFAULT_TIPO: 'carne' as const,
  },
  PRODUCTION: {
    TIPO: ['huevos', 'miel', 'peso'] as const,
    DEFAULT_TIPO: 'huevos' as const,
  },
  MOVEMENT: {
    TIPO: ['nacimiento', 'muerte', 'venta', 'compra'] as const,
    DEFAULT_TIPO: 'nacimiento' as const,
  },
  SALE: {
    TIPO: ['producto', 'animal'] as const,
    DEFAULT_TIPO: 'producto' as const,
  },
} as const;

// Form Messages
export const FORM_MESSAGES = {
  SUCCESS_CREATE: 'Creado exitosamente',
  SUCCESS_UPDATE: 'Actualizado exitosamente',
  SUCCESS_DELETE: 'Eliminado exitosamente',
  ERROR_GENERIC: 'Ocurrió un error al procesar la solicitud',
  ERROR_LOAD: 'Error al cargar los datos',
  ERROR_SAVE: 'Error al guardar los datos',
  ERROR_DELETE: 'Error al eliminar',
  CONFIRM_DELETE: '¿Seguro que deseas eliminar este registro?',
  LOADING: 'Cargando...',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ANIMALS: '/animals',
  ANIMALS_NEW: '/animals/new',
  ANIMALS_EDIT: '/animals/:id/edit',
  PRODUCTS: '/products',
  PRODUCTS_NEW: '/products/new',
  PRODUCTS_EDIT: '/products/:id/edit',
  PRODUCTION: '/production',
  PRODUCTION_NEW: '/production/new',
  PRODUCTION_EDIT: '/production/:id/edit',
  SALES: '/sales',
  SALES_NEW: '/sales/new',
  SALES_EDIT: '/sales/:id/edit',
  MOVEMENTS: '/movements',
  MOVEMENTS_NEW: '/movements/new',
  MOVEMENTS_EDIT: '/movements/:id/edit',
  HIVES: '/hives',
  HIVES_NEW: '/hives/new',
  HIVES_EDIT: '/hives/:id/edit',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_PAGE: 1,
} as const;

// Format Options
export const FORMAT = {
  DATE_FORMAT: 'DD/MM/YYYY',
  CURRENCY_DECIMAL_PLACES: 2,
  WEIGHT_DECIMAL_PLACES: 2,
} as const;
