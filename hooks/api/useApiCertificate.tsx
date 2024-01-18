import { certificateService } from "@/services/certificate.service";
import { useQuery } from "@tanstack/react-query";

export const useApiCertificate = () => {
  const { data: usersCertificate, isLoading } = useQuery({
    queryKey: ["getUsersCertificate"],
    queryFn: certificateService.getUsersCertificate,
  });

  return { usersCertificate, isLoading };
};
