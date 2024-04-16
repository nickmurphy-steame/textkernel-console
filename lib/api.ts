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
  const url = `${BASE_URL}${endpoint}`;

  return fetch(url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      "Tx-AccountId": process.env.TX_ACCOUNT_ID || "",
      "Tx-ServiceKey": process.env.TX_SERVICE_KEY || "",
    },
  });
}
