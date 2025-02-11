import { z } from "zod";
import { StackSchema } from "./stack.types";

export const StackInfoResponseSchema = z.object({
  success: z.boolean(),
  stackStatus: StackSchema,
});

export type StackInfoResponse = z.infer<typeof StackInfoResponseSchema>;

export const UrlResponseSchema = z.object({
  success : z.boolean(),
  accountId: z.string(),
  ssoUrl : z.string(),
})

export type UrlResponse = z.infer<typeof UrlResponseSchema>;