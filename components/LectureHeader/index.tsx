import React, { useState } from 'react';
import Typography from '../Typo';
import InputController from '../InputController';
import Button from '../Button';
import Input from '../Input';
import AddIcon from '../Icons/AddIcon';
import ImportIcon from '../Icons/ImportIcon';

import SearchIcon from '../Icons/SearchIcon';
import { useRouter } from 'next/navigation';
import { ROUTE } from '../../const/path';
import ImportExcelModal from '../ImportExcelModal';

const LectureHeader = () => {
  const router = useRouter();
  const [isOpenModalExcel, setIsOpenModalExcel] = useState<boolean>(false);
  const handleGotoNewLecture = () => {
    router.push(`${ROUTE.lectures}/new`);
  };
  return (
    <div className="flex items-center justify-between">
      <ImportExcelModal
        open={isOpenModalExcel}
        onClose={() => {
          setIsOpenModalExcel(false);
        }}
      />
      <Typography type="semi-bold">Lectures</Typography>
      <div className="flex gap-2">
        {/* <Input icon={<SearchIcon />} placeholder="Search" /> */}

        <Button onClick={() => setIsOpenModalExcel(true)} styles="secondary" icon={<ImportIcon />}>
          Import
        </Button>
        <Button onClick={handleGotoNewLecture} styles="primary" icon={<AddIcon />}>
          Create lectures
        </Button>
      </div>
    </div>
  );
};

export default LectureHeader;
