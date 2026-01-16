import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Sistema de Inventario Granja",
      version: "1.0.0",
      description: "Documentación de la API"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/controllers/*.ts", "./src/models/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;