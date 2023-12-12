import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { dashboardService } from '@/services/dashboard.service';

export const useApiDashboard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: analyst } = useQuery({
    queryKey: ['analyst'],
    queryFn: dashboardService.getAnalyst,
  });

  return { analyst };
};
