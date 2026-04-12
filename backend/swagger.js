const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();

const serverUrl =
  process.env.SWAGGER_SERVER_URL ||
  `http://localhost:${process.env.PORT || 5000}`;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "InternIntelligence Portfolio API",
    version: "1.0.0",
    description:
      "REST API documentation for the InternIntelligence portfolio backend.",
  },
  servers: [{ url: serverUrl }],
  tags: [
    { name: "Auth", description: "User authentication routes" },
    { name: "Skills", description: "Skill management routes" },
    { name: "About", description: "About section routes" },
    { name: "Products", description: "Project/portfolio product routes" },
    { name: "Messages", description: "Contact message routes" },
    { name: "Analytics", description: "Traffic analytics routes" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      AuthUser: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          token: { type: "string" },
        },
      },
      Skill: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          category: { type: "string" },
          icon: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      About: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          description: { type: "string" },
          profileImage: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          cvLink: { type: "string" },
        },
      },
      Product: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          tech: {
            type: "array",
            items: { type: "string" },
          },
          image: { type: "string" },
          github: { type: "string" },
          demo: { type: "string" },
          featured: { type: "boolean" },
        },
      },
      Message: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          message: { type: "string" },
          read: { type: "boolean" },
        },
      },
      Analytics: {
        type: "object",
        properties: {
          _id: { type: "string" },
          visits: { type: "number" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/api/v1/user/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    userId: { type: "string" },
                  },
                },
              },
            },
          },
          400: { description: "User already exists" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/user/login": {
      post: {
        tags: ["Auth"],
        summary: "Authenticate a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User authenticated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthUser" },
              },
            },
          },
          401: { description: "Invalid credentials" },
          404: { description: "User not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/user/logout": {
      get: {
        tags: ["Auth"],
        summary: "Logout current user",
        responses: {
          200: { description: "Logged out successfully" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/skill": {
      get: {
        tags: ["Skills"],
        summary: "Fetch all skills",
        responses: {
          200: {
            description: "Skills fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    skills: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Skill" },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Server error" },
        },
      },
      post: {
        tags: ["Skills"],
        summary: "Create a new skill",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["name", "category"],
                properties: {
                  name: { type: "string" },
                  category: { type: "string" },
                  icon: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Skill created" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/skill/{id}": {
      get: {
        tags: ["Skills"],
        summary: "Fetch a skill by id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Skill fetched" },
          404: { description: "Skill not found" },
          500: { description: "Server error" },
        },
      },
      put: {
        tags: ["Skills"],
        summary: "Update a skill",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  category: { type: "string" },
                  icon: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Skill updated" },
          401: { description: "Unauthorized" },
          404: { description: "Skill not found" },
          500: { description: "Server error" },
        },
      },
      delete: {
        tags: ["Skills"],
        summary: "Delete a skill",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Skill deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Skill not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/about": {
      get: {
        tags: ["About"],
        summary: "Fetch all about entries",
        responses: {
          200: { description: "About entries fetched" },
          500: { description: "Server error" },
        },
      },
      post: {
        tags: ["About"],
        summary: "Create about entry",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["name", "role", "description"],
                properties: {
                  name: { type: "string" },
                  role: { type: "string" },
                  description: { type: "string" },
                  address: { type: "string" },
                  phone: { type: "string" },
                  email: { type: "string" },
                  cvLink: { type: "string" },
                  profileImage: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "About entry created" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/about/{id}": {
      get: {
        tags: ["About"],
        summary: "Fetch about entry",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "About entry returned" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
      put: {
        tags: ["About"],
        summary: "Update about entry",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  role: { type: "string" },
                  description: { type: "string" },
                  address: { type: "string" },
                  phone: { type: "string" },
                  email: { type: "string" },
                  cvLink: { type: "string" },
                  profileImage: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "About entry updated" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
      delete: {
        tags: ["About"],
        summary: "Delete about entry",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "About entry deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/product": {
      get: {
        tags: ["Products"],
        summary: "Fetch all products",
        parameters: [
          {
            in: "query",
            name: "featured",
            schema: { type: "boolean" },
            description: "Filter by featured flag",
          },
        ],
        responses: {
          200: { description: "Products fetched" },
          500: { description: "Server error" },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create a product",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["title", "description", "image"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  tech: {
                    type: "string",
                    description: "Comma separated or JSON array",
                  },
                  github: { type: "string" },
                  demo: { type: "string" },
                  featured: { type: "boolean" },
                  image: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Product created" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/product/{id}": {
      get: {
        tags: ["Products"],
        summary: "Fetch single product",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Product fetched" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Update product",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  tech: { type: "string" },
                  github: { type: "string" },
                  demo: { type: "string" },
                  featured: { type: "boolean" },
                  image: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Product updated" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Delete product",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Product deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/message": {
      post: {
        tags: ["Messages"],
        summary: "Send contact message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "message"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Message created" },
          400: { description: "Validation error" },
          500: { description: "Server error" },
        },
      },
      get: {
        tags: ["Messages"],
        summary: "Fetch all messages",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Messages fetched" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/message/{id}/read": {
      patch: {
        tags: ["Messages"],
        summary: "Mark message read/unread",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  read: { type: "boolean", default: true },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Message updated" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/message/{id}": {
      delete: {
        tags: ["Messages"],
        summary: "Delete a message",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Message deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/analytics": {
      get: {
        tags: ["Analytics"],
        summary: "Fetch analytics summary",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Analytics fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Analytics" },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/analytics/track": {
      post: {
        tags: ["Analytics"],
        summary: "Increment visit counter",
        responses: {
          200: { description: "Visit tracked" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/v1/analytics/visits": {
      put: {
        tags: ["Analytics"],
        summary: "Manually set visit count",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["visits"],
                properties: {
                  visits: { type: "number", minimum: 0 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Visits updated" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [],
};

module.exports = swaggerJsdoc(swaggerOptions);

