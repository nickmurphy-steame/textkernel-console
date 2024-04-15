"use server";

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
  const response = await fetch(
    "https://api.us.textkernel.com/tx/v10/ontology/suggestskillsfromprofessions",
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Tx-AccountId": process.env.NEXT_PUBLIC_TX_ACCOUNT_ID || "",
        "Tx-ServiceKey": process.env.NEXT_PUBLIC_TX_SERVICE_KEY || "",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        ProfessionCodeIds: [professionId],
        Limit: 10,
        OutputLanguage: "en",
      }), // body data type must match "Content-Type" header
    }
  );
  const results = await response.json(); // parses JSON response into native JavaScript objects
  return suggestResponseToSkills.parse(results);
}

async function getMissingSkills(
  professionId: number,
  suggestedSkills: Skill[]
) {
  const response = await fetch(
    "https://api.us.textkernel.com/tx/v10/ontology/compareskillstoprofession",
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Tx-AccountId": process.env.NEXT_PUBLIC_TX_ACCOUNT_ID || "",
        "Tx-ServiceKey": process.env.NEXT_PUBLIC_TX_SERVICE_KEY || "",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        SkillIds: suggestedSkills.map((s) => s.id),
        ProfessionCodeId: professionId,
        OutputLanguage: "en",
      }), // body data type must match "Content-Type" header
    }
  );
  const results = await response.json(); // parses JSON response into native JavaScript objects
  return compareResponseToSkills.parse(results);
}

export async function getSkills(professionId: number) {
  // const suggestedSkills = await getSuggestedSkills(professionId);
  // const missingSkills = await getMissingSkills(professionId, suggestedSkills);
  // return [...suggestedSkills, ...missingSkills];
  return [
    { name: "X-Ray", id: "2978", score: 0.97 },
    { name: "MRI", id: "1138", score: 0.88 },
    { name: "Vital Signs", id: "5547", score: 0.76 },
  ];
}
