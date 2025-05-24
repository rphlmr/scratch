import { zodResolver as _zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues } from "react-hook-form";
import type { z } from "zod";

export function zodResolver<Output extends FieldValues>(schema: z.ZodSchema<Output, any, Partial<Output>>) {
  return _zodResolver<Partial<Output>, any, Output>(schema);
}
