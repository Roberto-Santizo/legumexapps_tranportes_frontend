import { z } from "zod";

//AUTH USER SCHEMA
export const AuthUserSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastName: z.string(),
    email: z.string(),
    role: z.string(),
    token: z.string(),
});
