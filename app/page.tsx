"use client";
import { getProfessions } from "@/actions/professions";
import { Search } from "@/components/Search";
import { Profession } from "@/types/app";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Profession[]>([]);
  return (
    <Search
      results={results}
      onSearch={async (input) => {
        const fetched = await getProfessions(input);
        setResults(fetched);
      }}
    />
  );
}
