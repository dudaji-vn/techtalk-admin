import React from 'react';
import Typography from '../Typo';
import InputController from '../InputController';
import Button from '../Button';
import Input from '../Input';
import AddIcon from '../Icons/AddIcon';
import ImportIcon from '../Icons/ImportIcon';

import SearchIcon from '../Icons/SearchIcon';
import { useRouter } from 'next/navigation';
import { ROUTE } from '../../const/path';

const LectureHeader = () => {
  const router = useRouter();
  const handleGotoNewLecture = () => {
    router.push(`${ROUTE.lectures}/new`);
  };
  return (
    <div className="flex items-center justify-between">
      <Typography type="semi-bold">Lectures</Typography>
      <div className="flex gap-2">
        <Input icon={<SearchIcon />} placeholder="Search" />

        <Button styles="secondary" icon={<ImportIcon />}>
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
