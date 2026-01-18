import { DashboardScreen } from "@/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your products and payments",
};

const DashboardPage = async () => {
  await new Promise((r) => setTimeout(r, 2_000));
  return <DashboardScreen />;
};

export default DashboardPage;
