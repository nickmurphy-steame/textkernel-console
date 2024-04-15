"use client";

const FileSaver = require("file-saver");
import { toast } from "sonner";
import { Skill } from "@/types/app";
import { Button } from "./ui/button";
import { jsonToCsv } from "@/lib/utils";

export function DownloadSkillsButton({ skills }: { skills: Skill[] }) {
  const handleClick = () => {
    const asCSV = jsonToCsv(skills);
    var blob = new Blob([asCSV], { type: "text/csv;charset=utf-8" });
    try {
      FileSaver.saveAs(blob, "file.csv");
      toast.success("Skills downloaded as CSV");
    } catch {
      toast.error("Failed to download skills as CSV");
    }
  };
  return (
    <Button variant="outline" onClick={handleClick}>
      Download skills as CSV
    </Button>
  );
}
