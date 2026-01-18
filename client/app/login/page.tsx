import { LoginScreeen } from "@/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign into your account to get started",
};

const LoginPage = () => {
  return <LoginScreeen />;
};

export default LoginPage;
