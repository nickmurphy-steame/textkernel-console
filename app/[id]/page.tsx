import { Button } from "@/components/ui/button";

const job = {
  name: "Software Engineer",
  id: 1,
  skills: [
    {
      name: "JavaScript",
      id: "1",
    },
    {
      name: "TypeScript",
      id: "2",
    },
  ],
};

export default async function Occupation() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-xl font-semibold">{job.name}</h1>
      <ul>
        {job.skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
      <Button variant="secondary">Load more</Button>
    </main>
  );
}
