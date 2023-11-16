"use client";
import LecturesPage from "@/components/Lectures";
import { useApiLecture } from "@/hooks/api/useApiLecture";
import protectPage from "@/router/protectPage";

const Lectures = () => {
  const { lectures } = useApiLecture();
  return <LecturesPage data={lectures ?? []} />;
};

export default protectPage(Lectures);
