import { getSkills } from "@/actions/skills";

export default async function DetailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const professionId = searchParams.professionId
    ? parseInt(searchParams.professionId)
    : undefined;

  if (!professionId) return <div>Select a profession</div>;

  const skills = await getSkills(professionId);

  return (
    <div>
      <h2 className="text-lg font-semibold">Skills for profession</h2>
      <ul className="flex flex-col divide-y border rounded">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="p-2 hover:cursor-pointer hover:bg-muted"
          >
            {skill.name}
            <p className="text-sm text-muted-foreground">
              Score: {skill.score}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
