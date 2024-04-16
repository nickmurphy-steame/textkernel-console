"use server";

import { tx } from "@/lib/api";
import { Skill } from "@/types/app";
import { z } from "zod";

const suggestResponseToSkills = z
  .object({
    Value: z.object({
      SuggestedSkills: z.array(
        z.object({
          Score: z.number(),
          Id: z.string(),
          Description: z.string(),
        })
      ),
    }),
  })
  .transform((r) =>
    r.Value.SuggestedSkills.map((s) => ({
      name: s.Description,
      id: s.Id,
      score: s.Score,
    }))
  );

const compareResponseToSkills = z
  .object({
    Value: z.object({
      MissingSkillsFoundInProfession: z.array(
        z.object({
          Score: z.number(),
          Id: z.string(),
          Description: z.string(),
        })
      ),
    }),
  })
  .transform((r) =>
    r.Value.MissingSkillsFoundInProfession.map((s) => ({
      name: s.Description,
      id: s.Id,
      score: s.Score,
    }))
  );

async function getSuggestedSkills(professionId: number) {
  const response = await tx({
    endpoint: "/ontology/suggestskillsfromprofessions",
    method: "POST",
    body: JSON.stringify({
      ProfessionCodeIds: [professionId],
      Limit: 10,
      OutputLanguage: "en",
    }),
  });
  const results = await response.json(); // parses JSON response into native JavaScript objects
  return suggestResponseToSkills.parse(results);
}

async function getMissingSkills(
  professionId: number,
  suggestedSkills: Skill[]
) {
  const response = await tx({
    endpoint: "/ontology/compareskillstoprofession",
    method: "POST",
    body: JSON.stringify({
      SkillIds: suggestedSkills.map((s) => s.id),
      ProfessionCodeId: professionId,
      OutputLanguage: "en",
    }),
  });
  const results = await response.json(); // parses JSON response into native JavaScript objects
  return compareResponseToSkills.parse(results);
}

export async function getSkills(professionId: number) {
  if (process.env.LIVE !== "true")
    return [
      { name: "X-Ray", id: "2978", score: 0.97 },
      { name: "MRI", id: "1138", score: 0.88 },
      { name: "Vital Signs", id: "5547", score: 0.76 },
    ];
  const suggestedSkills = await getSuggestedSkills(professionId);
  const missingSkills = await getMissingSkills(professionId, suggestedSkills);
  return [...suggestedSkills, ...missingSkills];
}
