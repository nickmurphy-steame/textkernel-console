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
  // const response = await fetch(
  //   "https://api.us.textkernel.com/tx/v10/professions/autocomplete",
  //   {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Tx-AccountId": process.env.NEXT_PUBLIC_TX_ACCOUNT_ID || "",
  //       "Tx-ServiceKey": process.env.NEXT_PUBLIC_TX_SERVICE_KEY || "",
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify({
  //       Prefix: prefix,
  //       Limit: 10,
  //     }), // body data type must match "Content-Type" header
  //   }
  // );
  // const results = await response.json(); // parses JSON response into native JavaScript objects
  // const professions = responseToProfession.parse(results);
  // return professions;
  return [
    { name: "Radiological Lab Technician", id: 2978 },
    { name: "Radiologist", id: 1138 },
    { name: "Radio Frequency Engineer", id: 5547 },
  ];
}
