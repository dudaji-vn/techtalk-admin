"use client";
import Button from "@/components/button";
import ArrowLeftIcon from "@/components/icons/arro-left-icon";
import DotIcon from "@/components/icons/dot-icon";
import LectureContent from "@/components/lecture-content";
import Tabs from "@/components/tabs";
import Typography from "@/components/typo";
import { IChangeStatusLectureRequest, IFormLectureAndVocabulary, ILectureItem } from "@/interfaces/lecture.interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "@/components/dropdown";
import { ROUTE } from "@/const/path";
import { useApiLecture } from "@/hooks/api/use-api-lecture";
import { useApiVocabulary } from "@/hooks/api/use-api-vocabulary";
import UnPublishModal from "@/components/unpublish-modal";
import PublishModal from "@/components/publish-modal";

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
    defaultValues: {
      status: "Draft",
    },
  });
  const { lectures, addLectureAndVocabulary, changeStatusLecture } = useApiLecture();
  const [disabled, setDisabled] = useState(true);
  const [isOpenModalUnPublish, setIsOpenModalUnPublish] = useState<boolean>(false);
  const [isOpenModalPublish, setIsOpenModalPublish] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  const { vocabularies } = useApiVocabulary(params.slug as string);
  useEffect(() => {
    if (!getValues("lectureName")) {
      setDisabled(true);
    }

    if (!getValues("imgSrc")) {
      setDisabled(true);
    }
  }, [watch("lectureName"), watch("imgSrc")]);

  useEffect(() => {
    if (params.slug !== "new") {
      setValue("lectureId", params.slug as string);
    }
  }, [params.slug]);
  const lecturesByType = useMemo<ILectureItem[]>(() => {
    if (!lectures) {
      return [];
    }
    return [{ lectureId: "new", lectureName: "New lecture", imgSrc: "", status: "Draft" }, ...lectures];
  }, [lectures]);
  const activeIndexLecture: number = useMemo(() => {
    if (!lecturesByType) {
      return 0;
    }
    return lecturesByType.findIndex((item) => item.lectureId === params.slug);
  }, [params.slug, lecturesByType?.length]);

  const status = useMemo(() => {
    if (!lecturesByType) {
      return "Draft";
    }
    return lecturesByType.find((item) => item.lectureId === params.slug)?.status;
  }, [params.slug, lecturesByType?.length]);

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    data.listVocabulary = data.listVocabulary.filter(
      (item) => item.numberOrder && item.phonetic && item.titleDisplay && item.textKR && item.textVN
    );
    addLectureAndVocabulary(data);
  });
  const handlePublishLecture = () => {
    if (params.slug === "new") {
      return;
    }
    const payload: IChangeStatusLectureRequest = {
      lectureId: params.slug as string,
      status: "Published",
    };
    changeStatusLecture(payload);
  };

  const handleGoBack = () => {
    router.push(ROUTE.lectures);
  };

  return (
    <form>
      <UnPublishModal
        key={params.slug as string}
        lectureId={params.slug as string}
        onClose={() => {
          setIsOpenModalUnPublish(false);
        }}
        open={isOpenModalUnPublish}
      />

      <PublishModal
        onConfirm={() => {
          status === "Draft" ? onSubmit() : handlePublishLecture();
        }}
        onClose={() => {
          setIsOpenModalPublish(false);
        }}
        open={isOpenModalPublish}
      />
      <div className="flex items-center border border-gray50">
        <Typography className="p-2 min-w-[270px]" type="semi-bold">
          Lectures
        </Typography>
        <div className="border-l p-4 border-l-gray50 w-full flex justify-between">
          <div className="flex items-center gap-4">
            <div onClick={handleGoBack}>
              <ArrowLeftIcon />
            </div>
            {lecturesByType && lecturesByType.length > 0 && activeIndexLecture >= 0 && (
              <div>{params.slug === "new" ? "New lecture" : lecturesByType[activeIndexLecture].lectureName} </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Typography type="small">Status:</Typography>

            <div className="gap-2 flex items-center">
              <DotIcon status={status} />
              <Typography className={`text-sm ${status === "Draft" ? "text-warning " : "text-success"}`} type="small">
                {status}
              </Typography>
            </div>

            <div className="flex gap-2">
              <Button type="button">Cancel</Button>
              {/* <Button styles={'primary'} disabled={disabled}>
                Save
              </Button> */}
              {status === "Published" && (
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpenModalUnPublish(true);
                  }}
                  styles="primary"
                >
                  UnPublish
                </Button>
              )}
              {status === "Draft" && (
                <Dropdown
                  onChange={(data) => {
                    console.log(data);
                    setValue("status", data as any);
                    if (data === "Published") {
                      setIsOpenModalPublish(true);
                    } else {
                      onSubmit();
                    }
                  }}
                  options={[
                    { label: "Save as draft", value: "Draft" },
                    { label: "Publish", value: "Published" },
                  ]}
                />
              )}
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
                  editable={status === "Draft"}
                  setDisabled={setDisabled}
                  getValues={getValues}
                  type={lecture.lectureId === "new" ? "create" : "edit"}
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
