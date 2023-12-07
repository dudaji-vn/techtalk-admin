import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { lectureService } from '@/services/lecture.service';
import { IChangeStatusLectureRequest, IFormLecture, IFormLectureAndVocabulary } from '@/interfaces/lecture';
import { toastError, toastSuccess } from '../../utils/toast';
import { useRouter } from 'next/navigation';
import { ROUTE } from '../../const/path';

export const useApiLecture = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: lectures } = useQuery({
    queryKey: ['allLectures'],
    queryFn: lectureService.getAllLecture,
  });

  const addLectureAndVocabularyMutation = useMutation({
    mutationFn: (payload: IFormLectureAndVocabulary) => lectureService.addOrUpdateLectureAndVocabulary(payload),
    onSuccess: () => {
      toastSuccess('Successfully');
      queryClient.invalidateQueries({ queryKey: ['allLectures'] });
      router.push(ROUTE.lectures);
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.message;
      toastError(message);
    },
  });
  const changeStatusLectureMutation = useMutation({
    mutationFn: (payload: IChangeStatusLectureRequest) => lectureService.changeStatusLecture(payload),
    onSuccess: () => {
      toastSuccess('Successfully');
      queryClient.invalidateQueries({ queryKey: ['allLectures'] });
      router.push(ROUTE.lectures);
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.message;
      toastError(message);
    },
  });
  const addLectureAndVocabulary = (payload: IFormLectureAndVocabulary) => {
    addLectureAndVocabularyMutation.mutateAsync(payload);
    const { data } = addLectureAndVocabularyMutation;
    return data;
  };
  const changeStatusLecture = (payload: IChangeStatusLectureRequest) => {
    changeStatusLectureMutation.mutateAsync(payload);
    const { data } = changeStatusLectureMutation;
    return data;
  };

  return { lectures, addLectureAndVocabulary, changeStatusLecture };
};
