"use client";
import SearchIcon from "@/components/icons/search-icon";
import Input from "@/components/input";
import CertificatesTable from "@/components/tables/certificate-table";
import { useApiCertificate } from "@/hooks/api/use-api-certificate";
import protectPage from "@/router/protect-page";
import { formateDateWithoutTime } from "@/utils/date";
import { useMemo, useState } from "react";

const CertificatePage = () => {
  const { usersCertificate } = useApiCertificate();
  const [textSearch, setTextSearch] = useState<string>();
  const filterUserCertificate = useMemo(() => {
    if (!usersCertificate || usersCertificate.length === 0) {
      return [];
    }
    if (!textSearch) {
      return usersCertificate;
    }
    return usersCertificate.filter((item) => {
      return [
        item.certificateName,
        formateDateWithoutTime(item.completedAt),
        item.email,
        item.nickName,
        item.percent,
        item.score,
      ].some((text) => text.toString().toLowerCase().includes(textSearch.toLowerCase()));
    });
  }, [textSearch, usersCertificate?.length]);

  return (
    <div className="p-4">
      <div className="mb-3 flex justify-between items-center">
        <Input
          onChange={(e) => {
            setTextSearch(e.target.value);
          }}
          icon={<SearchIcon />}
          placeholder="Search"
        />
      </div>
      <CertificatesTable data={filterUserCertificate ?? []} />
    </div>
  );
};

export default protectPage(CertificatePage);
