"use client";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col p-24 max-w-screen-lg mx-auto">
      <h1 className="text-xl font-bold text-center pb-2">Authenticate</h1>
      <form
        className="flex flex-col gap-y-4"
        action={async (data) => {
          const success = await login(data);
          if (success) {
            toast.success("Authenticated");
            router.push("/");
          } else {
            toast.error("Invalid credentials");
          }
        }}
      >
        <Input
          type="password"
          name="password"
          placeholder="Password"
          minLength={1}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
}
