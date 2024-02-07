"use client";
import Dashboard from "@/components/dashboard";
import protectPage from "@/router/protect-page";

const DashboardPage = () => {
  return <Dashboard />;
};

export default protectPage(DashboardPage);
