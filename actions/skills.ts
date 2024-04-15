"use server";

import { z } from "zod";

const responseToSkills = z
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

export async function getSkills(professionId: number) {
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
  const skills = responseToSkills.parse(results);
  return skills;
  //   compare skills from professionId
  //   return total skills
}
