import { z } from "zod";

const professionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
});

export type Profession = z.infer<typeof professionSchema>;
export type Skill = z.infer<typeof skillSchema>;
