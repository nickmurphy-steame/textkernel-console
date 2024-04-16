"use server";

import { tx } from "@/lib/api";
import { z } from "zod";

const responseToProfession = z
  .object({
    Value: z.object({
      Professions: z.array(
        z.object({
          Description: z.string(),
          CodeId: z.number(),
        })
      ),
    }),
  })
  .transform((r) =>
    r.Value.Professions.map((p) => ({ name: p.Description, id: p.CodeId }))
  );

export async function getProfessions(prefix: string) {
  if (process.env.LIVE !== "true")
    return [
      { name: "Radiological Lab Technician", id: 2978 },
      { name: "Radiologist", id: 1138 },
      { name: "Radio Frequency Engineer", id: 5547 },
    ];

  const response = await tx({
    endpoint: "/professions/autocomplete",
    method: "POST",
    body: JSON.stringify({
      Prefix: prefix,
      Limit: 10,
    }),
  });

  const results = await response.json();
  const professions = responseToProfession.parse(results);
  return professions;
}
