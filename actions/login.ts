"use server";

import { cookies } from "next/headers";

export async function login(data: FormData) {
  if (data.get("password") === process.env.PASSWORD) {
    cookies().set("authenticated", "true");
    return true;
  } else {
    console.log("Invalid credentials");
    return false;
  }
}
