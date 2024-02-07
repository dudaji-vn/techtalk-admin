"use client";
import Lectures from "@/components/lectures";
import { useApiLecture } from "@/hooks/api/use-api-lecture";
import protectPage from "@/router/protect-page";

const LecturesPage = () => {
  const { lectures } = useApiLecture();
  return <Lectures data={lectures ?? []} />;
};

export default protectPage(LecturesPage);
