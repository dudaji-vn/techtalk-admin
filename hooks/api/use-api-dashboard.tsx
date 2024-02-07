import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { dashboardService } from "@/services/dashboard.service";

export const useApiDashboard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: analyst } = useQuery({
    queryKey: ["analyst"],
    queryFn: dashboardService.getAnalyst,
  });
  const { data: top5Lectures } = useQuery({
    queryKey: ["top5Lecture"],
    queryFn: dashboardService.getTop5Lectures,
  });
  const { data: topUserCompleteLectureOfVN } = useQuery({
    queryKey: ["totalUserCompleteLectureByVN"],
    queryFn: () => dashboardService.getTopUserCompleteLecture({ country: "vn" }),
  });
  const { data: topUserCompleteLectureOfKR } = useQuery({
    queryKey: ["totalUserCompleteLectureByKR"],
    queryFn: () => dashboardService.getTopUserCompleteLecture({ country: "kr" }),
  });
  const { data: statisticsScores } = useQuery({
    queryKey: ["statisticsScores"],
    queryFn: dashboardService.getStatisticsScore,
  });

  return { analyst, topUserCompleteLectureOfKR, topUserCompleteLectureOfVN, top5Lectures, statisticsScores };
};
