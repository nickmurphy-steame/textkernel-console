"use client";
import { getProfessions } from "@/actions/professions";
import { Search } from "@/components/Search";
import { Profession } from "@/types/app";
import { useState } from "react";

const demoProfessions: Profession[] = [
  { id: 1234, name: "Software Engineer" },
  { id: 5678, name: "Doctor" },
];

export default function Home() {
  const [results, setResults] = useState<Profession[]>(demoProfessions);
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Occupation Search</h1>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <Search
            results={results}
            onSearch={async (input) => {
              const fetched = await getProfessions(input);
              setResults(fetched);
            }}
          />
        </div>
        <div className="col-span-1">
          <h2 className="text-center">Occupation Details</h2>
        </div>
      </div>
    </main>
  );
}
