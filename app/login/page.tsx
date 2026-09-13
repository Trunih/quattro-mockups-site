import type { Metadata } from "next";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Platform login",
  description: "Sign in to the Quattro Client or Capacity Provider dashboard.",
};

export default function LoginPage() {
  return <LoginClient />;
}
