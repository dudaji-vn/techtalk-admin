import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vocabularyService } from "@/services/vocabulary.service";
import { IFormVocabulary } from "@/interfaces/vocabulary.interface";
import { toastError, toastSuccess } from "@/utils/toast";

export const useApiVocabulary = (lectureId?: string) => {
  const { data: vocabularies, isLoading } = useQuery({
    queryKey: ["vocabularies", lectureId ?? "all"],
    queryFn: () => vocabularyService.getAllVocabularyByLectureId(lectureId ?? ""),
  });
  const queryClient = useQueryClient();
  const addOrUpdateVocabularyMutation = useMutation({
    mutationFn: (payload: IFormVocabulary) => vocabularyService.addOrUpdateVocabulary(payload),
    onSuccess: () => {
      toastSuccess("Successfully");

      queryClient.invalidateQueries({
        queryKey: ["vocabularies"],
      });
    },
    onError: () => {
      toastError("Vocabulary has existed");
    },
  });
  const addOrUpdateVocabulary = (payload: IFormVocabulary) => {
    addOrUpdateVocabularyMutation.mutateAsync(payload);
    const { data } = addOrUpdateVocabularyMutation;
    return data;
  };
  return { vocabularies, addOrUpdateVocabulary, isLoading };
};
