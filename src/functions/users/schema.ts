export default {
  type: "object",
  properties: {
    cpf: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["cpf", "name", "email"]
} as const;
