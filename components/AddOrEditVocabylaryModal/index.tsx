import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useApiLecture } from "../../hooks/api/useApiLecture";
import {
  IFormVocabulary,
  IVocabulariesByLectureResponse,
} from "../../interfaces/vocabulary";
import Dropdown from "../DropDown";
import Input from "../Input";
import Modal, { IModalProps } from "../Modal";
import { useApiVocabulary } from "../../hooks/api/useApiVocabulary";

interface IAddOrEditVocabularyModalProps extends IModalProps {
  type: "add" | "edit";
  data?: IVocabulariesByLectureResponse | false | undefined;
}
const AddOrEditLectureVocabularyModal = (
  props: IAddOrEditVocabularyModalProps
) => {
  const { open, onClose, type, data } = props;
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormVocabulary>();
  const { lectures } = useApiLecture();
  const { addOrUpdateVocabulary } = useApiVocabulary();

  useEffect(() => {
    if (data) {
      setValue("numberOrder", data.numberOrder);
      setValue("phonetic", data.phonetic);
      setValue("textKR", data.textKR);
      setValue("textVN", data.textVN);
      setValue("titleDisplay", data.titleDisplay);
      setValue("vocabularyId", data.vocabularyId);
    }
  }, [open, data]);

  useMemo(() => {
    if (!lectures) {
      return;
    }
    if (!data) {
      setValue("lectureId", lectures[0].lectureId);
      return;
    }
    const lecture = lectures.find(
      (item) => item.lectureName === data.lectureName
    );
    if (lecture) {
      setValue("lectureId", lecture.lectureId);
    }
  }, [lectures?.length, data]);
  const lecturesOption = useMemo(() => {
    const optionLectures =
      lectures?.map((item) => ({
        label: item.lectureName,
        value: item.lectureId,
      })) ?? [];
    return optionLectures;
  }, lectures);
  const onSubmit = handleSubmit((data) => {
    data.lectureId = getValues("lectureId");
    addOrUpdateVocabulary(data);
    onClose && onClose();
  });

  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="w-[480px] max-h-[600px] overflow-y-auto rounded-[5px] "
      >
        <h1 className="text-xl font-bold mb-4">
          {type === "add" ? "Add new vocabulary" : "Update vocabulary"}
        </h1>
        <Dropdown
          defaultValue={getValues("lectureId")}
          label="Lecture"
          onChange={(value) => {
            setValue("lectureId", value);
          }}
          options={lecturesOption}
        />
        <Input
          name="numberOrder"
          control={control}
          rules={{
            required: "Field is required",
          }}
          label="Number order"
          error={errors.numberOrder?.message}
        />
        <Input
          name="titleDisplay"
          control={control}
          rules={{
            required: "Field is required",
          }}
          label="Word/expression"
          error={errors.titleDisplay?.message}
        />
        <Input
          name="phonetic"
          control={control}
          rules={{
            required: "Field is required",
          }}
          label="Phonetic"
          error={errors.phonetic?.message}
        />
        <Input
          name="textKR"
          control={control}
          rules={{
            required: "Field is required",
          }}
          label="Korean language"
          error={errors.textKR?.message}
        />
        <Input
          name="textVN"
          control={control}
          rules={{
            required: "Field is required",
          }}
          label="Vietnamese language"
          error={errors.textVN?.message}
        />
        <button
          type="submit"
          className="text-md mr-4 mt-4  cursor-pointer rounded-[8px] bg-primary py-[10px] px-6 font-semibold text-white text-base "
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            onClose && onClose();
          }}
          className="text-md mt-4  cursor-pointer rounded-[8px] border border-primary py-[10px] px-6 font-semibold  text-base "
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddOrEditLectureVocabularyModal;
