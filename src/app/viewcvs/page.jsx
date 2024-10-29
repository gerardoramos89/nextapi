"use client";
import ShowExcel from "@/components/ShowExcel";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();

  return (
    <div>
      <ShowExcel />
    </div>
  );
};

export default Create;
