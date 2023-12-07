'use client';
import Dashboard from '@/components/Dashboard';
import protectPage from '@/router/protectPage';

const DashboardPage = () => {
  return <Dashboard />;
};

export default protectPage(DashboardPage);
