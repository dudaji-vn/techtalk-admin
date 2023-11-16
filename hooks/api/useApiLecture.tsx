import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lectureService } from "@/services/lecture.service";
import { IFormLecture } from "@/interfaces/lecture";
import { toastError, toastSuccess } from "../../utils/toast";

export const useApiLecture = () => {
  const queryClient = useQueryClient();
  const { data: lectures } = useQuery({
    queryKey: ["allLectures"],
    queryFn: lectureService.getAllLecture,
  });

  const addOrUpdateLectureMutation = useMutation({
    mutationFn: (payload: IFormLecture) =>
      lectureService.addOrUpdateLecture(payload),
    onSuccess: () => {
      toastSuccess("Successfully");
      queryClient.invalidateQueries({ queryKey: ["allLectures"] });
    },
    onError: () => {
      toastError("Lecture has existed");
    },
  });
  const addOrUpdateLecture = (payload: IFormLecture) => {
    addOrUpdateLectureMutation.mutateAsync(payload);
    const { data } = addOrUpdateLectureMutation;
    return data;
  };

  return { lectures, addOrUpdateLecture };
};
