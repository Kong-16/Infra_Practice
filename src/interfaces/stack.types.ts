import { z } from "zod";

export const StackStatusSchema = z.enum([
  'CREATE_IN_PROGRESS',
  'CREATE_COMPLETE',
  'CREATE_FAILED',
  'ROLLBACK_IN_PROGRESS',
  'ROLLBACK_COMPLETE',
  'DELETE_IN_PROGRESS',
  'DELETE_COMPLETE',
  'DOES_NOT_EXIST',
]);

export const StackOutputSchema = z.object({
  OutputKey: z.string(),
  OutputValue: z.string(),
});

export const StackSchema = z.object({
  stackName: z.string(),
  status: StackStatusSchema,
  statusReason: z.string(),
  outputs: z.array(StackOutputSchema),
});


// 타입 추출
export type StackStatus = z.infer<typeof StackStatusSchema>;
export type StackOutput = z.infer<typeof StackOutputSchema>;
export type Stack = z.infer<typeof StackSchema>;
