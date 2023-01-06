const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: " product REST API SERVER",
      version: "1.0.0",
      description: "product API with express",
    },
    servers: [
      {
        url: "http://localhost:5100/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
