"use client";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Login() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lng = segments[1];
  return (
    <>
      <button onClick={() => signIn("github", { redirectTo: `/${lng}` })}>
        github
      </button>
      <br />
      <button onClick={() => signIn("google", { redirectTo: `/${lng}` })}>
        google
      </button>
    </>
  );
}
