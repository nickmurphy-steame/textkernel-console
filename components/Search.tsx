"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { Profession } from "@/types/app";

export function Search({
  results = [],
  onSearch,
}: {
  results?: Profession[];
  onSearch: (searchValue: string) => void;
}) {
  const [input, setInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const handleSubmit = () => {
    setSearchValue(input);
    onSearch(input);
  };

  return (
    <div className="gap-y-2 flex flex-col">
      <form
        className="flex w-full items-center space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          minLength={3}
          type="text"
          placeholder="Search for a profession..."
        />
        <Button type="submit">Search</Button>
      </form>
      {searchValue && (
        <p className="text-sm">
          Showing results for <span className="font-medium">{searchValue}</span>
        </p>
      )}
      <div className="border rounded">
        <ul className="flex flex-col divide-y">
          {searchValue && results.length === 0 && (
            <li className="p-2 font-medium">No results found.</li>
          )}
          {results.map((profession) => (
            <Link
              key={profession.id}
              href={`/?professionId=${profession.id}`}
              className="font-medium"
            >
              <li className="p-2 hover:cursor-pointer hover:bg-muted">
                {profession.name}

                <p className="text-sm text-muted-foreground">
                  CodeID: {profession.id}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
