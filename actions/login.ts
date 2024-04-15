"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function login(data: FormData) {
  if (data.get("password") === process.env.PASSWORD) {
    cookies().set("authenticated", "true");
    return true;
  } else {
    console.log("Invalid credentials");
    return false;
  }
}
