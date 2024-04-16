const BASE_URL = "https://api.us.textkernel.com/tx/v10";

export type TxRequestParams = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null;
};

export async function tx({
  endpoint,
  method = "GET",
  body = null,
}: TxRequestParams) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      "Tx-AccountId": process.env.NEXT_PUBLIC_TX_ACCOUNT_ID || "",
      "Tx-ServiceKey": process.env.NEXT_PUBLIC_TX_SERVICE_KEY || "",
    },
  });
}
