import { DashboardScreen } from "@/screens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your products and payments",
};

const DashboardPage = () => {
  return <DashboardScreen />;
};

export default DashboardPage;
