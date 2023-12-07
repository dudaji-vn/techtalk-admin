'use client';
import Lectures from '@/components/Lectures';
import { useApiLecture } from '@/hooks/api/useApiLecture';
import protectPage from '@/router/protectPage';

const LecturesPage = () => {
  const { lectures } = useApiLecture();
  return <Lectures data={lectures ?? []} />;
};

export default protectPage(LecturesPage);
