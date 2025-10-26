// openapi-ts.config.ts
import { defineConfig } from "@hey-api/openapi-ts";
import { z } from "zod";

export default defineConfig({
  // Dùng file JSON do L5-Swagger sinh ra
  // input: '../be/storage/app/private/scribe/openapi.yaml',
  input: "../be/storage/api-docs/api-docs.json",
  output: {
    format: "prettier",
    lint: "eslint",
    path: `./src/sdk/hey-api`,
  },
  plugins: [
    `@hey-api/client-next`,
    // `zod`,
    // ⚡️ cấu hình plugin Zod
    {
      name: "zod",
      requests: false,
      responses: false,
      metadata: true,
      transform: (schema: any, meta: any) => {
        if (!meta.description) return schema;

        const desc = meta.description;
        const matchRequired = desc.match(/required:\s*([^|]+)/)?.[1]?.trim();
        const matchMax = desc.match(/max:\s*([^|]+)/)?.[1]?.trim();

        if (schema instanceof z.ZodString) {
          let s = schema;
          if (matchRequired) s = s.min(1, matchRequired);
          if (matchMax) s = s.max(255, matchMax);
          return s;
        }
        return schema;
      },
    },
    {
      enums: `javascript`,
      name: `@hey-api/typescript`,
    },
    {
      name: `@hey-api/sdk`,
      validator: {
        request: "zod",
      },
    },
  ],
});
