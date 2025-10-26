import { z } from "zod";

export const zodRule =
  <T extends z.ZodTypeAny>(schema: T) =>
  () => ({
    validator: (_: any, value: any) => {
      const result = schema.safeParse(value);

      return result.success
        ? Promise.resolve()
        : Promise.reject(result.error.issues[0].message);
    },
  });
