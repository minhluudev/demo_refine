// openapi-ts.config.ts
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  // Dùng file JSON do L5-Swagger sinh ra
  // input: '../be/storage/app/private/scribe/openapi.yaml',
  input: '../be/storage/api-docs/api-docs.json',
	output: {
    format: 'prettier',
    lint: 'eslint',
    path: `./src/sdk/hey-api`,
  },
  plugins: [
    `@hey-api/client-next`,
    `zod`,
    {
      enums: `javascript`,
      name: `@hey-api/typescript`,
    },
    {
      name: `@hey-api/sdk`,
      validator: {
        request: 'zod',
      },
    },
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: './src/lib/hey-api.ts',
    },
  ],
	// ⚠️ thêm dòng này:
  withDescriptions: true,
});
