import { fileService } from '@/services/file.service';
import { toastSuccess } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/const/path';

interface IArgs {
  file: Blob;
}

export const useUploadLectureAndVocabularyFromCsvMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<boolean, AxiosError<{ message: string }>, IArgs>({
    mutationFn: (args) => {
      return fileService.uploadLectureAndVocabularyFromCsv(args.file);
    },
    onSuccess: (data) => {
      toastSuccess('Your lectures has been import successfully');
      queryClient.invalidateQueries({ queryKey: ['allLectures'] });
      router.push(ROUTE.lectures);
    },
  });

  return mutation;
};
