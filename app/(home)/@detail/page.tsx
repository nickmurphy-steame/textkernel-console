import { getSkills } from "@/actions/skills";
import { DownloadSkillsButton } from "@/components/DownloadSkillsButton";

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
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg font-medium">
        Skills for Profession ID:{" "}
        <span className="font-semibold">{professionId}</span>
      </h2>
      <DownloadSkillsButton professionId={professionId} skills={skills} />
      <ul className="flex flex-col divide-y border rounded">
        {skills.map((skill) => (
          <li key={skill.id} className="p-2">
            {skill.name}
            <p className="text-sm text-muted-foreground">
              Score: {skill.score}
            </p>
            <p className="text-sm text-muted-foreground">SkillID: {skill.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
