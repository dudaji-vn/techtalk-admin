'use client';
import VocabulariesTable from '@/components/Tables/VocabulariesTable';
import { useApiVocabulary } from '@/hooks/api/useApiVocabulary';
import Dropdown from '@/components/DropDown';
import { useMemo, useState } from 'react';
import AddIcon from '@/components/Icons/AddIcon';
import AddOrEditLectureVocabularyModal from '@/components/AddOrEditVocabylaryModal';
import { useApiLecture } from '@/hooks/api/useApiLecture';
import protectPage from '../../../router/protectPage';

const Vocabularies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [lectureId, setLectureId] = useState<string>('');
  const { vocabularies } = useApiVocabulary(lectureId);
  const { lectures } = useApiLecture();
  const options = useMemo(() => {
    const initOption = { label: 'All', value: '' };
    const optionLectures =
      lectures?.map((item) => ({
        label: item.lectureName,
        value: item.lectureId,
      })) ?? [];
    return [initOption, ...optionLectures];
  }, lectures);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      {/* <AddOrEditLectureVocabularyModal
        type="add"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      /> */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button onClick={handleOpenModal} className="bg-primary p-3 rounded-lg ">
            <AddIcon />
          </button>
        </div>
        <div>
          <Dropdown
            className="w-[440px]"
            onChange={(value) => {
              setLectureId(value);
            }}
            options={options ?? []}
          />
        </div>
      </div>
      <VocabulariesTable data={vocabularies ?? []} />
    </>
  );
};

export default protectPage(Vocabularies);
