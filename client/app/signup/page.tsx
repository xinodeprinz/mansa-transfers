import { SignupScreen } from "@/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to get started",
};

const SignupPage = () => {
  return <SignupScreen />;
};

export default SignupPage;
