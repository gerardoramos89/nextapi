"use client";
import UploadViewExcelSheets from "@/components/UploadViewExcelSheets";
import { useRouter } from "next/navigation";
const uri = "http://localhost:3000/api/student";

const Create = () => {
  const router = useRouter();

  return (
    <div>
      <UploadViewExcelSheets />
    </div>
  );
};

export default Create;
