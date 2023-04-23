import swUiExp from "swagger-ui-express";
import swJsDoc from "swagger-jsdoc";
import { Router } from "express";

const PORT = process.env.PORT || 3000;


console.log(`${process.cwd()}/src/swagger/docs/authdoc.yaml`);



const swRouter = Router();
const swagger = swJsDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Bosstech",
      description: "Agar bu yerda ishlamasa iltimos postmanda sinab ko'ring ! Rahmat)"
    },
    components: {
      securitySchemes: {
        Token: {
          type: "apiKey",
          name: "Authorization",
          in: "header"
        }
      }
    }
  },
  apis: [
    `${process.cwd()}/src/swagger/docs/authdoc.yaml`,
    `${process.cwd()}/src/swagger/components/authcom.yaml`,

    `${process.cwd()}/src/swagger/docs/usersdoc.yaml`,
    `${process.cwd()}/src/swagger/components/userscom.yaml`,

    `${process.cwd()}/src/swagger/docs/productsdoc.yaml`,
    `${process.cwd()}/src/swagger/components/productscom.yaml`,

    `${process.cwd()}/src/swagger/docs/ordersdoc.yaml`,
    `${process.cwd()}/src/swagger/components/orderscom.yaml`,

    `${process.cwd()}/src/swagger/docs/filesdoc.yaml`
  ],
});

swRouter.use("/docs", swUiExp.serve, swUiExp.setup(swagger));
export default swRouter
