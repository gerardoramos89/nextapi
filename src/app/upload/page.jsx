"use client";
import UploadViewExcelSheets from "@/components/UploadViewExcelSheets";
import { useRouter } from "next/navigation";
const uri = "http://nextapi-mu.vercel.app/api/student";

const Create = () => {
  const router = useRouter();

  return (
    <div>
      <UploadViewExcelSheets />
    </div>
  );
};

export default Create;
