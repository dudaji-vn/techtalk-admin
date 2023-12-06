'use client';
import Button from '@/components/Button';
import ArrowLeftIcon from '@/components/Icons/ArrowLeftIcon';
import DotIcon from '@/components/Icons/DotIcon';
import LectureContent from '@/components/LectureContent';
import Tabs from '@/components/Tabs';
import Typography from '@/components/Typo';
import { IFormLectureAndVocabulary, ILectureItem } from '@/interfaces/lecture';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from '@/components/DropDown';
import { ROUTE } from '@/const/path';
import { useApiLecture } from '@/hooks/api/useApiLecture';
import { useApiVocabulary } from '@/hooks/api/useApiVocabulary';

const DetailLecture = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormLectureAndVocabulary>({
    mode: 'onChange',
  });
  const { lectures, addOrUpdateLectureAndVocabulary } = useApiLecture();
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();
  const params = useParams();
  const { vocabularies } = useApiVocabulary(params.slug as string);
  useEffect(() => {
    if (!getValues('lectureName')) {
      setDisabled(true);
    }
  }, [watch('lectureName')]);
  const lecturesByType = useMemo<ILectureItem[]>(() => {
    if (!lectures) {
      return [];
    }
    return [{ lectureId: 'new', lectureName: 'New lecture', imgSrc: '', status: 'Draft' }, ...lectures];
  }, [lectures]);
  const activeIndexLecture: number = useMemo(() => {
    if (!lecturesByType) {
      return 0;
    }
    return lecturesByType.findIndex((item) => item.lectureId === params.slug);
  }, [params.slug, lecturesByType?.length]);
  const onSubmit = handleSubmit((data) => {
    data.listVocabulary = getValues('listVocabulary');
    addOrUpdateLectureAndVocabulary(data);

    console.log(getValues('listVocabulary'));
  });

  const handleGoBack = () => {
    router.push(ROUTE.lectures);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center border border-gray50 ">
        <Typography className="p-2 min-w-[270px]" type="semi-bold">
          Lectures
        </Typography>
        <div className="border-l p-4 border-l-gray50 w-full flex justify-between">
          <div className="flex items-center gap-4">
            <div onClick={handleGoBack}>
              <ArrowLeftIcon />
            </div>
            {lecturesByType && lecturesByType.length > 0 && activeIndexLecture >= 0 && (
              <div>{params.slug === 'new' ? 'New lecture' : lecturesByType[activeIndexLecture].lectureName} </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Typography type="small">Status:</Typography>
            <div className="gap-2 flex items-center">
              <DotIcon status="draft" />
              <Typography className="text-warning" type="small">
                Draft
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button>Cancel</Button>
              <Button styles={'primary'} disabled={disabled}>
                Save
              </Button>
              <Dropdown
                onChange={(data) => {
                  console.log(data);
                }}
                options={[
                  { label: 'Save as draft', value: 'draft' },
                  { label: 'Public', value: 'public' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      {lecturesByType && lecturesByType.length > 0 && (
        <Tabs
          indexActive={activeIndexLecture}
          handleTabClick={(index) => {
            router.push(`${ROUTE.lectures}/${lecturesByType[index].lectureId}`);
          }}
          tabs={lecturesByType.map((lecture) => {
            return {
              label: lecture.lectureName,
              children: (
                <LectureContent
                  disabled={disabled}
                  setDisabled={setDisabled}
                  getValues={getValues}
                  type={lecture.lectureId === 'new' ? 'create' : 'edit'}
                  key={lecture.lectureId}
                  lecture={lecture}
                  vocabularies={vocabularies ?? []}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  control={control}
                />
              ),
            };
          })}
        />
      )}
    </form>
  );
};

export default DetailLecture;
