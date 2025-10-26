import { z } from "zod";

/**
 * Parse mô tả rule từ `schema.description`
 * Ví dụ: "required:Không được bỏ trống.|max:Tối đa 255 ký tự"
 * => { required: "Không được bỏ trống.", max: "Tối đa 255 ký tự" }
 */
const parseDescriptionMessages = (desc?: string) => {
  const messages: Record<string, string> = {};
  if (!desc) return messages;

  desc.split("|").forEach((rule) => {
    const [key, msg] = rule.split(":").map((s) => s.trim());
    if (key && msg) messages[key] = msg;
  });

  return messages;
};

export const zodRule =
  <T extends z.ZodTypeAny>(schema: T) =>
  () => ({
    validator: (_: any, value: any) => {
      const result = schema.safeParse(value);

      if (result.success) return Promise.resolve();

      const issue = result?.error?.issues[0] as z.core.$ZodIssue;
      const messages = parseDescriptionMessages(schema.description);
      let message = issue.message;

      switch (issue.code) {
        case "too_small":
          message = messages["min"];
          break;
        case "too_big":
          message = messages["max"];
          break;
        case "invalid_type":
          message = messages["type"];
          break;
        case "custom":
          message = messages["custom"];
          break;
        default:
          message =
            messages[issue.code] ||
            messages["required"] ||
            schema.description ||
            issue.message;
      }

      return Promise.reject(message || issue.message);
    },
  });
